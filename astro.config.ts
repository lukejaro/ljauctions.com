import { readFileSync, writeFileSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import type { Connect, Plugin } from "vite";
import { renderVcard, vcardFile } from "./src/data/site";

const root = dirname(fileURLToPath(import.meta.url));
const vcardPath = resolve(root, "public", vcardFile.filename);
writeFileSync(vcardPath, renderVcard());

function vcardHeaders(): Plugin {
  const serve = (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
    const url = req.url?.split("?")[0];
    if (url !== vcardFile.href) {
      next();
      return;
    }
    const body = readFileSync(vcardPath);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/vcard; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${vcardFile.filename}"`);
    res.setHeader("Content-Length", body.length);
    res.end(body);
  };

  return {
    name: "lj-vcard-headers",
    configureServer(server) {
      server.middlewares.use(serve);
    },
    configurePreviewServer(server) {
      server.middlewares.use(serve);
    },
  };
}

export default defineConfig({
  site: "https://ljauctions.com",
  output: "static",
  vite: {
    plugins: [tailwindcss(), vcardHeaders()],
  },
});
