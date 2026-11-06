# Gavel Live admin API and MCP

Status: implemented in the unmerged Gavel Live branch. Not deployed. Configuration of a real token is required before an agent can call it. This installation is one auction house in one SQLite file. There is no separate tenant id.

The admin HTTP API is `/api/v1`. The MCP server in `scripts/admin-mcp.ts` is a stdio adapter over that API. It does not embed a chat model and it does not run shell commands.

An administrator creates a credential while signed in at `/admin/access`. The plaintext `gvl_…` token is shown once. The database stores `sha256` of the token, a 12-character prefix, scopes, and an expiry. Revocation is immediate.

Public docs for the LJ Auctions site should be copied from this `docs/admin-api/` directory. Do not publish a live token with them.

| Document | What it covers |
| --- | --- |
| [REST reference](rest-reference.md) | Paths, errors, pagination, idempotency, rate limit |
| [MCP quickstart](mcp-quickstart.md) | stdio config and tool annotations |
| [Auth and security](auth-security.md) | Scopes, hashing, revocation, what is not public |
| [Image upload](image-upload.md) | Bytes, URLs, and what is rejected |
| [Examples](examples.md) | curl with placeholders |
| [Realtime](realtime-events.md) | When a write emits `auction:state` |
| [openapi.yaml](openapi.yaml) | Machine-readable contract |

Implemented now: the routes, scopes, audit rows, idempotency keys, the 60/minute in-process limiter, image sniffing, URL host checks, MCP stdio tools, and the desk page.

Configuration required before use: a clerk account on that server, a credential the clerk creates, and `GAVEL_API_BASE` plus `GAVEL_ADMIN_API_TOKEN` in the agent that launches MCP. Google, Stripe, and a public hostname are not required for this API.
