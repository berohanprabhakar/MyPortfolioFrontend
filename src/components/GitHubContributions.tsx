import { GitHubCalendar } from "react-github-calendar";
import { Contents } from "../content";

const getGitHubUsername = (profileUrl: string) => {
  try {
    const url = new URL(
      profileUrl.startsWith("http") ? profileUrl : `https://${profileUrl}`,
    );

    return url.pathname.split("/").filter(Boolean)[0] ?? profileUrl;
  } catch {
    return profileUrl.split("/").filter(Boolean).at(-1) ?? profileUrl;
  }
};

function GitHubContributions() {
  const githubProfile = Contents.personaldetails.socials.github;
  const username = getGitHubUsername(githubProfile);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-600">
          A snapshot of my public GitHub contribution activity over the last
          year.
        </p>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="mx-auto w-max">
          <GitHubCalendar
            username={username}
            blockMargin={4}
            blockRadius={3}
            blockSize={12}
            colorScheme="light"
            fontSize={12}
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
            showWeekdayLabels={["mon", "wed", "fri"]}
            theme={{
              light: ["#ebedf0", "#aceebb", "#4ac26b", "#239a45", "#19692c"],
            }}
          />
        </div>
      </div>

      <a
        href={`https://${githubProfile}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex text-sm font-semibold text-blue-600 hover:underline"
      >
        View GitHub profile
      </a>
    </div>
  );
}

export default GitHubContributions;
