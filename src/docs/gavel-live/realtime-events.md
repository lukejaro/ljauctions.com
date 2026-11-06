# Realtime events

Implemented for writes that change what a connected client is showing. The admin API does not open its own socket. It calls `emitAuctionSnapshot`, the same publisher as the clerk console.

`auction:state` is sent when all of these are true:

- the lot or auction belongs to a sale whose status is `LIVE`
- the write was a lot update, an auction settings update, or an image add or delete

The snapshot is loaded from SQLite after the write. Clients should treat it as the record. A missed event is repaired by joining the auction room again. Delivery is not guaranteed. See `docs/realtime-reliability.md`.

These writes do not broadcast, because they are refused first:

- starting bid, estimate, or reserve on a sold or passed lot
- those prices on a closed sale
- those prices on the lot currently on the block
- starting bid after any bid row exists

Creating a lot on a live or closed sale is also refused, so it does not broadcast a new current lot.

The public bidder API and the admin API stay separate. A bidder token cannot call `/api/v1`. An admin token is not a paddle and does not place bids.
