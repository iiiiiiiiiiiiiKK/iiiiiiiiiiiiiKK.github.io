import { config } from "@/data/config";
import { GitHubStarsButton } from "../ui/shadcn-io/github-stars-button";

/**
 * Header star badge.
 *
 * Renders `config.github.stars` verbatim — a hard-coded number, so the header
 * never fires a GitHub API request (no rate limits, no build-time network
 * dependency). To show the live count later, set `stars: 0` and fill in
 * `config.github.repo`; the button then links to that repository.
 */
export default function GitHubStars({ className }: { className?: string }) {
  const { stars, link, username, repo } = config.github;
  if (!stars) return null;

  return (
    <GitHubStarsButton
      username={username}
      repo={repo || username}
      stars={stars}
      href={link}
      className={className}
    />
  );
}
