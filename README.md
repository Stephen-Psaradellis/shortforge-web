# ShortForge

The marketing site for [shortforge.dev](https://shortforge.dev): hand-built websites and
automation for small businesses around Chicago, by Stephen Psaradellis.

The site is a static-first Next.js app in `frontend/`. There is no login, no dashboard, and
no database behind it. The only server code is one route handler that emails the contact
form.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4 (tokens live in `frontend/src/app/globals.css`)
- Fraunces (display) and Inter (body) via `next/font`
- `motion` for one subtle scroll-in effect, honoring reduced motion
- Resend for contact form delivery
- Vercel Analytics (cookieless) for page-view counts
- Hosted on Vercel, root directory `frontend`, Node 22

## Where things live

```
frontend/src
  app/            routes, metadata, icons, OG image, sitemap, robots
    (site)/       pages with header and footer
    (print)/      /websites/leaflet, the printable one-sheet
    api/contact/  POST handler -> Resend
  content/        every word of copy and every price, one file per page
  components/     brand (logo mark), ui, layout, sections, forms, leaflet
  lib/            contact schema, rate limit, metadata and JSON-LD helpers
  assets/fonts/   static TTFs used only by the OG image
```

Change copy or prices in `frontend/src/content/*.ts`. Pages only compose components.

## Run it

```bash
cd frontend
npm install
npm run dev
```

Useful scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | dev server on :3000 |
| `npm run build` | production build (also type-checks and lints) |
| `npm run lint` / `npm run type-check` | on their own |
| `python scripts/make-leaflet-pdf.py` | regenerates `public/shortforge-websites.pdf` from `/websites/leaflet` (dev server must be running; needs Playwright) |
| `python scripts/screenshots.py` | full-page screenshots of every route at phone and desktop widths into `.screenshots/` |

## Contact form

`POST /api/contact` validates with the shared zod schema, drops honeypot and too-fast
submissions silently, rate-limits per IP (best effort, in memory), then sends via Resend.

Environment variables (see `frontend/.env.example`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key. Without it, non-production runs log the message instead of sending. |
| `CONTACT_TO_EMAIL` | Where messages go. Defaults to the address in `content/site.ts`. |
| `CONTACT_FROM_EMAIL` | Sender. Must be on a domain verified in Resend. Falls back to `onboarding@resend.dev`, which only delivers to the Resend account owner. |
| `CONTACT_DRY_RUN` | Set to `1` to log instead of send, even with a key. |

## Deploying

Push to `main`. Vercel builds `frontend/`. Set the three `CONTACT_*` variables and
`RESEND_API_KEY` in the Vercel project, and verify `shortforge.dev` in Resend so mail can be
sent from the domain.

Old URLs: `/services` redirects to `/automation`, `/work` to the case study. The former
app routes (`/auth/*`, `/dashboard`, `/admin`, `/agent/*`) return the site's 404 page.
