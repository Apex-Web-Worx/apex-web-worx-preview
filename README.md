# Apex Web Worx — Demo Preview Hub

Public demo website concepts by [Apex Web Worx](https://apexwebworx.com).

**Live URL:** https://preview.apexwebworx.com

## Routes

| Path | Demo |
|------|------|
| `/` | Preview hub |
| `/catering` | Premier Event Catering (full demo) |
| `/detailing` | Apex Detailing (placeholder) |
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

## Deploy (Cloudflare Workers + static assets)

```bash
npm run deploy
```

This runs `vite build` then `wrangler deploy`, serving `./dist` with SPA fallback (no Hello World worker script).

### Cloudflare config

- `wrangler.jsonc` — Workers static assets from `./dist`
- GitHub Actions — runs `wrangler deploy` on push to `main` (requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets)

## Disclaimer

All demos are frontend-only. No real data, payments, or backend connections.
