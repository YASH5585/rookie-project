import type { Profile, ResumeTemplate } from "@/types/profile";
import { calculateScores, getSkillGaps } from "@/lib/scoring";

function bulletList(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

export function generateProfessionalBio(profile: Profile) {
  const topSkills = profile.skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 5)
    .map((skill) => skill.name)
    .join(", ");

  return `${profile.name} is a ${profile.headline.toLowerCase()} Their work spans ${topSkills}, with a portfolio centered on ${profile.projects
    .slice(0, 2)
    .map((project) => project.title)
    .join(" and ")}. ${profile.name.split(" ")[0]} is currently targeting ${profile.careerGoals.targetRole} roles and is focused on ${profile.careerGoals.learningFocus.join(", ")}.`;
}

export function generateResume(profile: Profile, template: ResumeTemplate) {
  const scores = calculateScores(profile);
  const skills = profile.skills
    .sort((a, b) => b.level - a.level)
    .map((skill) => `${skill.name} (${skill.category})`)
    .join(", ");
  const templateFocus: Record<ResumeTemplate, string> = {
    "Software Engineer": "engineering impact, scalable systems, frontend/backend delivery, and coding strength",
    "Data Analyst": "analytics, data storytelling, dashboards, and measurable decision support",
    "Product Manager": "product thinking, customer outcomes, execution, and cross-functional clarity",
    "Research Intern": "research ability, experimentation, documentation, and technical depth",
    "Executive": "leadership, strategy, org impact, and cross-functional execution",
    "Academic": "research depth, publications, teaching, and rigorous methodology",
    "Creative": "design sense, storytelling, brand voice, and visual communication",
    "Functional": "domain expertise, operations, and measurable business outcomes"
  };

  return [
    `${profile.name}`,
    profile.headline,
    `${profile.contact.email} | ${profile.contact.phone} | ${profile.contact.location}`,
    `${profile.contact.website} | ${profile.contact.github} | ${profile.contact.linkedin}`,
    "",
    "SUMMARY",
    `${profile.bio} Resume focus: ${templateFocus[template]}. Resume readiness score: ${scores.resume}/100 using the app's transparent local scoring model.`,
    "",
    "SKILLS",
    skills,
    "",
    "EXPERIENCE",
    ...profile.experience.flatMap((item) => [
      `${item.role} - ${item.organization}, ${item.location} (${item.startDate} - ${item.endDate})`,
      item.summary,
      bulletList(item.impact),
      ""
    ]),
    "PROJECTS",
    ...profile.projects.slice(0, 4).flatMap((project) => [
      `${project.title} - ${project.techStack.join(", ")}`,
      project.description,
      `Impact: ${project.impact}`,
      bulletList(project.metrics.map((metric) => `${metric.label}: ${metric.value}`)),
      `${project.githubUrl} | ${project.liveUrl}`,
      ""
    ]),
    "EDUCATION",
    ...profile.education.flatMap((item) => [
      `${item.degree}, ${item.field} - ${item.institution} (${item.startYear} - ${item.endYear})`,
      `${item.score}`,
      bulletList(item.highlights),
      ""
    ]),
    "CERTIFICATIONS & ACHIEVEMENTS",
    bulletList([
      ...profile.certifications.map((item) => `${item.title}, ${item.issuer} (${item.year})`),
      ...profile.achievements.map((item) => `${item.title} - ${item.context} (${item.year})`)
    ])
  ].join("\n");
}

export function generateCoverLetter(profile: Profile, company = "the hiring team", role = profile.careerGoals.targetRole) {
  const topProject = profile.projects.find((project) => project.featured) ?? profile.projects[0];
  const topSkills = profile.skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 4)
    .map((skill) => skill.name)
    .join(", ");

  return `Dear ${company},

I am applying for the ${role} opportunity because it matches the kind of practical engineering work I am preparing for: building reliable products, improving user workflows, and communicating technical decisions clearly.

My strongest current skill areas are ${topSkills}. In ${topProject.title}, I ${topProject.impact.toLowerCase()} The project used ${topProject.techStack.join(", ")} and gave me a concrete way to connect engineering decisions with measurable outcomes.

I would bring a builder's mindset, consistent learning habits, and a profile that is easy to evaluate through public projects, GitHub activity, and documented progress. I am especially interested in contributing to teams working on ${profile.careerGoals.preferredDomains.join(", ")}.

Thank you for your time and consideration.

Sincerely,
${profile.name}`;
}

export function generateSop(profile: Profile, program = "your program") {
  const gaps = getSkillGaps(profile)
    .slice(0, 3)
    .map((gap) => gap.skill)
    .join(", ");

  return `Statement of Purpose - ${profile.name}

I am applying to ${program} to deepen my ability to build useful software, evaluate technical tradeoffs, and contribute to products with measurable human outcomes. My current academic and project work has helped me build a foundation in ${profile.skills
    .slice(0, 5)
    .map((skill) => skill.name)
    .join(", ")}.

My portfolio reflects a bias toward applied learning. Projects such as ${profile.projects
    .slice(0, 2)
    .map((project) => project.title)
    .join(" and ")} helped me connect engineering implementation with user-facing value. These experiences also showed me the areas I need to strengthen next, especially ${gaps || "advanced technical depth and research communication"}.

Through ${program}, I hope to grow in ${profile.careerGoals.learningFocus.join(", ")} while contributing with disciplined execution, documentation, and collaborative problem solving. My long-term goal is to become a ${profile.careerGoals.targetRole} who can bridge product thinking, technical quality, and responsible AI-enabled workflows.`;
}

export function generateRoadmap(profile: Profile, type: "DSA" | "Development" | "Internship" | "Placement") {
  const gaps = getSkillGaps(profile).slice(0, 4);
  const base = {
    DSA: [
      "Weeks 1-2: Refresh arrays, strings, hashing, and two-pointer patterns.",
      "Weeks 3-4: Practice trees, binary search, heaps, and recursion.",
      "Weeks 5-7: Build depth in graphs, dynamic programming, and greedy proofs.",
      "Weeks 8-10: Run timed mixed sets and write post-solve notes for repeated mistakes."
    ],
    Development: [
      "Weeks 1-2: Improve one featured project with tests, accessibility fixes, and README polish.",
      "Weeks 3-4: Add a backend or data layer that demonstrates API design and persistence.",
      "Weeks 5-6: Ship analytics, observability, and deployment documentation.",
      "Weeks 7-8: Create a case study with screenshots, metrics, and technical tradeoffs."
    ],
    Internship: [
      "Week 1: Finalize resume, portfolio, LinkedIn summary, and short professional bio.",
      "Weeks 2-3: Apply to focused roles and track every application with feedback notes.",
      "Weeks 4-6: Practice behavioral stories around impact, conflict, ownership, and learning.",
      "Weeks 7-8: Run mock interviews using projects and DSA topics as the main evidence base."
    ],
    Placement: [
      "Month 1: Strengthen DSA consistency and revise core CS fundamentals.",
      "Month 2: Build one production-grade project and publish a detailed case study.",
      "Month 3: Practice interviews, system design basics, and concise resume storytelling.",
      "Month 4: Apply in batches, measure conversion, and tune the profile weekly."
    ]
  } satisfies Record<typeof type, string[]>;

  const gapActions = gaps.map((gap) => `Target gap: ${gap.action}`);

  return [...base[type], ...gapActions];
}
