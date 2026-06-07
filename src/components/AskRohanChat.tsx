import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Maximize2, Minimize2, MessageCircle, Send, X } from "lucide-react";

const SESSION_KEY = "ask-rohan-session";
const SUGGESTIONS = [
  "Tell me about yourself",
  "What is your biggest project?",
  "What technologies do you use?",
  "Why should I hire you?",
];

type ChatRole = "user" | "assistant" | "error";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const createSessionId = () => {
  if (typeof window === "undefined") return "session-unknown";
  const stored = window.localStorage.getItem(SESSION_KEY);
  if (stored) return stored;

  const newId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(SESSION_KEY, newId);
  return newId;
};

function AskRohanChat() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I’m Rohan’s assistant. Ask me anything about Rohan’s skills, projects, or why he’s a strong hire.",
    },
  ]);
  const [sessionId, setSessionId] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSeenSuggestions, setHasSeenSuggestions] = useState(false);

  const streamingMessageIdRef = useRef<string | null>(null);
  const streamBufferRef = useRef("");
  const streamController = useRef<AbortController | null>(null);
  const scrollAnchor = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSessionId(createSessionId());
  }, []);

  useEffect(() => {
    scrollAnchor.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isFullscreen]);

  const updateStreamingAssistant = (delta: string) => {
    setChatHistory((prev) => {
      if (!streamingMessageIdRef.current) {
        const newAssistant = {
          id: `assistant-${Date.now()}`,
          role: "assistant" as const,
          content: delta,
        };
        streamingMessageIdRef.current = newAssistant.id;
        return [...prev, newAssistant];
      }

      return prev.map((message) =>
        message.id === streamingMessageIdRef.current
          ? { ...message, content: message.content + delta }
          : message,
      );
    });
  };

  const finalizeAssistant = () => {
    setIsTyping(false);
    setIsStreaming(false);
    const currentId = streamingMessageIdRef.current;
    if (!currentId) return;

    setChatHistory((prev) =>
      prev.map((message) =>
        message.id === currentId && message.content.trim().length === 0
          ? {
              ...message,
              content:
                "Sorry, I couldn’t generate a response. Please try again or pick another question.",
            }
          : message,
      ),
    );
    streamingMessageIdRef.current = null;
  };

  const appendToken = (token: string) => {
    const words = token.split(/(\s+)/);

    words.forEach((w, i) => {
      setTimeout(() => {
        updateStreamingAssistant(w);
      }, i * 10);
    });
  };

  const processStreamChunk = (chunk: string) => {
    streamBufferRef.current += chunk;

    const regex = /data:\s*(\{.*?\})/g;

    let match;
    let lastIndex = 0;

    while ((match = regex.exec(streamBufferRef.current)) !== null) {
      lastIndex = regex.lastIndex;

      try {
        const parsed = JSON.parse(match[1]);

        if (typeof parsed.token === "string") {
          appendToken(parsed.token);
        }
      } catch {
        // ignore broken JSON safely
      }
    }

    streamBufferRef.current = streamBufferRef.current.slice(lastIndex);
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
    setIsTyping(false);
    setIsStreaming(false);

    if (streamingMessageIdRef.current) {
      setChatHistory((prev) =>
        prev.map((item) =>
          item.id === streamingMessageIdRef.current
            ? {
                ...item,
                content:
                  "Sorry, something went wrong while fetching the response. Please try again.",
              }
            : item,
        ),
      );
      streamingMessageIdRef.current = null;
    }
  };

  const sendMessage = async (prompt: string) => {
    if (!prompt.trim() || isStreaming) return;
    setErrorMessage("");
    setHasSeenSuggestions(true);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: prompt.trim(),
    };

    const assistantId = `assistant-${Date.now()}`;
    streamingMessageIdRef.current = assistantId;
    setChatHistory((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setInput("");
    setIsTyping(true);
    setIsStreaming(true);

    if (streamController.current) {
      streamController.current.abort();
    }
    const signal = new AbortController();
    streamController.current = signal;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: prompt.trim(), sessionId }),
        signal: signal.signal,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Server returned an error.");
      }

      if (!response.body) {
        throw new Error("Streaming is not supported by the response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let hasReceivedFirstToken = false;

      while (!done) {
        const { value, done: readDone } = await reader.read();
        done = readDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          if (chunk) {
            hasReceivedFirstToken = true;
            if (isTyping) setIsTyping(false);
            processStreamChunk(chunk);
          }
        }
      }

      if (!hasReceivedFirstToken) {
        throw new Error("No content was returned from the backend.");
      }

      finalizeAssistant();
      streamController.current = null;
    } catch (error: any) {
      if (error?.name === "AbortError") {
        return;
      }
      handleError(
        error?.message || "Unable to reach the chat API. Please try again.",
      );
      streamController.current = null;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div
      className={`fixed z-50 ${
        isFullscreen ? "inset-4 items-stretch" : "bottom-4 right-4 items-end"
      } flex flex-col transition-all duration-300 ease-out`}
    >
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-emerald-500/20 transition duration-300 ease-out hover:bg-emerald-600"
        >
          <MessageCircle className="h-5 w-5" />
          Rohan AI Chat
        </button>
      ) : null}

      {isOpen ? (
        <section
          className={`relative flex h-[550px] w-[360px] flex-col overflow-hidden rounded-[28px] bg-[#f0f2f5] shadow-2xl transition-all duration-300 ease-out dark:bg-slate-950 dark:text-white ${
            isFullscreen
              ? "inset-0 h-[calc(100vh-2rem)] w-[calc(100vw-2rem)]"
              : ""
          }`}
        >
          <div className="flex items-center justify-between gap-3 bg-emerald-600 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-lg font-semibold shadow-inner">
                R
              </div>
              <div>
                <p className="text-sm font-semibold">Rohan</p>
                <p className="text-xs text-emerald-100/90">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFullscreen((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/90 text-white transition duration-300 ease-out hover:bg-emerald-500/100"
                aria-label={
                  isFullscreen ? "Restore window" : "Fullscreen window"
                }
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsFullscreen(false);
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/90 text-white transition duration-300 ease-out hover:bg-emerald-500/100"
                aria-label="Minimize chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!hasSeenSuggestions ? (
            <div className="flex flex-col gap-2 px-4 py-3 bg-[#e5ddd5] dark:bg-slate-900">
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={isStreaming}
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-emerald-600/20 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm transition duration-300 ease-out hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex-1 overflow-y-auto px-4 py-3">
            <div className="flex flex-col gap-3">
              {chatHistory.map((message, idx) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "user"
                        ? "rounded-br-2xl rounded-tl-3xl rounded-tr-3xl rounded-bl-2xl bg-emerald-500 text-white"
                        : "rounded-tl-2xl rounded-br-3xl rounded-bl-3xl rounded-tr-2xl bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                    }`}
                  >
                    <span>
                      {message.content ||
                        (message.role === "assistant" ? "…" : "")}
                    </span>
                    {isStreaming &&
                    message.role === "assistant" &&
                    idx === chatHistory.length - 1 ? (
                      <span className="inline-block h-4 w-1 animate-pulse bg-slate-900 dark:bg-slate-100" />
                    ) : null}
                  </div>
                </div>
              ))}

              {isTyping ? (
                <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Rohan is typing...
                </div>
              ) : null}
            </div>
            <div ref={scrollAnchor} />
          </div>

          <div className="border-t border-slate-300/80 bg-white px-4 py-3 dark:border-slate-700/80 dark:bg-slate-950">
            {errorMessage ? (
              <div className="mb-3 rounded-3xl border border-rose-500/20 bg-rose-500/10 px-3 py-3 text-xs text-rose-100">
                {errorMessage}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="flex items-end gap-3">
              <label htmlFor="ask-rohan-input" className="sr-only">
                Ask a question
              </label>
              <textarea
                id="ask-rohan-input"
                rows={1}
                value={input}
                onChange={(event) => setInput(event.currentTarget.value)}
                placeholder="Type a message"
                className="flex-1 resize-none rounded-3xl border border-slate-300/80 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-300 ease-out focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700/80 dark:bg-slate-900 dark:text-white"
                disabled={isStreaming}
              />
              <button
                type="submit"
                disabled={isStreaming || input.trim().length === 0}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition duration-300 ease-out hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default AskRohanChat;
