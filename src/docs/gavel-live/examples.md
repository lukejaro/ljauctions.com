# Examples

Replace `BASE` and `TOKEN`. Do not commit a real token.

```bash
export BASE=http://127.0.0.1:3000
export TOKEN=gvl_PASTE_THE_TOKEN_FROM_THE_DESK
```

List auctions:

```bash
curl -sS "$BASE/api/v1/auctions?limit=20" \
  -H "Authorization: Bearer $TOKEN"
```

Create a scheduled sale:

```bash
curl -sS -X POST "$BASE/api/v1/auctions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: catalog-2026-11-07-sale" \
  -d '{"title":"Saturday tools","startTime":"2026-11-07T15:00:00.000Z","location":"Austin","buyersPremiumPercent":12,"currency":"USD","timeZone":"America/Chicago"}'
```

Add a draft lot (cents):

```bash
curl -sS -X POST "$BASE/api/v1/auctions/AUCTION_ID/lots" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: lot-wrench-1" \
  -d '{"title":"Adjustable wrench","estimateLowCents":2000,"estimateHighCents":4000,"startingBidCents":1000,"reserveCents":2500,"lotNumber":1}'
```

Change an estimate on a scheduled lot:

```bash
curl -sS -X PATCH "$BASE/api/v1/lots/LOT_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"estimateHighCents":4500}'
```

Upload a file:

```bash
curl -sS -X POST "$BASE/api/v1/lots/LOT_ID/images" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@./chair.jpg;type=image/jpeg" \
  -F "alt=Oak chair"
```

Delete is refused until confirm is sent, and still refused if the lot is not an empty draft:

```bash
curl -sS -X DELETE "$BASE/api/v1/lots/LOT_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"confirm":false}'
```
