# Contributing

Thanks for considering a contribution. This project is intended to grow from a local-first MVP into a career intelligence platform with optional SaaS features.

## Development Workflow

1. Fork the repository.
2. Install dependencies with `npm install`.
3. Start the app with `npm run dev`.
4. Run checks before opening a pull request:

```bash
npm run typecheck
npm run build
```

## Contribution Areas

- Profile schema improvements.
- Additional resume, cover letter, and SOP templates.
- Better benchmarking calibration with documented assumptions.
- GitHub and LeetCode integration adapters.
- AI resume review and interview preparation modules.
- Accessibility, performance, and responsive UI improvements.
- Tests for scoring and document generation.

## Scoring Rules

Do not present estimated benchmark scores as real-world rankings. Any new score must explain:

- Inputs used.
- Weights applied.
- Known limitations.
- Whether the score is local, sampled, or externally verified.

## Code Style

- Keep modules small and typed.
- Prefer existing UI primitives in `src/components/ui`.
- Keep profile-derived behavior centralized in `src/lib` and `src/hooks`.
- Avoid adding services that require secrets unless the feature is optional and documented.

## Pull Request Checklist

- The change is scoped and documented.
- TypeScript passes.
- Production build passes.
- UI changes are responsive.
- New scoring or AI behavior clearly explains its assumptions.
