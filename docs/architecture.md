# Architecture

## MVP Boundary

The MVP is a local-first portfolio and career intelligence app. It does not require a backend, authentication, paid APIs, or secrets. All profile data starts from `src/data/default-profile.ts` and user edits persist in browser local storage.

## Data Flow

```text
defaultProfile
  -> useLocalProfile
  -> UI sections
  -> scoring, benchmarking, generators, exporters
```

The profile model is intentionally broad enough to support portfolio content, resumes, cover letters, SOPs, internship applications, scholarship applications, professional bios, and LinkedIn summaries.

## Module Boundaries

- `src/types/profile.ts`: shared schema and document types.
- `src/data/default-profile.ts`: starter profile and JSON-compatible sample data.
- `src/hooks/use-local-profile.ts`: local storage hydration, import, export, reset.
- `src/lib/scoring.ts`: readiness scores, multi-platform coding momentum, benchmarking, strengths, weaknesses, skill gaps.
- `src/lib/generators.ts`: resume, cover letter, SOP, bio, and roadmap generation.
- `src/lib/exporters.ts`: browser-based TXT, PDF, and DOCX downloads.
- `src/components/home-client.tsx`: product surface and section orchestration.
- `src/components/charts.tsx`: Recharts visualizations.
- `src/components/three-skill-scene.tsx`: interactive 3D skill graph.
- `src/components/ui`: ShadCN-style primitives.

## Future SaaS Modules

Recommended future additions:

- `src/server/ai`: provider adapters for resume review, cover letters, interview prep, and coaching.
- `src/server/integrations/github`: GitHub GraphQL sync.
- `src/server/integrations/coding-platforms`: Codeforces API, LeetCode, CodeChef, AtCoder, HackerRank, and GeeksforGeeks sync adapters or manual imports.
- `src/server/billing`: Stripe or Lemon Squeezy plans.
- `src/server/auth`: auth provider integration.
- `src/app/api`: optional server routes for authenticated features.

Keep local profile mode available even after SaaS features are added.

## Accessibility and Performance

- Theme-aware contrast is defined in CSS variables.
- Buttons and form fields include focus states.
- Heavy 3D rendering is client-only and dynamically imported.
- Charts and document exporters load in the client bundle only where needed.

Future improvements should add automated accessibility checks and route-level bundle analysis.
