import { useEffect } from "react";
import { X, Linkedin, Link as LinkIcon, Mail } from "lucide-react";
import { Contents } from "../content";

export default function ContactInfoModal({ isOpen, onClose }: any) {
  useEffect(() => {
    const handleEsc = (e : any) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;
  const { personaldetails } = Contents;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{personaldetails.name}</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Contact Info */}
        <div className="px-6 py-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold">Contact Info</h3>
            {/* <Pencil className="w-4 h-4 text-gray-600 cursor-pointer" /> */}
          </div>

          <div className="space-y-4 text-sm">
            {/* LinkedIn */}
            <div className="flex gap-3">
              <Linkedin className="w-5 h-5 text-gray-700" />
              <div>
                <p className="font-medium">Your Profile</p>
                <a
                  href={`https://${personaldetails.socials.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {personaldetails.socials.linkedin}
                </a>
              </div>
            </div>

            {/* Websites */}
            <div className="flex gap-3">
              <LinkIcon className="w-5 h-5 text-gray-700" />
              <div>
                <p className="font-medium">Websites</p>
                <a
                  href={`https://${personaldetails.socials.leetcode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline block"
                >
                  {personaldetails.socials.leetcode}
                  <span className="text-gray-500"> (Personal)</span>
                </a>
                <a
                  href={`https://${personaldetails.socials.portfolio}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline block"
                >
                  Portfolio
                  <span className="text-gray-500"> (Portfolio)</span>
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-gray-700" />
              <div>
                <p className="font-medium">Email</p>
                <a
                  href={`mailto:${personaldetails.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {personaldetails.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
