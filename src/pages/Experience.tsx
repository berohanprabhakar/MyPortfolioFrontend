import ExperienceTab from "../components/ExperienceTab";

const experience = [
  {
    role: "Software Developer",
    company: "Monet Analytics",
    period: "2024 - Present",
    desc: "Backend developer building analytics pipelines and APIs.",
    extra:
      "Here you can add videos, demo images, or links for Monet Analytics.",
  },
  {
    role: "Intern",
    company: "XYZ Startup",
    period: "2023 - 2024",
    desc: "Worked on Node.js microservices and database optimizations.",
    extra:
      "This could include a demo link, GitHub repo, or project screenshots.",
  },
];

function Experience() {
  return (
    <div className="p-9 space-y-4">
      {experience.map((exp, i) => (
        <ExperienceTab key={i} exp={exp} />
      ))}
    </div>
  );
}

export default Experience;
