# Demo baseline — Premier Event Catering

This repo’s catering demo is frozen so you can try client branding without losing the public preview.

## Restore points (Git)

| Ref | Purpose |
|-----|---------|
| Tag `demo-baseline` | Exact snapshot of the public demo |
| Branch `demo/premier-event-catering` | Long-lived copy of that snapshot |

Current live demo: https://preview.apexwebworx.com/catering

### Go back to this demo version

```bash
# Inspect or run the frozen demo locally
git fetch origin
git checkout demo-baseline
# or
git checkout demo/premier-event-catering

npm install
npm run dev
```

### After client branding experiments on `main`

```bash
# Throw away local main changes and match the demo again
git fetch origin
git checkout main
git reset --hard demo-baseline
git push --force-with-lease origin main   # only if you intentionally want remote main = demo again
```

Prefer client work on a branch instead of rewriting `main`:

```bash
git checkout -b client/acme-catering demo-baseline
# …branding edits…
# deploy from this branch or open a PR — leave demo-baseline alone
```

## Branding touchpoints (change these for a client)

Keep production client work out of `missouri-grill-chef` unless that is the real client repo. For **this** preview repo, customize:

| Area | Files |
|------|--------|
| Brand name, phone, email, disclaimer | `src/lib/demo.ts` |
| Hero / about / menu / testimonials copy | `src/lib/i18n.ts` |
| Logo | `public/premier-logo.svg` (and favicons under `public/`) |
| Chef portrait | `public/chef-portrait.png` |
| Occasion / gallery photos | `src/assets/event-*.png`, `src/assets/gallery-*.png` |
| Dish images | `src/assets/dish-*.png` + `src/lib/dish-images.ts` |
| Hub card title | `src/pages/preview-hub.tsx` |

Do **not** remove demo disclaimers / demo modal when showing this as an Apex concept site. For a real client deliverable, build from a client branch and remove demo chrome intentionally.

## Deploy

```bash
npm run deploy
```

Deploys to `preview.apexwebworx.com` (Cloudflare Workers static assets).
