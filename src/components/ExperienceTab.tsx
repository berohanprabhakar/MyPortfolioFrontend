import { useState } from "react";
import { CylindricalButton } from "./CylindricalButton";
import { Building2 } from "lucide-react";

function ExperienceTab({ exp, expand }: any) {
  const [expanded, setExpanded] = useState(expand || false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="hover:shadow-md cursor-pointer bg-white shadow rounded-lg p-6 transition-all duration-300 flex items-start gap-6"
    >
      {/* Logo Section */}
      <div className="explogo flex-shrink-0 w-10 h-10 flex items-center justify-center overflow-hidden bg-gray-50">
        {exp?.logo ? (
          <img
            src={exp.logo}
            alt={exp.company}
            className="w-full h-full object-contain p-0.5"
          />
        ) : (
          <Building2 className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{exp.role}</h3>
        <p className="text-gray-800">{exp.company}</p>
        <p className="text-sm text-gray-500">{exp.period}</p>
        <p className="text-sm text-gray-500">{exp.location}</p>
        <p className="mt-2 text-gray-700">{exp.desc}</p>

        {/* Animated "Read More" Section */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            expanded ? "max-h-40 mt-3" : "max-h-0"
          }`}
        >
          <div className="p-3 border-t border-gray-200 text-gray-600">
            <ul className="list-disc list-inside space-y-1">
              {exp.extra?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <img src="/demo.png" alt="demo" className="mt-2 rounded" />
            <a
              href="https://demo-link.com"
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          </div>
        </div>

        {/* Button */}
        <div className="mt-2.5">
          <CylindricalButton
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          />
        </div>
      </div>
    </div>
  );
}

export default ExperienceTab;
