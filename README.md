# Career Intelligence Portfolio

An open-source, AI-ready personal portfolio, resume builder, career dashboard, and professional branding platform built with Next.js, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, and a local JSON profile system.

The MVP is local-first: one structured profile powers the portfolio, resume generator, cover letter generator, SOP generator, benchmarking dashboard, GitHub and multi-platform coding analytics views, project showcase, and CMS editor.

## Features

- Interactive portfolio hero with a React Three Fiber skill graph.
- Centralized typed profile database with local storage persistence.
- Portfolio CMS for editing profile basics, skills, and projects without touching code.
- Resume, cover letter, SOP, and professional bio generation.
- Browser-based TXT, PDF, and DOCX exports.
- Career dashboard with resume readiness, placement readiness, project depth, GitHub momentum, and multi-platform coding momentum scores.
- Coding analytics for LeetCode, Codeforces, CodeChef, HackerRank, AtCoder, and GeeksforGeeks-ready profiles.
- Transparent benchmarking against fixed baseline models for first-year students, college students, internship applicants, and software engineering candidates.
- Radar charts, heatmaps, progress bars, activity charts, and project cards.
- Dark/light theme support.
- Modular architecture ready for AI resume review, interview preparation, premium templates, coaching, and application tracking.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber
- ShadCN-style local UI primitives
- Recharts
- Local Storage + JSON profile model
- jsPDF and docx for exports

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
npm run dev
npm run build
npm run start
npm run typecheck
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

## Deployment

The app can be deployed to Vercel, Netlify, Docker, or any host that supports Next.js. See [docs/deployment.md](docs/deployment.md).

## Contributing

Contributions are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md), then review [docs/architecture.md](docs/architecture.md) for module boundaries.

## License

MIT
