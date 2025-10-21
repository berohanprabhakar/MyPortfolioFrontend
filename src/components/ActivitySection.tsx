import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import { fetchGitHubActivity } from "../utils/github";
import { fetchLeetCodeActivity } from "../utils/leetcode";

interface Activity {
  icon: "github" | "leetcode";
  title: string;
  description: string;
  timestamp: string;
}

const parseDate = (str: any) => {
  // Example input: "22/10/2025, 00:18:49"
  const [datePart, timePart] = str.split(", ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
};

const ActivitySection: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [gitHub, leetCode] = await Promise.all([
        fetchGitHubActivity("berohanprabhakar"), // replace with your username
        fetchLeetCodeActivity("berohanprabhakar"), // replace with your username
      ]);

      const combined = [...gitHub, ...leetCode].sort(
        (a, b) => parseDate(b.timestamp).getTime() - parseDate(a.timestamp).getTime()
      );

      console.log(combined);

      setActivities(combined);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Activity</h2>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading your activity...</p>
      ) : activities.length === 0 ? (
        <p className="text-gray-400 text-sm">No recent activity found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {activities.map((a, i) => (
            <ActivityCard key={i} {...a} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ActivitySection;
