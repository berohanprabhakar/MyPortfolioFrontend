// src/pages/Projects.tsx
const projects = [
  {
    title: "Survey Platform (Fulcrum-like)",
    description: "Built a scalable survey distribution platform...",
    link: "https://github.com/rohan/project1",
  },
  {
    title: "Portfolio Website",
    description: "LinkedIn-inspired portfolio built with React + Tailwind.",
    link: "https://github.com/rohan/portfolio",
  },
];

function Projects() {
  return (
    <main className="pt-20 max-w-4xl mx-auto space-y-4">
      {projects.map((project, index) => (
        <div key={index} className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-gray-700">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            className="text-blue-600 text-sm font-medium"
          >
            View Project →
          </a>
        </div>
      ))}
    </main>
  );
}
export default Projects;
