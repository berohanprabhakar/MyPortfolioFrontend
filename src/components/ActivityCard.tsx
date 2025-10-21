import React from "react";
import { Calendar, GitCommit, Code2 } from "lucide-react";

interface ActivityCardProps {
  icon: "github" | "leetcode";
  title: string;
  description: string;
  timestamp: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  icon,
  title,
  description,
  timestamp,
}) => {
  const iconElement =
    icon === "github" ? (
      <GitCommit className="text-gray-600 w-5 h-5" />
    ) : (
      <Code2 className="text-orange-500 w-5 h-5" />
    );

  return (
    <div className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-none">
      <div className="flex-shrink-0">{iconElement}</div>
      <div>
        <p className="text-sm text-gray-800 font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex items-center text-xs text-gray-400 mt-1 gap-1">
          <Calendar className="w-3 h-3" /> {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
