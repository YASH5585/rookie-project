# Design Plan: Portfolio Extensions

The user wants all four features implemented: Application Tracker, GitHub/LeetCode Live Sync, More Resume Templates, and AI Prep Layer. This plan outlines the structural changes and implementation steps.

## 1. Core Data Model & Types
- **Location:** `src/types/profile.ts`
- **Changes:**
  - Add `ApplicationStatus` enum.
  - Add `Application` interface.
  - Extend `Profile` interface with `applications: Application[]`.
  - Add more values to `ResumeTemplate`.
  - Add `AIInsight` type for the Prep Layer.

## 2. Infrastructure Updates
- **Hook:** `src/hooks/use-local-profile.ts`
  - Update `reviveProfile` to handle the `applications` array for legacy storage.
- **Default Data:** `src/data/default-profile.ts`
  - Add a few mock applications to demonstrate the feature.

## 3. Feature: Application Tracker
- **Component:** `src/components/application-tracker.tsx` (New)
  - Interactive table/grid for tracking job applications.
  - Status management with color-coded badges.
  - CRUD operations (local state managed via `setProfile`).
- **CMS Integration:** Add fields in the CMS section to manage applications.

## 4. Feature: API Sync (GitHub & LeetCode)
- **Utility:** `src/lib/sync.ts` (New)
  - `fetchGitHubData(username: string)`: Uses GitHub REST API for repo counts and stars.
  - `fetchLeetCodeData(username: string)`: Uses a public LeetCode stats API.
- **UI:** Add "Sync Now" buttons next to the GitHub and LeetCode usernames in the CMS/Dashboard.

## 5. Feature: Enhanced Resume Templates
- **Logic:** `src/lib/generators.ts`
  - Refactor `generateResume` to use template-specific layouts.
  - "Executive": Highlights summary and metrics.
  - "Academic": Prioritizes education and certifications.
  - "Creative": Uses more descriptive/expressive language.

## 6. Feature: AI Prep Layer (Local-first)
- **Utility:** `src/lib/ai-layer.ts` (New)
  - Rule-based generation of interview questions based on the profile's project tech stack.
  - Bio variations generator.
- **Component:** `src/components/ai-prep-panel.tsx` (New)
  - Interactive panel to "Generate Prep Material".

## 7. Implementation Sequence
1. **Phase 1: Foundation.** Update types, default data, and storage hooks.
2. **Phase 2: Tracker.** Build the Application Tracker component and integrate.
3. **Phase 3: Sync.** Implement API sync utilities and trigger buttons.
4. **Phase 4: Templates.** Expand resume generation logic.
5. **Phase 5: AI Prep.** Implement the rule-based AI panel.
6. **Phase 6: Integration.** Wire everything into `home-client.tsx` and verify.

## Verification Plan
- **Unit Tests:** Add simple tests for the new generator logic in `src/lib/generators.test.ts`.
- **Manual Check:** Verify persistence of new fields in LocalStorage.
- **API Check:** Verify data fetching from GitHub/LeetCode APIs.
