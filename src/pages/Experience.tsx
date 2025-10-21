import ExperienceTab from "../components/ExperienceTab";
import { Contents } from '../content';

const experience = Contents.experience;

function Experience() {
  return (
    <div className="p-9 space-y-4">
      {experience.map((exp, i) => (
        <ExperienceTab key={i} exp={exp} expand={true} />
      ))}
    </div>
  );
}

export default Experience;
