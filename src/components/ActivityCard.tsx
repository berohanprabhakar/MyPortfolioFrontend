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

  const parseCustomDate = (ts: string) => {
    try {
      const [datePart, timePart] = ts.split(", ");
      const [day, month, year] = datePart.split("/").map(Number);
      const [hours, minutes, seconds] = timePart.split(":").map(Number);
      return new Date(year, month - 1, day, hours, minutes, seconds);
    } catch {
      return new Date(); // fallback to now if parsing fails
    }
  };

  const parsedDate = parseCustomDate(timestamp);
  const diffMs = Date.now() - parsedDate.getTime();

  const getTimeAgo = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    return parsedDate.toLocaleDateString();
  };

  const timeAgo = getTimeAgo(diffMs);

  return (
    <div className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-none">
      <div className="flex-shrink-0">{iconElement}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-800 font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex items-center text-xs text-gray-400 mt-1 gap-1">
          <Calendar className="w-3 h-3" />
          {timestamp}
        </div>
      </div>
      <div className="text-xs text-gray-400 whitespace-nowrap">{timeAgo}</div>
    </div>
  );
};

export default ActivityCard;
