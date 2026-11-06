# REST reference (v1)

Base path: `/api/v1`. Header on every response: `X-Gavel-API-Version: 1`.

## Errors

```json
{ "error": { "code": "invariant", "message": "Prices on a sold or passed lot cannot be changed." } }
```

| HTTP | code | Meaning |
| --- | --- | --- |
| 401 | unauthorized | Missing, expired, or revoked credential |
| 403 | forbidden | Scope missing |
| 404 | not_found | Auction, lot, image, or path |
| 400 | validation_error | Body or image failed checks |
| 409 | conflict | Idempotency key clash, or lot number taken |
| 409 | confirmation_required | Destructive call without confirm |
| 409 | invariant | Live, closed, sold, or bid history blocks the edit |
| 429 | rate_limited | Over 60 requests in the current minute. `Retry-After` is seconds |
| 500 | internal | Unexpected failure. The body does not include a stack or a token |

## Pagination

`GET /api/v1/auctions?limit=20&cursor=`. `limit` is 1–100, default 20. The response is `{ "data": [], "page": { "limit": 20, "nextCursor": null } }`. Pass `nextCursor` back unchanged. Lot lists are not paged; a sale's lots come back in lot-number order.

## Idempotency

`POST /api/v1/auctions` and `POST /api/v1/auctions/{id}/lots` accept `Idempotency-Key` (8–80 characters). The same key and same body return the stored response and `Idempotent-Replayed: true`. The same key with a different body is `409 conflict`. A key left in progress is `409` with "still in progress".

## Rate limit

60 requests per minute per credential, counted in this server process. A restart clears the window. It is not a global quota across multiple processes.

## Money

Integer cents. `150000` is $1,500.00 when the auction currency is USD. The API does not accept dollar strings.

## Scopes

`auctions:read`, `auctions:write`, `lots:read`, `lots:write`, `lots:images`, `settings:write`, `destructive`, `credentials:manage`, `audit:read`.

`PATCH /api/v1/auctions/{id}` uses `settings:write` when the body touches currency, time zone, country, format, premium, location, or description. Title-only updates use `auctions:write`.

Opening or closing a sale is not this API. Sending `status` with a different value returns `409 invariant`. The clerk console remains the live control. `destructive` covers draft deletion and photograph deletion only. A retry of `POST` with the same `Idempotency-Key` compares the client body, not a generated slug. If the handler throws, the in-progress key is removed so a later retry can run.
