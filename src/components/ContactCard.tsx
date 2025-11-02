
function ContactCard() {
  return (
    <main className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <p>
          Email:{" "}
          <a href="mailto:myrohanprabhakar@gmail.com" className="text-blue-600">
            myrohanprabhakar@gmail.com
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/rohan--prabhakar"
            target="_blank"
            className="text-blue-600"
          >
            linkedin.com/in/rohan--prabhakar
          </a>
        </p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/berohanprabhakar"
            target="_blank"
            className="text-blue-600"
          >
            github.com/berohanprabhakar
          </a>
        </p>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Download Resume</button>
         */}
        <a
          href="/MyPortfolioFrontend/assets/Rohan_Prabhakar_CV.pdf"
          download
          className="bg-blue-600 text-white w-fit px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5v-12m0 12 4.5-4.5M12 16.5l-4.5-4.5M3 21h18"
            />
          </svg>
          Download Resume
        </a>
      </div>
    </main>
  );
}

export default ContactCard;
