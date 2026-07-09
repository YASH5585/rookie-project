import { describe, it, expect } from "vitest";
import { defaultProfile } from "@/data/default-profile";
import type { ResumeTemplate } from "@/types/profile";
import {
  generateProfessionalBio,
  generateResume,
  generateCoverLetter,
  generateSop,
  generateRoadmap
} from "@/lib/generators";

const resumeTemplates: ResumeTemplate[] = [
  "Software Engineer",
  "Data Analyst",
  "Product Manager",
  "Research Intern",
  "Executive",
  "Academic",
  "Creative",
  "Functional"
];

describe("generateProfessionalBio", () => {
  it("includes the profile name and a top skill", () => {
    const bio = generateProfessionalBio(defaultProfile);

    expect(bio).toContain(defaultProfile.name);
    expect(typeof bio).toBe("string");
    expect(bio.length).toBeGreaterThan(20);
  });
});

describe("generateResume", () => {
  it("includes core sections and the candidate name", () => {
    const resume = generateResume(defaultProfile, "Software Engineer");

    expect(resume).toContain(defaultProfile.name);
    expect(resume).toContain("SUMMARY");
    expect(resume).toContain("SKILLS");
    expect(resume).toContain("EXPERIENCE");
    expect(resume).toContain("PROJECTS");
    expect(resume).toContain("EDUCATION");
  });

  it("supports every resume template without throwing", () => {
    for (const template of resumeTemplates) {
      const resume = generateResume(defaultProfile, template);

      expect(resume).toContain(defaultProfile.name);
      expect(resume.length).toBeGreaterThan(50);
    }
  });
});

describe("generateCoverLetter", () => {
  it("personalizes to the company and role", () => {
    const letter = generateCoverLetter(defaultProfile, "Acme Corp");

    expect(letter).toContain("Acme Corp");
    expect(letter).toContain(defaultProfile.careerGoals.targetRole);
  });

  it("falls back to the target role when no role is provided", () => {
    const letter = generateCoverLetter(defaultProfile, "Acme Corp", undefined);

    expect(letter).toContain(defaultProfile.careerGoals.targetRole);
  });
});

describe("generateSop", () => {
  it("references the program and the candidate name", () => {
    const sop = generateSop(defaultProfile, "MS in Computer Science");

    expect(sop).toContain("MS in Computer Science");
    expect(sop).toContain(defaultProfile.name);
  });
});

describe("generateRoadmap", () => {
  const types = ["DSA", "Development", "Internship", "Placement"] as const;

  it("returns a non-empty plan for every roadmap type", () => {
    for (const type of types) {
      const roadmap = generateRoadmap(defaultProfile, type);

      expect(roadmap.length).toBeGreaterThan(0);
      expect(roadmap.every((step) => typeof step === "string")).toBe(true);
    }
  });

  it("includes gap-aware actions when skill gaps exist", () => {
    const roadmap = generateRoadmap(defaultProfile, "DSA");

    expect(roadmap.some((step) => step.startsWith("Target gap:"))).toBe(true);
  });
});
