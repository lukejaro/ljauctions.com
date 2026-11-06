# Auth and security

Implemented. A token is configuration the clerk creates. This repository does not ship a usable token.

## Who can create a key

Only a signed-in clerk (`role` ADMIN) on `/admin/access`, or an existing credential with `credentials:manage`. There is no unauthenticated bootstrap. The first clerk is still the account created by registration or seed on that machine.

The desk shows the `gvl_…` string once. `ApiCredential.tokenHash` is SHA-256. List responses show `prefix` (12 characters), scopes, expiry, and `revokedAt`. They do not show the hash.

Revoke on the desk or `POST /api/v1/credentials/{id}/revoke`. The next request with that token is 401. The desk lists only keys owned by the signed-in clerk. An API token with `credentials:manage` can mint another key, including one with `destructive`. Grant that scope only to a clerk who should be able to widen access. The MCP server has no tool that mints a key.

Expiry is 1–365 days. After `expiresAt`, the token is 401 even if it was not revoked.

## What the key can touch

This server has one house database. Scopes limit commands, not a second tenant. A key cannot bid, cannot read bidder passwords, and cannot see Stripe secrets. Admin lot reads include `reserveCents` because the clerk already can. The public bidder API still hides reserves.

## Audit

Writes append `AdminAudit` with credential id, user id, action, target type, target id, and ok. Request bodies are not stored. `redactRecord` would mask token, secret, password, authorization, cookie, and cvc fields if a log helper were pointed at a payload. The MCP process is told not to print the env token.

## Destructive calls

`delete_lot` and `delete_lot_image` need the `destructive` scope and an explicit confirm. Without confirm the response is `confirmation_required` and the row stays. Delete lot also refuses anything that is not a draft with zero bids and no invoice. It does not silently pass the lot.

## Rate limit

60 requests per minute per credential, in memory, on this process. Documented header: `Retry-After`.
