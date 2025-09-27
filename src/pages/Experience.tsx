// src/pages/Experience.tsx
const experience = [
  {
    role: "Software Developer",
    company: "Monet Analytics",
    period: "2024 - Present",
    desc: "Backend developer building analytics pipelines and APIs.",
  },
  {
    role: "Intern",
    company: "XYZ Startup",
    period: "2023 - 2024",
    desc: "Worked on Node.js microservices and database optimizations.",
  },
];

function Experience() {
  return (
    <main className="pt-20 max-w-4xl mx-auto space-y-4">
      {experience.map((exp, i) => (
        <div key={i} className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">{exp.role}</h3>
          <p className="text-gray-800">{exp.company}</p>
          <p className="text-sm text-gray-500">{exp.period}</p>
          <p className="mt-2 text-gray-700">{exp.desc}</p>
        </div>
      ))}
    </main>
  );
}
export default Experience;
