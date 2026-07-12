/**
 * Run production build during Cloudflare Workers Builds (npm ci) so
 * `npx wrangler deploy` can upload ./dist without a separate dashboard build step.
 */
import { execSync } from "node:child_process";

const isWorkersCi = process.env.WORKERS_CI === "1";
const isCi = process.env.CI === "true" || process.env.CI === "1";

if (isWorkersCi || isCi) {
  execSync("npm run build", { stdio: "inherit" });
}
