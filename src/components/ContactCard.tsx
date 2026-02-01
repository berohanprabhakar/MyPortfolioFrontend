import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Contents } from "../content";
import { PanelTopOpenIcon, ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";

const resume = Contents.personaldetails.resume;
const previewUrl = `${resume}/preview`;
const downloadUrl = `${resume}/export?format=pdf`;

function ContactCard({ page }: any) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const { personaldetails } = Contents;

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.6));
  const resetZoom = () => setZoom(1);

  return (
    <main className={`max-w-4xl mx-auto ${page ? "pt-20" : ""}`}>
      {/* Contact Card */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <p>
          Email:{" "}
          <a
            href={`mailto:${personaldetails.email}`}
            className="text-blue-600 hover:underline"
          >
            {personaldetails.email}
          </a>
        </p>

        <p>
          LinkedIn:{" "}
          <a
            href={`https://${personaldetails.socials.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {personaldetails.socials.linkedin}
          </a>
        </p>

        <p>
          GitHub:{" "}
          <a
            href={`https://${personaldetails.socials.github}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {personaldetails.socials.github}
          </a>
        </p>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <PanelTopOpenIcon size={18} /> View Resume 
          </button>

          <a
            href={downloadUrl}
            className="flex gap-3 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition"
          >
            <Download size={18}/>  Download PDF
          </a>
        </div>
      </div>

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-white w-[92%] h-[92%] rounded-xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
                <span className="text-sm font-semibold text-gray-700">
                  Resume Preview
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={zoomOut}
                    className="p-1.5 rounded hover:bg-gray-100"
                  >
                    <ZoomOut size={18} />
                  </button>

                  <button
                    onClick={resetZoom}
                    className="p-1.5 rounded hover:bg-gray-100 text-sm"
                  >
                    <RotateCcw size={16} />
                  </button>

                  <button
                    onClick={zoomIn}
                    className="p-1.5 rounded hover:bg-gray-100"
                  >
                    <ZoomIn size={18} />
                  </button>

                  <a
                    href={downloadUrl}
                    download
                    className="ml-2 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
                  >
                    Download
                  </a>

                  <button
                    onClick={() => setOpen(false)}
                    className="ml-1 text-gray-600 hover:text-black text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Resume Viewer (single scroll) */}
              <div className="flex-1 bg-gray-100 flex justify-center overflow-hidden">
                <div
                  className="origin-top bg-white shadow"
                  style={{
                    transform: `scale(${zoom})`,
                    width: "850px",
                  }}
                >
                  <iframe
                    src={previewUrl}
                    className="w-[850px] h-[1100px]"
                    frameBorder="0"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default ContactCard;
