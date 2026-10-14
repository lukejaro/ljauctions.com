// Decodes binary site assets (favicons, hero cutout) stored as base64 text in
// assets-b64/ into public/ before each build. They are kept as text because the
// tooling used to publish this change can only commit text files.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const targets = {
  "favicon.ico.b64": "public/favicon.ico",
  "favicon-32.png.b64": "public/favicon-32.png",
  "favicon-48.png.b64": "public/favicon-48.png",
  "favicon-192.png.b64": "public/favicon-192.png",
  "favicon-512.png.b64": "public/favicon-512.png",
  "og-image.png.b64": "public/og-image.png",
  "apple-touch-icon.png.b64": "public/apple-touch-icon.png",
  "luke-calling-cutout.webp.b64": "public/hero/luke-calling-cutout.webp",
};

for (const name of readdirSync("assets-b64")) {
  const out = targets[name];
  if (!out) continue;
  const bytes = Buffer.from(readFileSync(join("assets-b64", name), "utf8"), "base64");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, bytes);
  console.log(`decoded ${out} (${bytes.length} bytes)`);
}
