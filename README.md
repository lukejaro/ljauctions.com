# LJ Auctions

Marketing site for [ljauctions.com](https://ljauctions.com). Five static pages, no backend and no analytics.

## Stack

- [Astro](https://astro.build) 7, static output
- [Tailwind CSS](https://tailwindcss.com) 4
- TypeScript

## Pages

| Path | Page |
| --- | --- |
| `/` | Home — positioning, credibility strip, what we auction, next sale |
| `/about` | Approach, with TODO lines for biography and credentials |
| `/services` | What LJ Auctions sells and calls |
| `/auctions` | Upcoming auctions, including the empty calendar |
| `/contact` | vCard-style contact card |

## Run locally

```bash
npm install
npm run dev
```

The dev server prints a local URL (Astro’s default is http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/`. `npm run preview` serves that folder.

`npm run check` runs the Astro type checker.

## Deploy

The site is fully static. [netlify.toml](netlify.toml) sets the build command to `npm run build` and the publish directory to `dist`. No adapter and no serverless functions.

Any static host can serve `dist` the same way (Netlify, Cloudflare Pages, or similar). Build command: `npm run build`. Output directory: `dist`.

## Edit content

Contact details, credentials, services, and the auction calendar live in [`src/data/site.ts`](src/data/site.ts).

- Leave a contact field `null` to keep its bracketed placeholder. Do not invent a phone number, email address, street address, or professional designation.
- Set `contact.email` to the real inbox. The card’s “Email us” link then becomes a `mailto:`.
- Add sales to `upcomingAuctions`. An empty list renders “None scheduled” on the home teaser and the auctions page. Dates already past are omitted on the next build.
