import type { APIRoute } from "astro";
import spec from "../../docs/gavel-live/openapi.yaml?raw";

export const prerender = true;

/** Same text as src/docs/gavel-live/openapi.yaml. Not a live API server. */
export const GET: APIRoute = () => {
  return new Response(spec, {
    headers: {
      "Content-Type": "application/yaml; charset=utf-8",
      "Content-Disposition": 'attachment; filename="gavel-live-admin-openapi.yaml"',
      "X-Robots-Tag": "noindex",
    },
  });
};
