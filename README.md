# Premier Event Catering — Demo Preview

Public demo website concept by [Apex Web Worx](https://apexwebworx.com).

**Live URL:** https://preview.apexwebworx.com/catering

This is a **frontend-only** showcase — no real database, emails, payments, or API keys. All forms display a demo modal instead of submitting data.

## Features

- Premium catering landing page
- Menu & package preview with live guest-count pricing
- Event booking form (frontend demo)
- Calendar availability preview
- Admin dashboard preview with sample data
- Reviews, gallery, SEO benefits section
- Mobile-friendly, Cloudflare Pages ready

## Disclaimer

> Demo Website Concept by Apex Web Worx — not an official business website.

## Development

```bash
npm install
npm run dev
```

Local dev serves at `http://localhost:5173/catering/`

## Cloudflare Pages

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Base path | `/catering/` (configured in `vite.config.ts`) |

SPA routing is handled via `public/_redirects`.

## Production Client

The real catering platform lives in a separate private repository and is not part of this demo.
