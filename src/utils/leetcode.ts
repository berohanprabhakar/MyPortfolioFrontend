export async function fetchLeetCodeActivity(username: string) {
  try {
    const res = await fetch("https://alfa-leetcode-api.onrender.com/berohanprabhakar/acSubmission", {
      method: "GET",
    });

    const json = await res.json();
    console.log(json);
    const submissions = json?.submission?.slice(0, 5).map((s: any) => ({
      icon: "leetcode" as const,
      title: "LeetCode Submission",
      description: `${s.title} (${s.lang}) – ${s.statusDisplay}`,
      timestamp: new Date(s.timestamp * 1000).toLocaleString(),
    }));

    return submissions;
  } catch (err) {
    console.error("LeetCode fetch error:", err);
    return [];
  }
}
