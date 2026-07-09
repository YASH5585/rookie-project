# Career Intelligence Portfolio

**FREE & OPEN SOURCE** - No account required, no paid features, completely free to use and deploy!

An open-source personal portfolio, resume builder, career dashboard, and professional branding platform built with Next.js, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, and a local JSON profile system.

## Features

- Interactive portfolio hero with a React Three Fiber skill graph
- **Multi-disciplinary support** for CS, Engineering, Design, Business, and more
- Centralized typed profile database with local storage persistence
- Profile initializer that asks about your career dream (Full Stack, AI Engineer, Mechanical Engineer, etc.)
- Portfolio CMS for editing profile basics, skills, and projects
- Resume templates for 25+ engineering and business disciplines
- Resume, cover letter, SOP, and professional bio generation
- Browser-based TXT, PDF, and DOCX exports (client-side only)
- Career dashboard with resume readiness, placement readiness, and GitHub momentum scores
- Coding analytics for LeetCode, Codeforces, CodeChef, HackerRank, AtCoder
- Transparent benchmarking against fixed baseline models
- Radar charts, heatmaps, progress bars, activity charts, and project cards
- Dark/light theme support
- **100% FREE** - No subscriptions, no API keys, no backend required

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber
- Recharts
- **Local Storage only** - No external databases
- jsPDF and docx for client-side exports

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Profile System

The source profile lives in [src/data/default-profile.ts](src/data/default-profile.ts). At runtime, the app stores edits in browser local storage under `career-intelligence-profile-v1`.

Use the CMS section to export/import JSON backups. The exported JSON can later be migrated into a database, GitHub-backed content workflow, or SaaS account model.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run typecheck  # TypeScript validation
```

## Architecture

```text
src/app                 App Router shell and global styles
src/components          Product sections, charts, 3D scene, theme controls, UI primitives
src/data                Default local JSON-compatible profile
src/hooks               Local storage profile persistence
src/lib                 Scoring, generators, exporters, utilities
src/types               Profile and document types
docs                    Architecture, scoring, deployment, and roadmap notes
```

## Scoring Transparency

Benchmarking is intentionally not a real-world ranking. The MVP uses deterministic local estimates with visible weights. See [docs/scoring.md](docs/scoring.md) before changing score logic.

## 🚀 Free Deployment Options

### Option 1: Vercel (Recommended for Next.js) - FREE

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up (free)
3. Import your GitHub repository
4. Vercel auto-detects Next.js and deploys
5. Your site gets a free `.vercel.app` domain

**Pros:** Perfect for Next.js, free SSL, global CDN, automatic builds
**Cons:** Limited to 100GB bandwidth/month on free tier

### Option 2: Netlify - FREE

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up (free)
3. Click "New site from Git" and connect your repo
4. Set build command: `npm run build`
5. Set publish directory: `.next`
6. Deploy!

**Pros:** Generous free tier (100GB bandwidth), drag-and-drop deploy
**Cons:** Slightly slower builds than Vercel

### Option 3: GitHub Pages - FREE

1. Push your code to GitHub
2. Go to Settings > Pages
3. Select source: `gh-pages` branch or `/docs` folder
4. For static export: `npm run build && npx next export`

**Pros:** Completely free, no build limits
**Cons:** Requires static export (some dynamic features limited)

### Option 4: Cloudflare Pages - FREE

1. Push your code to GitHub
2. Go to [cloudflarepages.com](https://cloudflarepages.com)
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set output directory: `.next`
6. Deploy!

**Pros:** Fast global CDN, 500 builds/day free tier
**Cons:** Newer platform, less documentation than Vercel/Netlify

## One-Click Deploy Badge

[![Deploy to Vercel](https://api.button.dev/v1/badges/deploy-to-vercel.svg)](https://vercel.com/new)

[![Deploy to Netlify](https://api.button.dev/v1/badges/deploy-to-netlify.svg)](https://app.netlify.com/start)

## Development

```bash
# Clone and setup
git clone <your-repo-url>
cd rookie-project
npm install

# Run development server
npm run dev

# Run type checking
npm run typecheck

# Run tests
npm test

# Build for production
npm run build
```

## Customization

1. Update your personal information in `src/data/default-profile.ts`
2. Add your real projects and skills
3. Update contact links in the `contact` object
4. Modify the theme colors in `src/app/globals.css`

## Contributing

Contributions are welcome! Start with [CONTRIBUTING.md](CONTRIBUTING.md), then review [docs/architecture.md](docs/architecture.md) for module boundaries.

## License

MIT - Feel free to use, modify, and deploy this anywhere!

## Support

If you find this useful, consider:
- ⭐ Starring the repository
- 🔄 Forking and customizing for your needs
- 💬 Opening an issue to share your deployment link