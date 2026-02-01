import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Contents } from "../content";

const RESUME_ID = "1DForgllikFdizF_v044vbeEKFN9q1N2FuiVa8zfqfkk";
const previewUrl = `https://docs.google.com/document/d/${RESUME_ID}/preview`;
const downloadUrl = `https://docs.google.com/document/d/${RESUME_ID}/export?format=pdf`;

function ContactCard({ page }: any) {
  const [open, setOpen] = useState(false);
  const { personaldetails } = Contents;

  return (
    <main className={`max-w-4xl mx-auto ${page ? "pt-20" : ""}`}>
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <p>
          Email:{" "}
          <a href={`mailto:${personaldetails.email}`} className="text-blue-600">
            {personaldetails.email}
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            href={`https://${personaldetails.socials.linkedin}`}
            target="_blank"
            className="text-blue-600"
          >
            {personaldetails.socials.linkedin}
          </a>
        </p>
        <p>
          GitHub:{" "}
          <a
            href={`https://${personaldetails.socials.github}`}
            target="_blank"
            className="text-blue-600"
          >
            {personaldetails.socials.github}
          </a>
        </p>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Resume
          </button>

          <a
            href={downloadUrl}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition"
          >
            Download PDF
          </a>
        </div>
      </div>

      {/* Modal Resume Viewer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-white w-[92%] h-[92%] rounded-xl overflow-hidden relative shadow-2xl"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-black text-xl z-10"
              >
                ✕
              </button>

              <iframe
                src={previewUrl}
                className="w-full h-full"
                frameBorder="0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default ContactCard;
