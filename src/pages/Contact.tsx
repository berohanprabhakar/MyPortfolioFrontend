// src/pages/Contact.tsx
function Contact() {
  return (
    <main className="pt-20 max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Contact Me</h2>
        <p>Email: <a href="mailto:myrohanprabhakar@gmail.com" className="text-blue-600">rohan@example.com</a></p>
        <p>LinkedIn: <a href="https://linkedin.com/in/rohan--prabhakar" target="_blank" className="text-blue-600">linkedin.com/in/rohan</a></p>
        <p>GitHub: <a href="https://github.com/berohanprabhakar" target="_blank" className="text-blue-600">github.com/rohan</a></p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Download Resume
        </button>
      </div>
    </main>
  );
}
export default Contact;
