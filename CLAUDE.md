# Project Overview

A Next.js marketing site for a herbal liqueur brand. The codebase is **config-driven and deployed as three separate Vercel projects** from this single repo, each representing a different brand/site. Environment variables control per-site content.

## The Three Sites

| Vercel Project   | Brand         |
|------------------|---------------|
| enjoy-sylve      | Élixir de Charlevoix (default) |
| enjoy-sentier    | separate brand via env vars |
| enjoy-oree       | separate brand via env vars |

All three share the same GitHub repo (`jfeuerstein1/elixir-de-charlevoix`). Deploying to `main` updates all three sites simultaneously.

## Per-Site Configuration

Each Vercel project has its own set of environment variables:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_PRIMARY_NAME` | Brand primary name (e.g. "Enjoy") |
| `NEXT_PUBLIC_SUB_NAME` | Brand sub name (e.g. "Sentier") |
| `NEXT_PUBLIC_BOTTLE_IMAGE` | URL to bottle image shown in Details section |
| `RESEND_API_KEY` | Resend API key for contact form emails |

If `NEXT_PUBLIC_PRIMARY_NAME` is unset, the site defaults to Élixir de Charlevoix content.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Email:** Resend (`src/app/api/contact/route.ts`)
- **Contact form logging:** Upstash Redis via `@vercel/kv` — all three sites write to the same KV store
- **Analytics:** Vercel Analytics + Speed Insights
- **Hosting:** Vercel (hobby plan)

## Key Files

- `src/lib/siteConfig.ts` — reads env vars and exports site-wide config
- `src/lib/translations.ts` — all copy, supports `{primaryName}` and `{subName}` interpolation via `src/lib/interpolate.ts`
- `src/app/api/contact/route.ts` — contact form API route; logs to KV then sends email via Resend
- `src/components/Contact.tsx` — contact form UI

## Contact Form Pipeline

1. Form submits to `/api/contact`
2. Submission is logged to Upstash KV with key `contact:{site}:{timestamp}`
3. Email sent via Resend to `jfeuerstein1@gmail.com`
4. Sender is `onboarding@resend.dev` (Resend sandbox) — **can only deliver to a single verified recipient**. Do not add additional `to:` addresses without first verifying a custom sending domain in Resend.

## Infrastructure Notes

- Upstash KV store: `upstash-kv-bistre-pocket` — connected to all three Vercel projects
- KV env vars auto-injected by Vercel: `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`, `KV_URL`, `REDIS_URL`
