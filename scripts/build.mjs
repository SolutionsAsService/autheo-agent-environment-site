import { mkdir, copyFile, writeFile, rm } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const dist = new URL("dist/", root);
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of [
  "index.html",
  "style.css",
  "app.js",
  "policy.js",
  "favicon.svg",
])
  await copyFile(new URL(file, root), new URL(file, dist));
await writeFile(new URL(".nojekyll", dist), "");
console.log("Built six public static files in dist. No runtime dependencies.");
