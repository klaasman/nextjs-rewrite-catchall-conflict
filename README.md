# Next.js Routing Precedence Bug Reproduction

This is a minimal reproduction of a routing precedence bug in Next.js where there's a conflict between URL rewrites and catch-all routes during client-side navigation.

## The Bug

During client-side navigation, the catch-all route incorrectly takes precedence over configured rewrites when the proxied endpoint returns a 2xx response. Server-side navigation (hard refresh) works as expected.

### Required Conditions to Reproduce

- Presence of middleware.ts (even if empty)
- Catch-all route ([...segments].tsx) with fallback: false
- Request path (/200) not included in catch-all route's prebuilt segment pathnames
- Proxied endpoint returns 2xx status code (issue doesn't occur with non-2xx responses)

## Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## How to Test

1. Open [http://localhost:3000](http://localhost:3000)
2. Click the link to "/200" to see the incorrect routing behavior
   - The page should be proxied to httpstat.us/200
   - Instead, it shows the catch-all route page
3. Refresh the page at "/200" to see the correct behavior
   - The request is properly proxied to httpstat.us/200
4. Try the "/400" link to see correct behavior
   - Shows that rewrites work properly with non-2xx responses

## Technical Details

The issue is possibly related to how Next.js handles client-side navigation when:

1. A rewrite rule exists in next.config.ts
2. The router attempts to prefetch data from `/_next/data/development/200.json?segments=200`
3. This request gets proxied to httpstat.us, which returns a 200 response
4. The router might interpret this successful response as confirmation that the page exists locally

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deployment

You can deploy this reproduction using [Vercel](https://vercel.com/new).
