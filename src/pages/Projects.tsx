import { Contents } from '../content';
const projects = Contents?.projects;

function Projects() {
  return (
    <main className="pt-20 max-w-4xl mx-auto space-y-4">
      {projects.map((project, index) => (
        <div key={index} className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
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
