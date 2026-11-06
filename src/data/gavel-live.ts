/**
 * Gavel Live admin API preview.
 *
 * Prose and the OpenAPI file are copied from the supplied archive. See
 * src/docs/gavel-live/SOURCE.txt. Do not add endpoints, hosts, commands,
 * or security behavior that are not in those files.
 *
 * Sample commands keep the placeholder token gvl_PASTE_THE_TOKEN_FROM_THE_DESK.
 * The build refuses any other gvl_ token. Pages stay out of the index:
 * this contract is unmerged and undeployed.
 */
import authSecurity from "../docs/gavel-live/auth-security.md?raw";
import examples from "../docs/gavel-live/examples.md?raw";
import imageUpload from "../docs/gavel-live/image-upload.md?raw";
import mcpQuickstart from "../docs/gavel-live/mcp-quickstart.md?raw";
import openApiSpec from "../docs/gavel-live/openapi.yaml?raw";
import overview from "../docs/gavel-live/overview.md?raw";
import realtimeEvents from "../docs/gavel-live/realtime-events.md?raw";
import restReference from "../docs/gavel-live/rest-reference.md?raw";

export const gavelLiveSection = {
  label: "Gavel Live",
  href: "/gavel-live/",
} as const;

export const gavelLiveSource = {
  pullRequest: "https://github.com/lukejaro/gavel-live/pull/1",
  commit: "dd31123717245933b3c105d50068e1775c4edae3",
  openapiHref: "/gavel-live/openapi.yaml",
  openapiFilename: "gavel-live-admin-openapi.yaml",
  placeholderToken: "gvl_PASTE_THE_TOKEN_FROM_THE_DESK",
} as const;

export const gavelLiveDraft = {
  eyebrow: "Gavel Live · Preview",
  bannerLead: "Unmerged, undeployed API preview.",
  bannerText: `Copied from Gavel Live commit ${gavelLiveSource.commit}. Not a live endpoint. Sample commands use the placeholder ${gavelLiveSource.placeholderToken} only.`,
} as const;

/** Repeated on every page. Each line is in the supplied contract. */
export const gavelLivePreviewFacts = [
  "Implemented in the unmerged Gavel Live branch. Not deployed. These pages are not live endpoints.",
  "The MCP server in scripts/admin-mcp.ts is a stdio adapter over the admin API. It speaks MCP on stdin/stdout. It is not a hosted remote MCP service.",
  "A signed-in clerk creates the token, and scopes limit that token. This installation is one auction house in one SQLite file, not a multi-tenant platform.",
] as const;

export type GavelLivePageId =
  | "overview"
  | "rest-api"
  | "mcp"
  | "authentication"
  | "image-upload"
  | "examples"
  | "realtime"
  | "openapi";

export type GavelLivePage = {
  id: GavelLivePageId;
  href: string;
  label: string;
  title: string;
  documentTitle: string;
  description: string;
  lede: string;
  note?: string;
  markdown?: string;
  spec?: string;
};

const previewDescription = "Unmerged, undeployed preview of the Gavel Live admin API contract. Not a live endpoint.";

export const gavelLivePages: readonly GavelLivePage[] = [
  {
    id: "overview",
    href: "/gavel-live/",
    label: "Overview",
    title: "Gavel Live admin API and MCP",
    documentTitle: "Gavel Live admin API (preview)",
    description: previewDescription,
    lede: "Admin HTTP API and a stdio MCP adapter for one auction house. Unmerged and not deployed.",
    note: "LJ Auctions calls benefit auctions, estates, and equipment. This preview does not change that work.",
    markdown: overview,
  },
  {
    id: "rest-api",
    href: "/gavel-live/rest-api/",
    label: "REST API",
    title: "REST reference (v1)",
    documentTitle: "Gavel Live REST reference (preview)",
    description: previewDescription,
    lede: "Paths, errors, pagination, idempotency, and the in-process rate limit from the preview contract. Not a live host.",
    markdown: restReference,
  },
  {
    id: "mcp",
    href: "/gavel-live/mcp/",
    label: "MCP setup",
    title: "MCP quickstart",
    documentTitle: "Gavel Live MCP setup (preview)",
    description: previewDescription,
    lede: "A local stdio process for the TypeScript SDK. Not a hosted remote MCP service. A clerk-created token is required.",
    markdown: mcpQuickstart,
  },
  {
    id: "authentication",
    href: "/gavel-live/authentication/",
    label: "Authentication and security",
    title: "Auth and security",
    documentTitle: "Gavel Live authentication (preview)",
    description: previewDescription,
    lede: "Clerk-created tokens, scopes, hashing, and revocation. One auction house, not multi-tenant.",
    markdown: authSecurity,
  },
  {
    id: "image-upload",
    href: "/gavel-live/image-upload/",
    label: "Image upload",
    title: "Image upload",
    documentTitle: "Gavel Live image upload (preview)",
    description: previewDescription,
    lede: "How the preview contract accepts photographs, and what it rejects.",
    markdown: imageUpload,
  },
  {
    id: "examples",
    href: "/gavel-live/examples/",
    label: "Examples",
    title: "Examples",
    documentTitle: "Gavel Live examples (preview)",
    description: previewDescription,
    lede: "Sample commands from the contract. The token is a placeholder, and the host is local. These are not live requests.",
    markdown: examples,
  },
  {
    id: "realtime",
    href: "/gavel-live/realtime/",
    label: "Realtime",
    title: "Realtime events",
    documentTitle: "Gavel Live realtime events (preview)",
    description: previewDescription,
    lede: "When a write emits auction:state. The admin API does not open its own socket.",
    markdown: realtimeEvents,
  },
  {
    id: "openapi",
    href: "/gavel-live/openapi/",
    label: "OpenAPI",
    title: "OpenAPI",
    documentTitle: "Gavel Live OpenAPI (preview)",
    description: previewDescription,
    lede: "The machine-readable contract from the same commit. Its server default is a local base, not a live host.",
    spec: openApiSpec,
  },
];

const credentialPattern = /gvl_[A-Za-z0-9_-]+/g;
const blockedSecret = /-----BEGIN [A-Z ]*PRIVATE KEY-----|\bAKIA[0-9A-Z]{16}\b|\bsk_live_[A-Za-z0-9]+\b/;

function assertNoLiveCredentials(label: string, text: string): void {
  const tokens = new Set(text.match(credentialPattern) ?? []);
  for (const token of tokens) {
    if (token !== gavelLiveSource.placeholderToken) {
      throw new Error(`${label} contains a token other than the documented placeholder`);
    }
  }
  if (blockedSecret.test(text)) {
    throw new Error(`${label} contains a blocked secret pattern`);
  }
}

for (const page of gavelLivePages) {
  if (page.markdown) assertNoLiveCredentials(page.id, page.markdown);
  if (page.spec) assertNoLiveCredentials(page.id, page.spec);
}

export function gavelLivePage(id: GavelLivePageId): GavelLivePage {
  const page = gavelLivePages.find((item) => item.id === id);
  if (!page) throw new Error(`Unknown Gavel Live page: ${id}`);
  return page;
}

export function gavelLiveCrumbs(page: GavelLivePage): readonly { name: string; href: string }[] {
  if (page.id === "overview") {
    return [{ name: gavelLiveSection.label, href: gavelLiveSection.href }];
  }
  return [
    { name: gavelLiveSection.label, href: gavelLiveSection.href },
    { name: page.label, href: page.href },
  ];
}
