# Digital Vesak Lantern Area

Tapro IT's interactive Vesak lantern experience built with Next.js.

## Shared wishes

The gallery can show lantern wishes from all visitors when a shared KV store is configured. Without storage keys, the app falls back to the bundled sample wishes.

Set these environment variables in Vercel or your local `.env.local`:

```bash
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Run locally

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run start
```