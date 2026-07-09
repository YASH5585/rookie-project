import type { Profile, SkillCategory, EngineeringBranch } from "@/types/profile";
import { average, clamp } from "@/lib/utils";

export type ReadinessScores = {
  resume: number;
  placement: number;
  projectDepth: number;
  githubMomentum: number;
  leetcodeMomentum: number;
  codingPlatformMomentum: number;
  profileCompleteness: number;
  branchSpecific?: Record<EngineeringBranch, number>;
};

export type BenchmarkSegment =
  | "First-year students"
  | "College students"
  | "Internship applicants"
  | "Software engineering candidates";

export type BenchmarkResult = {
  segment: BenchmarkSegment;
  userScore: number;
  baselineScore: number;
  delta: number;
  status: "ahead" | "aligned" | "behind";
};

export type BranchBenchmarkSegment =
  | "Entry-level"
  | "Mid-level"
  | "Senior-level"
  | "Principal/Staff";

export type BranchBenchmarkResult = {
  segment: BranchBenchmarkSegment;
  userScore: number;
  baselineScore: number;
  delta: number;
  status: "ahead" | "aligned" | "behind";
};

export type BenchmarkPillar = {
  pillar: string;
  user: number;
  firstYear: number;
  college: number;
  internship: number;
  softwareEngineering: number;
};

const categoryWeights: Record<SkillCategory, number> = {
  Programming: 1.1,
  Frontend: 1,
  Backend: 1,
  Data: 0.9,
  "AI/ML": 0.9,
  Cloud: 0.85,
  Design: 0.75,
  Professional: 0.8,
  Mathematics: 0.85,
  Physics: 0.8,
  Chemistry: 0.75,
  Mechanical: 0.85,
  Electrical: 0.85,
  Civil: 0.8,
  Chemical: 0.8,
  Aerospace: 0.85,
  Automotive: 0.8,
  Industrial: 0.85,
  Materials: 0.8,
  Manufacturing: 0.85,
  Robotics: 0.85,
  Embedded: 0.9,
  Networking: 0.8,
  Security: 0.85,
  Testing: 0.75,
  DevOps: 0.85
};

export function calculateScores(profile: Profile): ReadinessScores {
  const skillStrength = average(
    profile.skills.map((skill) => clamp(skill.level * categoryWeights[skill.category]))
  );
  const contactCompleteness = average([
    profile.contact.email ? 100 : 0,
    profile.contact.github ? 100 : 0,
    profile.contact.linkedin ? 100 : 0,
    profile.contact.website ? 100 : 0
  ]);
  const profileCompleteness = average([
    profile.name ? 100 : 0,
    profile.headline ? 100 : 0,
    profile.bio.length > 80 ? 100 : 70,
    profile.education.length > 0 ? 100 : 0,
    profile.projects.length >= 3 ? 100 : profile.projects.length * 30,
    profile.experience.length > 0 ? 100 : 45,
    profile.achievements.length > 0 ? 100 : 30,
    contactCompleteness
  ]);
  const projectDepth = clamp(
    profile.projects.length * 18 +
      profile.projects.filter((project) => project.githubUrl).length * 8 +
      profile.projects.filter((project) => project.liveUrl).length * 7 +
      profile.projects.flatMap((project) => project.metrics).length * 3
  );
  const leetcodeMomentum = clamp(
    profile.leetCode.totalSolved * 0.12 +
      profile.leetCode.medium * 0.18 +
      profile.leetCode.hard * 0.5 +
      profile.leetCode.currentStreak * 1.5
  );
  const platformScores = profile.codingProfiles.map((platform) =>
    clamp(
      platform.totalSolved * 0.12 +
        platform.contests * 1.15 +
        (platform.maxRating > 0 ? platform.maxRating / 24 : 0) +
        platform.badges.length * 3
    )
  );
  const codingPlatformMomentum = Math.round(
    platformScores.length > 0 ? average(platformScores) : leetcodeMomentum
  );
  const githubMomentum = clamp(
    profile.github.contributionsLastYear * 0.08 +
      profile.github.pullRequests * 0.7 +
      profile.github.repositories * 1.1 +
      profile.github.stars * 0.15
  );

  const resume = clamp(
    profileCompleteness * 0.34 +
      projectDepth * 0.24 +
      skillStrength * 0.18 +
      githubMomentum * 0.12 +
      codingPlatformMomentum * 0.12
  );
  const placement = clamp(
    codingPlatformMomentum * 0.28 +
      projectDepth * 0.24 +
      skillStrength * 0.22 +
      githubMomentum * 0.14 +
      profileCompleteness * 0.12
  );

  return {
    resume: Math.round(resume),
    placement: Math.round(placement),
    projectDepth: Math.round(projectDepth),
    githubMomentum: Math.round(githubMomentum),
    leetcodeMomentum: Math.round(leetcodeMomentum),
    codingPlatformMomentum,
    profileCompleteness: Math.round(profileCompleteness)
  };
}

