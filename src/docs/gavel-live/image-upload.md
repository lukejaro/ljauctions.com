# Image upload

Implemented for bytes the API receives. Remote URLs are optional and checked. No filesystem path is accepted.

## Multipart

`POST /api/v1/lots/{lotId}/images` with field `file` and optional `alt`. The scope is `lots:images`.

## JSON

```json
{ "url": "https://cdn.example/chair.jpg", "alt": "Oak chair" }
```

or

```json
{ "base64": "BASE64_BYTES", "alt": "Oak chair" }
```

## Checks

- Magic bytes must be JPEG, PNG, or WebP. The extension and declared type are not trusted for the JSON path.
- Larger than 8 MB is rejected.
- `url` must be `https`, port 443 or empty, with no username or password.
- `localhost`, `.local`, and blocked IPs are rejected before fetch: loopback, private LAN, link-local, `169.254.169.254`, multicast, and IPv6 local ranges.
- DNS answers are checked the same way. Redirects are not followed. The body is stopped at 8 MB.
- The fetch times out after 5 seconds. A host that changes its DNS answer between the lookup and the connection is a residual risk; private answers and redirects are still refused.
- Public IPv6 addresses are allowed. Loopback, unique-local (`fc`/`fd`), link-local, and multicast IPv6 are not.

A path such as `/etc/passwd` or `file://` is a validation error. The stored file is only under `data/uploads/lots/{lotId}/` via `storeLotImageBytes`.

If the sale is live, adding or deleting a photograph emits `auction:state` so connected clients reload the current lot from the database.
