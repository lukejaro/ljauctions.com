# LJ Auctions

Marketing site for [ljauctions.com](https://ljauctions.com). Five static pages, no backend and no analytics.

## Stack

- [Astro](https://astro.build) 7, static output
- [Tailwind CSS](https://tailwindcss.com) 4
- TypeScript

Motion is part of the pages: a scroll progress rule, a hero that settles in, sections that reveal as they enter, and — on a tall desktop window — a pinned stage where the four “What we auction” categories take turns. Page changes lift the main column. With `prefers-reduced-motion: reduce`, those animations are off and every section is the static layout. Nothing is hidden behind JavaScript.

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

- Name, phone, and email are published on the contact card. The phone is shown as `(830) 743-1180` and linked as `tel:+18307431180`.
- Leave service area or address `null` to keep that bracketed placeholder. Do not invent a street address or professional designation.
- `texasAuctioneerLicense` in `src/data/site.ts` is the TDLR number. It renders as “Texas Auctioneer License #…” on the contact card, in the footer, and on About. Leave it empty to hide those lines. Do not add an expiration date.
- “Add to contacts” downloads [`public/luke-jaroszewski.vcf`](public/luke-jaroszewski.vcf). Astro rewrites that file from `renderVcard()` when it starts. On Netlify the file is served as `text/vcard` with an attachment filename.
- Add sales to `upcomingAuctions`. An empty list renders “None scheduled” on the home teaser and the auctions page. Dates already past are omitted on the next build.
