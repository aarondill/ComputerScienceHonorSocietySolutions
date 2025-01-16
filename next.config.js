const { VERCEL_GIT_REPO_SLUG, VERCEL_GIT_REPO_OWNER } = process.env;
import { execSync } from "child_process";
const NEXT_PUBLIC_GITHUB_URL =
  VERCEL_GIT_REPO_OWNER && VERCEL_GIT_REPO_SLUG
    ? `https://github.com/${VERCEL_GIT_REPO_OWNER}/${VERCEL_GIT_REPO_SLUG}`
    : execSync("git config --get remote.origin.url").toString().trim();
if (!NEXT_PUBLIC_GITHUB_URL) {
  console.warn(
    "Warning: Could not find GitHub URL in environment variables. Using empty string."
  );
}
export default {
  env: {
    NEXT_PUBLIC_GITHUB_URL,
  },
};
