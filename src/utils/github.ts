export async function fetchGitHubActivity(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events`);
    const data = await res.json();
    console.log(data);

    const pushes = data
      .filter((event: any) => event.type === "PushEvent")
      .slice(0, 5)
      .map((event: any) => ({
        icon: "github" as const,
        title: "GitHub Commit",
        description: `${event.repo.name}`,
        timestamp: new Date(event.created_at).toLocaleString(),
      }));
      console.log(pushes);
    return pushes;
  } catch (err) {
    console.error("GitHub fetch error:", err);
    return [];
  }
}
