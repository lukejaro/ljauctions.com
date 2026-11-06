# MCP quickstart

Status: implemented for the official TypeScript SDK over stdio. A smoke test in `scripts/admin-mcp.smoke.ts` launches that client against a throwaway database. This does not mean every agent product has been certified.

## Run the server

```bash
GAVEL_API_BASE=http://127.0.0.1:3000 \
GAVEL_ADMIN_API_TOKEN=gvl_PASTE_THE_TOKEN_FROM_THE_DESK \
npx tsx scripts/admin-mcp.ts
```

The process speaks MCP on stdin/stdout. If the token is missing it exits before calling the API.

## Example client config

```json
{
  "mcpServers": {
    "gavel-live-admin": {
      "command": "npx",
      "args": ["tsx", "/ABSOLUTE/PATH/gavel-live/scripts/admin-mcp.ts"],
      "env": {
        "GAVEL_API_BASE": "http://127.0.0.1:3000",
        "GAVEL_ADMIN_API_TOKEN": "gvl_PASTE_THE_TOKEN_FROM_THE_DESK"
      }
    }
  }
}
```

Put the real token in the agent host's secret store, not in a wiki page.

## Tools

| Tool | Annotation | Confirm |
| --- | --- | --- |
| list_auctions, get_auction, list_lots, get_lot, list_audit | readOnlyHint true | no |
| create_auction, create_lot, add_lot_image | destructiveHint false | no |
| update_auction_settings, update_lot | idempotentHint true | no |
| delete_lot, delete_lot_image | destructiveHint true | `confirm: true` or the API returns confirmation_required and does not delete |

There is no MCP tool that creates or prints credentials. Minting stays on `/admin/access` or `POST /api/v1/credentials` with `credentials:manage`.

## Smoke test

```bash
npm run test:admin-mcp
```

That command is the interoperability check for this SDK and stdio. It uses a temporary database and deletes it afterward.
