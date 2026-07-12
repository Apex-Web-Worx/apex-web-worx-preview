# Apex Web Worx — Demo Preview Hub

Public demo website concepts by [Apex Web Worx](https://apexwebworx.com).

**Live URL:** https://preview.apexwebworx.com

## Routes

| Path | Demo |
|------|------|
| `/` | Preview hub |
| `/catering` | Premier Event Catering (full demo) |
| `/detailing` | Apex Detailing (full demo) |
| `/contractor` | Contractor Pro (placeholder) |
| `/salon` | Salon & Spa (placeholder) |
| `/restaurant` | Restaurant Reserve (placeholder) |

## Demo restore point

The catering demo is tagged so you can try client branding and return safely.

- Tag: `demo-baseline`
- Branch: `demo/premier-event-catering`
- Guide: [DEMO.md](./DEMO.md)

```bash
git fetch origin
git checkout demo-baseline   # frozen public demo
```

For a client branding trial, branch off the tag — do not overwrite the tag:

```bash
git checkout -b client/your-client-name demo-baseline
```

## Development

```bash
npm install
npm run dev
```

## Deploy (Cloudflare Workers Builds)

This repository is connected to **Cloudflare Workers Builds**. Pushes to `main` are built and deployed automatically.

Local build check:

```bash
npm run build
```

`wrangler.jsonc` serves `./dist` as static assets with SPA fallback (`not_found_handling: single-page-application`).

During Cloudflare Workers Builds, `npm ci` runs the `prepare` script when `WORKERS_CI` is set, which builds `./dist` before `npx wrangler deploy`.

## Disclaimer

All demos are frontend-only. No real data, payments, or backend connections.
