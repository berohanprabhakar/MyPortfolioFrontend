import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { fetchGitHubActivity } from '../utils/github';
import { fetchLeetCodeActivity } from '../utils/leetcode';
import ActivityCard from './ActivityCard';
import Skeleton from 'react-loading-skeleton';
import ActivityCardSkeleton from './ActivityCardSkeleton';

interface Activity {
  icon: 'github' | 'leetcode';
  title: string;
  description: string;
  timestamp: string;
  timeago: string;
}

function toMillis(t: any) {
  if (typeof t === 'number') return t;

  const [datePart, timePart] = t.split(', ');
  const [d, m, y] = datePart.split('/').map(Number);
  const [hh, mm] = timePart.split(':').map(Number);

  return new Date(y, m - 1, d, hh, mm).getTime();
}
function time_ago(time: any) {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }

  const time_formats = [
    [60, 'seconds', 1],
    [120, '1 minute ago', '1 minute from now'],
    [3600, 'minutes', 60],
    [7200, '1 hour ago', '1 hour from now'],
    [86400, 'hours', 3600],
    [172800, 'Yesterday', 'Tomorrow'],
    [604800, 'days', 86400],
    [1209600, 'Last week', 'Next week'],
    [2419200, 'weeks', 604800],
    [4838400, 'Last month', 'Next month'],
    [29030400, 'months', 2419200],
    [58060800, 'Last year', 'Next year'],
    [2903040000, 'years', 29030400],
    [5806080000, 'Last century', 'Next century'],
    [58060800000, 'centuries', 2903040000],
  ];

  let seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) return 'Just now';
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  let i = 0,
    format;

  while ((format = time_formats[i++]))
    if (seconds < (format[0] as number)) {
      if (typeof format[2] == 'string') return format[list_choice];
      else return Math.floor(seconds / Number(format[2])) + ' ' + format[1] + ' ' + token;
    }

  return time;
}

const ActivitySection: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [gitHub, leetCode] = await Promise.all([
        fetchGitHubActivity('berohanprabhakar'), // replace with your username
        fetchLeetCodeActivity('berohanprabhakar'), // replace with your username
      ]);

      const combined = [...gitHub, ...leetCode]
        .sort((a, b) => toMillis(b.timestamp) - toMillis(a.timestamp))
        .map((item) => ({
          ...item,
          timeago: time_ago(toMillis(item.timestamp)), // ✅ append here
        }));

      console.log(combined);
      setActivities(combined);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {loading ? (
        <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <ActivityCardSkeleton key={i} />
          ))}
        </div>
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
        ">
          {activities.map((a, i) => (
            <ActivityCard key={i} {...a} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ActivitySection;
