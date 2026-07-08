# Scoring and Benchmarking

The app uses transparent estimation models. It does not claim to measure real-world rank or percentile.

## Readiness Scores

Scores are calculated in `src/lib/scoring.ts`.

### Resume Readiness

Weighted estimate from:

- Profile completeness.
- Project depth.
- Skill strength.
- GitHub momentum.
- Multi-platform coding momentum.

### Placement Readiness

Weighted estimate from:

- Multi-platform coding momentum.
- Project depth.
- Skill strength.
- GitHub momentum.
- Profile completeness.

### Project Depth

Estimated from:

- Number of projects.
- Public GitHub links.
- Live demo links.
- Project metrics.

### GitHub Momentum

Estimated from:

- Contributions in the last year.
- Pull requests.
- Repository count.
- Stars.

### Coding Platform Momentum

Estimated from:

- Solved problems across coding platforms.
- Contest participation.
- Maximum rating where the platform supports ratings.
- Badges or profile proof signals.

The default profile includes LeetCode, Codeforces, CodeChef, HackerRank, and AtCoder examples. LeetCode-specific difficulty charts are still shown because they have a common interview-prep structure, but placement readiness uses the broader multi-platform coding momentum score.

## Benchmarking

The benchmark segments are fixed local baselines:

- First-year students.
- College students.
- Internship applicants.
- Software engineering candidates.

Each baseline is a reference model across:

- Core CS.
- Projects.
- Coding.
- Proof.
- Branding.

These baselines should be treated as calibration examples. Contributors can improve them, but must document the source and limits of any new model.

## Rules for Future AI Features

AI-generated feedback must clearly distinguish:

- Profile facts.
- Model-generated suggestions.
- Estimated scores.
- External verified data.

Never fabricate company rankings, university acceptance chances, LeetCode percentiles, GitHub influence, or candidate rank.
