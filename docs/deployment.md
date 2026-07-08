# Deployment

## Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Use the default Next.js build settings:

```bash
npm install
npm run build
```

No environment variables are required for the MVP.

## Netlify

Use the official Next.js runtime:

```bash
npm install
npm run build
```

Set the publish directory according to Netlify's Next.js adapter output.

## Self-hosting

```bash
npm install
npm run build
npm run start
```

The app defaults to `http://localhost:3000`.

## Static Export Note

The MVP is mostly client-driven, but it uses the Next.js App Router and client-only dynamic imports. Prefer a standard Next.js deployment over static export unless you verify every route and export behavior.

## Future Environment Variables

Potential SaaS features may add:

```text
OPENAI_API_KEY
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
DATABASE_URL
STRIPE_SECRET_KEY
NEXT_PUBLIC_APP_URL
```

Do not require these for local portfolio mode.
