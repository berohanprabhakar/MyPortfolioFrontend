// src/pages/Blog.tsx
const blogs = [
  {
    title: "Scaling Backend Systems with Node.js",
    summary: "An article about best practices for building scalable APIs...",
    link: "https://dev.to/rohan/blog1",
  },
  {
    title: "Why TypeScript is Essential for Backend Devs",
    summary: "How TypeScript improves reliability in backend projects.",
    link: "https://dev.to/rohan/blog2",
  },
];

function Blog() {
  return (
    <main className="pt-20 max-w-4xl mx-auto space-y-4">
      {blogs.map((b, i) => (
        <div key={i} className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">{b.title}</h3>
          <p className="text-gray-700">{b.summary}</p>
          <a
            href={b.link}
            target="_blank"
            className="text-blue-600 text-sm font-medium"
          >
            Read More →
          </a>
        </div>
      ))}
    </main>
  );
}
export default Blog;
