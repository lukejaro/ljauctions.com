import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://ljauctions.com",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