export function createBenchmarkPillars(profile: Profile): BenchmarkPillar[] {
  const scores = calculateScores(profile);
  const skillStrength = average(profile.skills.map((skill) => skill.level));

  return [
    {
      pillar: "Core CS",
      user: Math.round(average([skillStrength, scores.codingPlatformMomentum])),
      firstYear: 28,
      college: 48,
      internship: 66,
      softwareEngineering: 78
    },
    {
      pillar: "Projects",
      user: scores.projectDepth,
      firstYear: 18,
      college: 45,
      internship: 68,
      softwareEngineering: 82
    },
    {
      pillar: "Coding",
      user: scores.codingPlatformMomentum,
      firstYear: 16,
      college: 42,
      internship: 64,
      softwareEngineering: 80
    },
    {
      pillar: "Proof",
      user: scores.githubMomentum,
      firstYear: 12,
      college: 38,
      internship: 58,
      softwareEngineering: 74
    },
    {
      pillar: "Branding",
      user: scores.resume,
      firstYear: 20,
      college: 44,
      internship: 62,
      softwareEngineering: 76
    }
  ];
}

export function calculateBenchmarks(profile: Profile): BenchmarkResult[] {
  const pillars = createBenchmarkPillars(profile);
  const userScore = Math.round(average(pillars.map((pillar) => pillar.user)));
  const segments: { segment: BenchmarkSegment; baselineScore: number }[] = [
    {
      segment: "First-year students",
      baselineScore: Math.round(average(pillars.map((pillar) => pillar.firstYear)))
    },
    {
      segment: "College students",
      baselineScore: Math.round(average(pillars.map((pillar) => pillar.college)))
    },
    {
      segment: "Internship applicants",
      baselineScore: Math.round(average(pillars.map((pillar) => pillar.internship)))
    },
    {
      segment: "Software engineering candidates",
      baselineScore: Math.round(average(pillars.map((pillar) => pillar.softwareEngineering)))
    }
  ];

  return segments.map(({ segment, baselineScore }) => {
    const delta = userScore - baselineScore;

    return {
      segment,
      userScore,
      baselineScore,
      delta,
      status: delta >= 8 ? "ahead" : delta <= -8 ? "behind" : "aligned"
    };
  });
}

export function getSkillGaps(profile: Profile) {
  return profile.skills
    .map((skill) => ({
      skill: skill.name,
      category: skill.category,
      gap: clamp(skill.targetLevel - skill.level, 0, 100),
      action:
        skill.targetLevel - skill.level > 18
          ? `Build one portfolio-grade ${skill.name} project and document measurable outcomes.`
          : `Add practice evidence for ${skill.name} through issues, PRs, or write-ups.`
    }))
    .filter((skill) => skill.gap > 6)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 6);
}

export function getStrengths(profile: Profile) {
  const scores = calculateScores(profile);
  const strongestSkills = [...profile.skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, 3)
    .map((skill) => skill.name);

  return [
    `${strongestSkills.join(", ")} are the strongest evidenced skill areas.`,
    `${profile.projects.filter((project) => project.featured).length} featured projects are ready for portfolio storytelling.`,
    `GitHub momentum score is ${scores.githubMomentum}/100 based on local contribution, repository, PR, and star inputs.`
  ];
}

export function getWeaknesses(profile: Profile) {
  const gaps = getSkillGaps(profile);
  const weaknesses = gaps.slice(0, 3).map((gap) => `${gap.skill} has a ${gap.gap}-point target gap.`);

  if (profile.leetCode.hard < 35) {
    weaknesses.push("Hard-problem exposure is still below the internship-candidate target model.");
  }

  if (profile.projects.filter((project) => project.liveUrl && project.githubUrl).length < 3) {
    weaknesses.push("Add live demos and public repositories for at least three proof-heavy projects.");
  }

  return weaknesses;
}
