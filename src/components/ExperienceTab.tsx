import { useState } from 'react';
import { CylindricalButton } from './CylindricalButton';


function ExperienceTab({ exp, expand }: any) {
  const [expanded, setExpanded] = useState(expand || false);

  return (
    <div className="bg-white shadow rounded-lg p-6 transition-all duration-300">
      <h3 className="text-lg font-semibold">{exp.role}</h3>
      <p className="text-gray-800">{exp.company}</p>
      <p className="text-sm text-gray-500">{exp.period}</p>
      <p className="text-sm text-gray-500">{exp.location}</p>
      <p className="mt-2 text-gray-700">{exp.desc}</p>
      {/* Animated Read More section */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-40 mt-3' : 'max-h-0'}`}>
        <div className="p-3 border-t border-gray-200 text-gray-600">
          <p>{exp.extra}</p>
          {/* Example future content */}
          <img src="/demo.png" alt="demo" className="mt-2 rounded" />
          <a href="https://demo-link.com" className="text-blue-500 underline">
            Live Demo
          </a>
        </div>
      </div>
      {/* padding: 5px 15px; background-color: blue; color: white; outline: none; border-radius: 8px; */}

      {/* <CylindricalButton />
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ marginTop: '6px' }}
        className="px-5 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-100 transition-colors duration-300">
        {expanded ? 'Show Less ▲' : 'Read More ▼'}
      </button> */}

      <div className="mt-2.5">
        {/* Default Blue Version */}
        <CylindricalButton expanded={expanded} onClick={() => setExpanded(!expanded)} />

        {/* Green Version */}
        {/* <CylindricalButton
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          labelExpanded="Hide ▲"
          labelCollapsed="Expand ▼"
          className="text-green-600 border-green-600 hover:bg-green-100"
        /> */}

        {/* Red Version */}
        {/* <CylindricalButton
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          labelExpanded="Collapse ▲"
          labelCollapsed="Expand ▼"
          className="text-red-500 border-red-500 hover:bg-red-100"
        /> */}
      </div>
    </div>
  );
}

export default ExperienceTab;
