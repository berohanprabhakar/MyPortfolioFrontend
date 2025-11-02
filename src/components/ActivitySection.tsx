import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import { fetchGitHubActivity } from "../utils/github";
import { fetchLeetCodeActivity } from "../utils/leetcode";
import { Loader } from "lucide-react";

interface Activity {
  icon: "github" | "leetcode";
  title: string;
  description: string;
  timestamp: string;
  timeago : string;
}

const ActivitySection: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [gitHub, leetCode] = await Promise.all([
        fetchGitHubActivity("berohanprabhakar"), // replace with your username
        fetchLeetCodeActivity("berohanprabhakar"), // replace with your username
      ]);

      const combined = [...gitHub, ...leetCode];

      console.log(combined);

      setActivities(combined);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {loading ? (
        <p className="text-gray-400 text-sm flex gap-1 align-middle justify-center"> <Loader /> Loading your activity...</p>
      ) : activities.length === 0 ? (
        <p className="text-gray-400 text-sm"> No recent activity found.</p>
      ) : (
        // ✅ Scrollable container for activities
        <div
          className="
          flex flex-col gap-4
          max-h-[420px]             /* 👈 fits around 5 cards */
          overflow-y-auto
          pr-2
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
        "
        >
          {activities.map((a, i) => (
            <ActivityCard key={i} {...a} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ActivitySection;
