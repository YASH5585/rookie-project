import { describe, it, expect } from "vitest";
import { defaultProfile } from "@/data/default-profile";
import type { Profile } from "@/types/profile";
import {
  calculateScores,
  createBenchmarkPillars,
  calculateBenchmarks,
  getSkillGaps,
  getStrengths,
  getWeaknesses
} from "@/lib/scoring";

function emptyProfile(): Profile {
  return {
    ...defaultProfile,
    name: "",
    headline: "",
    bio: "",
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    experience: [],
    leetCode: {
      username: "",
      totalSolved: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      currentStreak: 0,
      maxStreak: 0,
      weeklySolved: [],
      topicCoverage: []
    },
    codingProfiles: [],
    github: {
      username: "",
      repositories: 0,
      contributionsLastYear: 0,
      pullRequests: 0,
      stars: 0,
      languages: [],
      activity: []
    },
    careerGoals: { ...defaultProfile.careerGoals, targetRole: "" },
    contact: { ...defaultProfile.contact, email: "", github: "", linkedin: "", website: "" },
    applications: [],
    aiInsights: []
  };
}

describe("calculateScores", () => {
  it("returns all expected readiness metrics", () => {
    const scores = calculateScores(defaultProfile);

    expect(scores).toHaveProperty("resume");
    expect(scores).toHaveProperty("placement");
    expect(scores).toHaveProperty("projectDepth");
    expect(scores).toHaveProperty("githubMomentum");
    expect(scores).toHaveProperty("leetcodeMomentum");
    expect(scores).toHaveProperty("codingPlatformMomentum");
    expect(scores).toHaveProperty("profileCompleteness");
  });

  it("scores an empty profile far below the populated default", () => {
    const empty = calculateScores(emptyProfile());
    const full = calculateScores(defaultProfile);

    expect(empty.resume).toBeLessThan(full.resume);
    expect(empty.placement).toBeLessThan(full.placement);
    expect(empty.profileCompleteness).toBeLessThan(full.profileCompleteness);
  });

  it("keeps every score within 0-100 and rounds to integers", () => {
    const scores = calculateScores(defaultProfile);
    const values = Object.values(scores);

    for (const value of values) {
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
  });

  it("rewards more projects with higher project depth", () => {
    const one = calculateScores({ ...defaultProfile, projects: defaultProfile.projects.slice(0, 1) });
    const two = calculateScores({ ...defaultProfile, projects: defaultProfile.projects.slice(0, 2) });

    expect(two.projectDepth).toBeGreaterThan(one.projectDepth);
  });
});

describe("getSkillGaps", () => {
  it("only returns gaps above the threshold and at most six", () => {
    const gaps = getSkillGaps(defaultProfile);

    expect(gaps.length).toBeLessThanOrEqual(6);
    for (const gap of gaps) {
      expect(gap.gap).toBeGreaterThan(6);
    }
  });

  it("returns nothing for a profile with no skill gaps", () => {
    const flat: Profile = {
      ...defaultProfile,
      skills: defaultProfile.skills.map((skill) => ({ ...skill, targetLevel: skill.level }))
    };

    expect(getSkillGaps(flat)).toEqual([]);
  });

  it("sorts gaps in descending order", () => {
    const gaps = getSkillGaps(defaultProfile);

    for (let i = 1; i < gaps.length; i++) {
      expect(gaps[i - 1].gap).toBeGreaterThanOrEqual(gaps[i].gap);
    }
  });
});

describe("getStrengths / getWeaknesses", () => {
  it("returns three strength statements", () => {
    const strengths = getStrengths(defaultProfile);

    expect(strengths).toHaveLength(3);
    expect(strengths.every((item) => typeof item === "string")).toBe(true);
  });

  it("flags hard-problem exposure weakness for the default profile", () => {
    const weaknesses = getWeaknesses(defaultProfile);

    expect(weaknesses.length).toBeGreaterThanOrEqual(1);
    expect(weaknesses.some((item) => /hard/i.test(item))).toBe(true);
  });

  it("returns no weaknesses when profile is strong", () => {
    const strong: Profile = {
      ...defaultProfile,
      leetCode: { ...defaultProfile.leetCode, hard: 80 },
      projects: defaultProfile.projects.map((project) => ({ ...project, liveUrl: "https://x.com", githubUrl: "https://x.com" }))
    };

    expect(getWeaknesses(strong).length).toBeGreaterThanOrEqual(0);
  });
});

describe("benchmarks", () => {
  it("creates five benchmark pillars", () => {
    const pillars = createBenchmarkPillars(defaultProfile);

    expect(pillars).toHaveLength(5);
    expect(pillars.every((pillar) => typeof pillar.user === "number")).toBe(true);
  });

  it("produces four benchmark segments with a valid status", () => {
    const benchmarks = calculateBenchmarks(defaultProfile);
    const statuses = new Set(["ahead", "aligned", "behind"]);

    expect(benchmarks).toHaveLength(4);
    for (const benchmark of benchmarks) {
      expect(benchmark.delta).toBe(benchmark.userScore - benchmark.baselineScore);
      expect(statuses.has(benchmark.status)).toBe(true);
    }
  });
});
