import { config } from "@/data/config";

/**
 * Optional: fetch a live star count from the GitHub API.
 *
 * Not used by default — `config.github.stars` is a hard-coded number so the
 * header never depends on network access or the unauthenticated 60 req/hr
 * rate limit. Call this from a server component if you ever want the real
 * count instead (it runs once per build in a static export).
 */
export async function getGithubStars(): Promise<number> {
  const { username, repo } = config.github;
  if (!username || !repo) {
    throw new Error("config.github.username / repo are required for live stars");
  }

  const res = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`);
  }

  const data = await res.json();
  if (typeof data.stargazers_count !== "number") {
    throw new Error("Unexpected GitHub API response shape");
  }
  return data.stargazers_count;
}
