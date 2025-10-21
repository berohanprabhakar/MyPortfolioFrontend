import { ArrowUpRight } from "lucide-react";

interface ProjectProps {
  project: {
    title: string;
    description: string;
    tech?: string[];
    link?: string;
    logo?: string;
  };
  compact?: boolean; // true for home page (smaller version)
}

export function ProjectCard({ project, compact = false }: ProjectProps) {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 flex ${
        compact ? "p-4" : "p-6"
      } items-start gap-5`}
    >
      {/* Logo / Thumbnail */}
      {project.logo && (
        <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-gray-50 border rounded-lg overflow-hidden">
          <img
            src={project.logo}
            alt={project.title}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {project.title}
        </h3>
        <p
          className={`text-gray-600 ${
            compact ? "text-sm mt-1" : "text-[15px] mt-2"
          }`}
        >
          {project.description}
        </p>

        {project.tech && (
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs bg-gray-100 rounded-full text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 mt-3 text-sm font-medium hover:underline"
          >
            View Project <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
