import ExperienceTab from "../components/ExperienceTab";
import { Contents } from '../content';

const experience = Contents.experience;

function Experience() {
  return (
    <div className="pt-20 max-w-4xl mx-auto space-y-4">
      {experience.map((exp, i) => (
        <ExperienceTab key={i} exp={exp} expand={true} />
      ))}
    </div>
  );
}

export default Experience;
