import { writeFileSync } from "node:fs";

// SPA fallback for the /catering subpath on Cloudflare Pages
writeFileSync(
  "dist/_redirects",
  "/catering/*  /catering/index.html  200\n/  /catering/  302\n",
);

console.log("Prepared Cloudflare deploy: dist/_redirects");
