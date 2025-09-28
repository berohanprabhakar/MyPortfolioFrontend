// src/components/ExperienceTab.tsx
import { useState } from "react";

function ExperienceTab({ exp} : any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-6 transition-all duration-300">
      <h3 className="text-lg font-semibold">{exp.role}</h3>
      <p className="text-gray-800">{exp.company}</p>
      <p className="text-sm text-gray-500">{exp.period}</p>
      <p className="mt-2 text-gray-700">{exp.desc}</p>

      {/* Animated Read More section */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? "max-h-40 mt-3" : "max-h-0"
        }`}
      >
        <div className="p-3 border-t border-gray-200 text-gray-600">
          <p>{exp.extra}</p>
          {/* Example future content */}
          <img src="/demo.png" alt="demo" className="mt-2 rounded" />
          <a href="https://demo-link.com" className="text-blue-500 underline">
            Live Demo
          </a>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-blue-600 hover:underline font-medium"
      >
        {expanded ? "Show Less ▲" : "Read More ▼"}
      </button>
    </div>
  );
}

export default ExperienceTab;
