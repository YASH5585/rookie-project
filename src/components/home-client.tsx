"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  BarChart3,
  BookOpenCheck,
  Bot,
  BriefcaseBusiness,
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  GraduationCap,
  Import,
  Link,
  Plus,
  RefreshCcw,
  Rocket,
  Save,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  Upload
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  CodingPlatformChart,
  GitHubActivityChart,
  LanguageChart,
  LeetCodeChart,
  SkillHeatmap,
  SkillRadarChart
} from "@/components/charts";
import { useLocalProfile } from "@/hooks/use-local-profile";
import {
  calculateBenchmarks,
  calculateScores,
  createBenchmarkPillars,
  getSkillGaps,
  getStrengths,
  getWeaknesses
} from "@/lib/scoring";
import {
  generateCoverLetter,
  generateProfessionalBio,
  generateResume,
  generateRoadmap,
  generateSop
} from "@/lib/generators";
import { exportDocx, exportPdf, exportPlainText } from "@/lib/exporters";
import { downloadText } from "@/lib/utils";
import type { CodingProfile, CodingPlatform, Profile, Project, ResumeTemplate, Skill } from "@/types/profile";

const ThreeSkillScene = dynamic(
  () => import("@/components/three-skill-scene").then((module) => module.ThreeSkillScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[320px] items-center justify-center text-sm text-[rgb(var(--muted-foreground))]">
        Loading 3D skill graph
      </div>
    )
  }
);

const navItems = [
  { href: "#dashboard", label: "Dashboard" },
  { href: "#benchmarking", label: "Benchmarking" },
  { href: "#portfolio", label: "Projects" },
  { href: "#generator", label: "Generator" },
  { href: "#cms", label: "CMS" }
];

const resumeTemplates: ResumeTemplate[] = [
  "Software Engineer",
  "Data Analyst",
  "Product Manager",
  "Research Intern"
];

const codingPlatforms: CodingPlatform[] = [
  "LeetCode",
  "Codeforces",
  "CodeChef",
  "HackerRank",
  "AtCoder",
  "GeeksforGeeks"
];

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <Badge tone="blue">{eyebrow}</Badge>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal text-balance sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-[rgb(var(--muted-foreground))]">{description}</p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = "blue"
}: {
  icon: typeof BarChart3;
  label: string;
  value: string;
  detail: string;
  tone?: "blue" | "green" | "amber" | "rose";
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-[var(--radius)] border border-[rgba(var(--border),0.8)] bg-[rgba(var(--muted),0.72)] p-2">
            <Icon aria-hidden className="h-4 w-4" />
          </div>
          <Badge tone={tone}>{label}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{value}</div>
        <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">{detail}</p>
      </CardContent>
    </Card>
  );
}

function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(var(--border),0.65)] bg-[rgba(var(--background),0.7)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-[min(1180px,calc(100%-2rem))] items-center justify-between gap-4">
        <a href="#hero" className="focus-ring flex items-center gap-2 rounded-[var(--radius)]">
          <span className="grid h-9 w-9 place-items-center rounded-[var(--radius)] bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]">
            <Sparkles aria-hidden className="h-4 w-4" />
          </span>
          <span className="hidden text-sm font-semibold sm:inline">Career Intelligence</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-[var(--radius)] px-3 py-2 text-sm font-medium text-[rgb(var(--muted-foreground))] transition hover:bg-[rgba(var(--muted),0.82)] hover:text-[rgb(var(--foreground))]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="#generator">
              <FileText aria-hidden className="h-4 w-4" />
              Export
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function HeroSection({ profile }: { profile: Profile }) {
  const topSkills = profile.skills.slice(0, 6);

  return (
    <section id="hero" className="section-shell grid min-h-[calc(100vh-4rem)] items-center gap-8 pt-10 lg:grid-cols-[1fr_0.92fr]">
      <motion.div initial="hidden" animate="visible" variants={sectionReveal} transition={{ duration: 0.65 }}>
        <Badge tone="green">Local-first portfolio intelligence</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.03] tracking-normal text-balance sm:text-6xl">
          {profile.name}
          <span className="block bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-400 bg-clip-text text-transparent">
            {profile.careerGoals.targetRole}
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[rgb(var(--muted-foreground))]">{profile.headline}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {topSkills.map((skill) => (
            <Badge key={skill.id} tone="neutral">
              {skill.name} {skill.level}
            </Badge>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href="#dashboard">
              <Rocket aria-hidden className="h-4 w-4" />
              Open Dashboard
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#cms">
              <ArrowDown aria-hidden className="h-4 w-4" />
              Edit Profile
            </a>
          </Button>
        </div>
        <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
          <div className="glass rounded-[var(--radius)] p-3">
            <div className="text-2xl font-semibold">{profile.projects.length}</div>
            <div className="text-xs text-[rgb(var(--muted-foreground))]">Projects</div>
          </div>
          <div className="glass rounded-[var(--radius)] p-3">
            <div className="text-2xl font-semibold">{profile.leetCode.totalSolved}</div>
            <div className="text-xs text-[rgb(var(--muted-foreground))]">Problems</div>
          </div>
          <div className="glass rounded-[var(--radius)] p-3">
            <div className="text-2xl font-semibold">{profile.github.contributionsLastYear}</div>
            <div className="text-xs text-[rgb(var(--muted-foreground))]">Contributions</div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="relative h-[390px] overflow-hidden rounded-[var(--radius)] border border-[rgba(var(--border),0.75)] bg-slate-950/80 shadow-2xl sm:h-[520px]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.08 }}
      >
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-[var(--radius)] border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
          <Bot aria-hidden className="h-4 w-4" />
          Interactive Skill Graph
        </div>
        <ThreeSkillScene skills={profile.skills} />
      </motion.div>
    </section>
  );
}

function DashboardSection({ profile }: { profile: Profile }) {
  const scores = calculateScores(profile);

  const inventory = [
    { label: "Resume readiness", value: scores.resume, tone: "blue" as const },
    { label: "Placement readiness", value: scores.placement, tone: "green" as const },
    { label: "Project depth", value: scores.projectDepth, tone: "amber" as const },
    { label: "Coding momentum", value: scores.codingPlatformMomentum, tone: "rose" as const }
  ];

  return (
    <motion.section
      id="dashboard"
      className="section-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionReveal}
      transition={{ duration: 0.55 }}
    >
      <SectionHeading
        eyebrow="AI Career Dashboard"
        title="One profile drives every career surface."
        description="Readiness scores are transparent local estimates calculated from profile completeness, project proof, skill evidence, GitHub activity, and LeetCode progress."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileText} label="Resume" value={`${scores.resume}%`} detail="Weighted by profile completeness, project proof, skills, and activity." />
        <StatCard icon={Target} label="Placement" value={`${scores.placement}%`} detail="Uses coding practice, project depth, and technical evidence." tone="green" />
        <StatCard icon={GitBranch} label="GitHub" value={`${scores.githubMomentum}%`} detail={`${profile.github.repositories} repositories and ${profile.github.pullRequests} PRs tracked locally.`} tone="amber" />
        <StatCard
          icon={BookOpenCheck}
          label="Coding"
          value={`${scores.codingPlatformMomentum}%`}
          detail={`${profile.codingProfiles.length} coding platforms tracked, including LeetCode and Codeforces-style contests.`}
          tone="rose"
        />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Skill Inventory</CardTitle>
            <CardDescription>Target gaps update automatically when you edit the profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inventory.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-[rgb(var(--muted-foreground))]">{item.value}/100</span>
                </div>
                <Progress value={item.value} tone={item.tone} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Learning Focus</CardTitle>
            <CardDescription>Generated from the gap between current skill levels and target levels.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {getSkillGaps(profile).map((gap) => (
                <div key={gap.skill} className="rounded-[var(--radius)] border border-[rgba(var(--border),0.75)] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{gap.skill}</span>
                    <Badge tone="amber">{gap.gap} gap</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">{gap.action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}

function BenchmarkingSection({ profile }: { profile: Profile }) {
  const pillars = createBenchmarkPillars(profile);
  const benchmarks = calculateBenchmarks(profile);
  const strengths = getStrengths(profile);
  const weaknesses = getWeaknesses(profile);

  return (
    <motion.section
      id="benchmarking"
      className="section-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionReveal}
      transition={{ duration: 0.55 }}
    >
      <SectionHeading
        eyebrow="Global Skill Benchmarking"
        title="Transparent estimates instead of fake rankings."
        description="The baseline model uses fixed local thresholds for common student and candidate stages. It is not a real-world ranking and should be calibrated by contributors for specific colleges, roles, or regions."
      />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Radar Comparison</CardTitle>
            <CardDescription>User score compared with internship and software engineering baseline models.</CardDescription>
          </CardHeader>
          <CardContent>
            <SkillRadarChart data={pillars} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Benchmark Indicators</CardTitle>
            <CardDescription>Scoring logic is visible and deterministic.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {benchmarks.map((benchmark) => (
              <div key={benchmark.segment} className="rounded-[var(--radius)] border border-[rgba(var(--border),0.75)] p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{benchmark.segment}</span>
                  <Badge tone={benchmark.status === "ahead" ? "green" : benchmark.status === "behind" ? "rose" : "amber"}>
                    {benchmark.delta > 0 ? "+" : ""}
                    {benchmark.delta}
                  </Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[rgb(var(--muted-foreground))]">
                  <span>User: {benchmark.userScore}</span>
                  <span>Baseline: {benchmark.baselineScore}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Skill Heatmap</CardTitle>
            <CardDescription>Darker cells indicate stronger local evidence.</CardDescription>
          </CardHeader>
          <CardContent>
            <SkillHeatmap skills={profile.skills} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {strengths.map((item) => (
              <p key={item} className="flex gap-3 text-sm leading-6">
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                {item}
              </p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weaknesses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weaknesses.map((item) => (
              <p key={item} className="flex gap-3 text-sm leading-6">
                <Target aria-hidden className="mt-1 h-4 w-4 shrink-0 text-amber-500" />
                {item}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}

function AnalyticsSection({ profile }: { profile: Profile }) {
  return (
    <motion.section
      id="analytics"
      className="section-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionReveal}
      transition={{ duration: 0.55 }}
    >
      <SectionHeading
        eyebrow="Coding Platforms + GitHub Analytics"
        title="Career proof across LeetCode, Codeforces, and beyond."
        description="The MVP uses local JSON numbers for multiple coding platforms. The architecture leaves clear paths for future GitHub GraphQL, Codeforces API, LeetCode, CodeChef, AtCoder, HackerRank, and GeeksforGeeks adapters."
      />
      <div className="mb-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Coding Platform Coverage</CardTitle>
            <CardDescription>Solved counts and contest participation across tracked platforms.</CardDescription>
          </CardHeader>
          <CardContent>
            <CodingPlatformChart profiles={profile.codingProfiles} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Platform Profiles</CardTitle>
            <CardDescription>Use these as transparent proof links in applications and resumes.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {profile.codingProfiles.map((platform) => (
              <a
                key={platform.id}
                href={platform.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-[var(--radius)] border border-[rgba(var(--border),0.75)] p-3 transition hover:bg-[rgba(var(--muted),0.72)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold">{platform.platform}</span>
                  <ExternalLink aria-hidden className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                </div>
                <div className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">@{platform.username}</div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <span>{platform.totalSolved} solved</span>
                  <span>{platform.contests} contests</span>
                  <span>{platform.maxRating || platform.rank}</span>
                </div>
              </a>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>LeetCode Progress</CardTitle>
            <CardDescription>Difficulty distribution and weekly problem-solving trend.</CardDescription>
          </CardHeader>
          <CardContent>
            <LeetCodeChart stats={profile.leetCode} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>GitHub Languages</CardTitle>
            <CardDescription>Local language mix from profile data.</CardDescription>
          </CardHeader>
          <CardContent>
            <LanguageChart stats={profile.github} />
          </CardContent>
        </Card>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Contribution Activity</CardTitle>
          <CardDescription>Monthly commits, pull requests, and issue work.</CardDescription>
        </CardHeader>
        <CardContent>
          <GitHubActivityChart stats={profile.github} />
        </CardContent>
      </Card>
    </motion.section>
  );
}

function PortfolioSection({ profile }: { profile: Profile }) {
  return (
    <motion.section
      id="portfolio"
      className="section-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={sectionReveal}
      transition={{ duration: 0.55 }}
    >
      <SectionHeading
        eyebrow="Project Showcase"
        title="Proof-heavy cards for recruiters and collaborators."
        description="Every card includes narrative, tech stack, demo links, source links, and measurable outcomes from the profile database."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {profile.projects.map((project) => (
          <Card key={project.id} className="group overflow-hidden">
            <div className="h-32 border-b border-[rgba(var(--border),0.72)] bg-[linear-gradient(135deg,rgba(96,165,250,0.24),rgba(52,211,153,0.2),rgba(251,191,36,0.14))] p-4">
              <div className="flex h-full items-end justify-between">
                <Badge tone={project.featured ? "green" : "neutral"}>{project.category}</Badge>
                <Code2 aria-hidden className="h-8 w-8 text-white/80 transition group-hover:scale-110" />
              </div>
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-[rgb(var(--muted-foreground))]">{project.impact}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-[var(--radius)] bg-[rgba(var(--muted),0.72)] p-2">
                    <div className="text-sm font-semibold">{metric.value}</div>
                    <div className="truncate text-[11px] text-[rgb(var(--muted-foreground))]">{metric.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <GitBranch aria-hidden className="h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLink aria-hidden className="h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}

function DocumentGeneratorSection({ profile }: { profile: Profile }) {
  const [template, setTemplate] = useState<ResumeTemplate>("Software Engineer");
  const [docType, setDocType] = useState<"resume" | "cover-letter" | "sop" | "professional-bio">("resume");
  const [company, setCompany] = useState("OpenAI");
  const [program, setProgram] = useState("Research Internship Program");

  const generated = useMemo(() => {
    if (docType === "cover-letter") {
      return generateCoverLetter(profile, company);
    }

    if (docType === "sop") {
      return generateSop(profile, program);
    }

    if (docType === "professional-bio") {
      return generateProfessionalBio(profile);
    }

    return generateResume(profile, template);
  }, [company, docType, profile, program, template]);

  const filename = `${profile.name} ${docType} ${docType === "resume" ? template : ""}`.trim();

  async function copyGenerated() {
    await navigator.clipboard.writeText(generated);
  }

  return (
    <motion.section
      id="generator"
      className="section-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={sectionReveal}
      transition={{ duration: 0.55 }}
    >
      <SectionHeading
        eyebrow="Resume + Cover Letter + SOP"
        title="Generate professional documents from the centralized profile."
        description="Exports work offline in the browser. AI review and premium template adapters can be added later without changing the profile model."
      />
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader>
            <CardTitle>Export Controls</CardTitle>
            <CardDescription>Choose a document type, tune context, then export.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label>Document Type</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  ["resume", "Resume"],
                  ["cover-letter", "Cover Letter"],
                  ["sop", "SOP"],
                  ["professional-bio", "Bio"]
                ].map(([value, label]) => (
                  <Button
                    key={value}
                    type="button"
                    variant={docType === value ? "default" : "outline"}
                    onClick={() => setDocType(value as typeof docType)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
            {docType === "resume" ? (
              <div>
                <Label htmlFor="resume-template">Resume Template</Label>
                <select
                  id="resume-template"
                  value={template}
                  onChange={(event) => setTemplate(event.target.value as ResumeTemplate)}
                  className="focus-ring mt-2 h-10 w-full rounded-[var(--radius)] border border-[rgba(var(--border),0.9)] bg-[rgba(var(--card),0.72)] px-3 text-sm"
                >
                  {resumeTemplates.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            ) : null}
            {docType === "cover-letter" ? (
              <div>
                <Label htmlFor="company">Company / Team</Label>
                <Input id="company" value={company} onChange={(event) => setCompany(event.target.value)} />
              </div>
            ) : null}
            {docType === "sop" ? (
              <div>
                <Label htmlFor="program">University / Program</Label>
                <Input id="program" value={program} onChange={(event) => setProgram(event.target.value)} />
              </div>
            ) : null}
            <div className="grid gap-2 sm:grid-cols-2">
              <Button type="button" onClick={() => exportPdf(generated, filename)}>
                <Download aria-hidden className="h-4 w-4" />
                PDF
              </Button>
              <Button type="button" variant="secondary" onClick={() => void exportDocx(generated, filename)}>
                <Download aria-hidden className="h-4 w-4" />
                DOCX
              </Button>
              <Button type="button" variant="outline" onClick={() => exportPlainText(generated, filename)}>
                <FileText aria-hidden className="h-4 w-4" />
                TXT
              </Button>
              <Button type="button" variant="outline" onClick={() => void copyGenerated()}>
                <Copy aria-hidden className="h-4 w-4" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>Changes in the CMS update this generated output immediately.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="max-h-[590px] overflow-auto whitespace-pre-wrap rounded-[var(--radius)] border border-[rgba(var(--border),0.75)] bg-[rgba(var(--muted),0.58)] p-4 font-mono text-xs leading-6">
              {generated}
            </pre>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}

function RoadmapSection({ profile }: { profile: Profile }) {
  const [type, setType] = useState<"DSA" | "Development" | "Internship" | "Placement">("Internship");
  const roadmap = generateRoadmap(profile, type);

  return (
    <motion.section
      id="roadmap"
      className="section-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={sectionReveal}
      transition={{ duration: 0.55 }}
    >
      <SectionHeading
        eyebrow="Career Roadmap Generator"
        title="Convert gaps into focused execution plans."
        description="Roadmaps are deterministic MVP outputs that can later be upgraded with AI planning, interview prep, application tracking, and coaching modules."
      />
      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <CardTitle>{type} Roadmap</CardTitle>
              <CardDescription>Generated from profile goals and skill gaps.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["DSA", "Development", "Internship", "Placement"] as const).map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant={type === item ? "default" : "outline"}
                  size="sm"
                  onClick={() => setType(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="grid gap-3 lg:grid-cols-2">
            {roadmap.map((item, index) => (
              <li key={item} className="rounded-[var(--radius)] border border-[rgba(var(--border),0.75)] p-4">
                <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius)] bg-[rgba(var(--primary),0.14)] text-xs font-semibold text-blue-600 dark:text-blue-200">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-[rgb(var(--muted-foreground))]">{item}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </motion.section>
  );
}

function updateProfileField<K extends keyof Profile>(profile: Profile, key: K, value: Profile[K]): Profile {
  return { ...profile, [key]: value, updatedAt: new Date().toISOString() };
}

function ProfileCmsSection({
  profile,
  setProfile,
  resetProfile,
  exportProfile,
  importProfile
}: {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  resetProfile: () => void;
  exportProfile: () => string;
  importProfile: (json: string) => void;
}) {
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");

  function updateSkill(id: string, field: keyof Skill, value: string | number) {
    setProfile(
      updateProfileField(
        profile,
        "skills",
        profile.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill))
      )
    );
  }

  function addSkill() {
    const nextSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: "New Skill",
      category: "Programming",
      level: 50,
      targetLevel: 80,
      evidence: "Add evidence for this skill."
    };

    setProfile(updateProfileField(profile, "skills", [...profile.skills, nextSkill]));
  }

  function removeSkill(id: string) {
    setProfile(updateProfileField(profile, "skills", profile.skills.filter((skill) => skill.id !== id)));
  }

  function updateProject(id: string, field: keyof Project, value: string | boolean) {
    setProfile(
      updateProfileField(
        profile,
        "projects",
        profile.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project))
      )
    );
  }

  function addProject() {
    const nextProject: Project = {
      id: `project-${Date.now()}`,
      title: "New Project",
      description: "Short project summary.",
      longDescription: "Detailed project description.",
      techStack: ["Next.js", "TypeScript"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project",
      category: "Portfolio",
      impact: "Describe the measurable impact.",
      metrics: [
        { label: "Status", value: "Draft" },
        { label: "Users", value: "0" },
        { label: "Score", value: "TBD" }
      ],
      featured: false
    };

    setProfile(updateProfileField(profile, "projects", [...profile.projects, nextProject]));
  }

  function removeProject(id: string) {
    setProfile(updateProfileField(profile, "projects", profile.projects.filter((project) => project.id !== id)));
  }

  function updateCodingProfile(id: string, patch: Partial<CodingProfile>) {
    setProfile(
      updateProfileField(
        profile,
        "codingProfiles",
        profile.codingProfiles.map((platform) =>
          platform.id === id ? { ...platform, ...patch } : platform
        )
      )
    );
  }

  function addCodingProfile() {
    const nextProfile: CodingProfile = {
      id: `coding-${Date.now()}`,
      platform: "Codeforces",
      username: "new_handle",
      profileUrl: "https://codeforces.com/profile/new_handle",
      rating: 0,
      maxRating: 0,
      rank: "Unrated",
      totalSolved: 0,
      contests: 0,
      badges: ["New profile"],
      activity: [
        { label: "Easy", solved: 0 },
        { label: "Medium", solved: 0 },
        { label: "Hard", solved: 0 }
      ]
    };

    setProfile(updateProfileField(profile, "codingProfiles", [...profile.codingProfiles, nextProfile]));
  }

  function removeCodingProfile(id: string) {
    setProfile(
      updateProfileField(
        profile,
        "codingProfiles",
        profile.codingProfiles.filter((platform) => platform.id !== id)
      )
    );
  }

  function handleImport() {
    try {
      importProfile(importText);
      setImportError("");
      setImportText("");
    } catch {
      setImportError("The JSON profile could not be parsed. Check the file contents and try again.");
    }
  }

  return (
    <motion.section
      id="cms"
      className="section-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={sectionReveal}
      transition={{ duration: 0.55 }}
    >
      <SectionHeading
        eyebrow="Portfolio CMS"
        title="Edit content without touching code."
        description="This local-first CMS writes to browser storage and can export/import JSON for versioned backups or future database migration."
      />
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Profile Basics</CardTitle>
            <CardDescription>Core fields reused across the app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(event) => setProfile(updateProfileField(profile, "name", event.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                value={profile.headline}
                onChange={(event) => setProfile(updateProfileField(profile, "headline", event.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(event) => setProfile(updateProfileField(profile, "bio", event.target.value))}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile.contact.email}
                  onChange={(event) =>
                    setProfile(updateProfileField(profile, "contact", { ...profile.contact, email: event.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="role">Target Role</Label>
                <Input
                  id="role"
                  value={profile.careerGoals.targetRole}
                  onChange={(event) =>
                    setProfile(
                      updateProfileField(profile, "careerGoals", {
                        ...profile.careerGoals,
                        targetRole: event.target.value
                      })
                    )
                  }
                />
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button type="button" variant="outline" onClick={() => downloadText(exportProfile(), "career-profile.json", "application/json")}>
                <Upload aria-hidden className="h-4 w-4" />
                Export JSON
              </Button>
              <Button type="button" variant="danger" onClick={resetProfile}>
                <RefreshCcw aria-hidden className="h-4 w-4" />
                Reset Demo
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Edit levels and target levels used by benchmarking.</CardDescription>
                </div>
                <Button type="button" size="sm" onClick={addSkill}>
                  <Plus aria-hidden className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.skills.map((skill) => (
                <div key={skill.id} className="grid gap-3 rounded-[var(--radius)] border border-[rgba(var(--border),0.75)] p-3 sm:grid-cols-[1fr_0.42fr_0.42fr_auto]">
                  <Input value={skill.name} onChange={(event) => updateSkill(skill.id, "name", event.target.value)} aria-label={`${skill.name} name`} />
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={skill.level}
                    onChange={(event) => updateSkill(skill.id, "level", Number(event.target.value))}
                    aria-label={`${skill.name} level`}
                  />
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={skill.targetLevel}
                    onChange={(event) => updateSkill(skill.id, "targetLevel", Number(event.target.value))}
                    aria-label={`${skill.name} target level`}
                  />
                  <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${skill.name}`} onClick={() => removeSkill(skill.id)}>
                    <Trash2 aria-hidden className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Update titles, links, impact, and featured state.</CardDescription>
                </div>
                <Button type="button" size="sm" onClick={addProject}>
                  <Plus aria-hidden className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.projects.map((project) => (
                <div key={project.id} className="space-y-3 rounded-[var(--radius)] border border-[rgba(var(--border),0.75)] p-3">
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                    <Input value={project.title} onChange={(event) => updateProject(project.id, "title", event.target.value)} aria-label={`${project.title} title`} />
                    <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${project.title}`} onClick={() => removeProject(project.id)}>
                      <Trash2 aria-hidden className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={project.description}
                    onChange={(event) => updateProject(project.id, "description", event.target.value)}
                    aria-label={`${project.title} description`}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input value={project.githubUrl} onChange={(event) => updateProject(project.id, "githubUrl", event.target.value)} aria-label={`${project.title} GitHub URL`} />
                    <Input value={project.liveUrl} onChange={(event) => updateProject(project.id, "liveUrl", event.target.value)} aria-label={`${project.title} live URL`} />
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={project.featured}
                      onChange={(event) => updateProject(project.id, "featured", event.target.checked)}
                    />
                    Featured project
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>Coding Platforms</CardTitle>
                  <CardDescription>Add LeetCode, Codeforces, CodeChef, HackerRank, AtCoder, and more.</CardDescription>
                </div>
                <Button type="button" size="sm" onClick={addCodingProfile}>
                  <Plus aria-hidden className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.codingProfiles.map((platform) => (
                <div key={platform.id} className="space-y-3 rounded-[var(--radius)] border border-[rgba(var(--border),0.75)] p-3">
                  <div className="grid gap-3 sm:grid-cols-[0.7fr_1fr_auto]">
                    <select
                      value={platform.platform}
                      onChange={(event) =>
                        updateCodingProfile(platform.id, { platform: event.target.value as CodingPlatform })
                      }
                      className="focus-ring h-10 w-full rounded-[var(--radius)] border border-[rgba(var(--border),0.9)] bg-[rgba(var(--card),0.72)] px-3 text-sm"
                      aria-label={`${platform.platform} platform`}
                    >
                      {codingPlatforms.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                    <Input
                      value={platform.username}
                      onChange={(event) => updateCodingProfile(platform.id, { username: event.target.value })}
                      aria-label={`${platform.platform} username`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${platform.platform}`}
                      onClick={() => removeCodingProfile(platform.id)}
                    >
                      <Trash2 aria-hidden className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={platform.profileUrl}
                    onChange={(event) => updateCodingProfile(platform.id, { profileUrl: event.target.value })}
                    aria-label={`${platform.platform} profile URL`}
                  />
                  <div className="grid gap-3 sm:grid-cols-4">
                    <Input
                      type="number"
                      min={0}
                      value={platform.totalSolved}
                      onChange={(event) => updateCodingProfile(platform.id, { totalSolved: Number(event.target.value) })}
                      aria-label={`${platform.platform} solved count`}
                    />
                    <Input
                      type="number"
                      min={0}
                      value={platform.rating}
                      onChange={(event) => updateCodingProfile(platform.id, { rating: Number(event.target.value) })}
                      aria-label={`${platform.platform} rating`}
                    />
                    <Input
                      type="number"
                      min={0}
                      value={platform.maxRating}
                      onChange={(event) => updateCodingProfile(platform.id, { maxRating: Number(event.target.value) })}
                      aria-label={`${platform.platform} max rating`}
                    />
                    <Input
                      type="number"
                      min={0}
                      value={platform.contests}
                      onChange={(event) => updateCodingProfile(platform.id, { contests: Number(event.target.value) })}
                      aria-label={`${platform.platform} contest count`}
                    />
                  </div>
                  <Input
                    value={platform.rank}
                    onChange={(event) => updateCodingProfile(platform.id, { rank: event.target.value })}
                    aria-label={`${platform.platform} rank`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Import JSON</CardTitle>
              <CardDescription>Paste a profile export to restore or migrate data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea value={importText} onChange={(event) => setImportText(event.target.value)} placeholder="Paste exported profile JSON here" />
              {importError ? <p className="text-sm text-rose-500">{importError}</p> : null}
              <Button type="button" variant="outline" onClick={handleImport}>
                <Import aria-hidden className="h-4 w-4" />
                Import Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}

function FutureReadySection() {
  const items = [
    {
      icon: Bot,
      title: "AI adapters",
      description: "Add provider-specific resume review, interview prep, and application personalization behind server actions."
    },
    {
      icon: ShieldCheck,
      title: "Monetization-ready",
      description: "Premium templates, coaching workflows, and tracking can be layered behind feature flags."
    },
    {
      icon: GraduationCap,
      title: "Open-source friendly",
      description: "Typed profile modules, local scoring models, and clear docs make contribution paths explicit."
    }
  ];

  return (
    <section className="section-shell pb-8">
      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <item.icon aria-hidden className="h-5 w-5 text-blue-500" />
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-[rgba(var(--border),0.65)]">
      <div className="mx-auto flex w-[min(1180px,calc(100%-2rem))] flex-col gap-4 py-8 text-sm text-[rgb(var(--muted-foreground))] sm:flex-row sm:items-center sm:justify-between">
        <p>Built from one local JSON profile. Last updated {new Date(profile.updatedAt).toLocaleDateString()}.</p>
        <div className="flex gap-2">
          <Button asChild variant="ghost" size="sm">
            <a href={profile.contact.github} target="_blank" rel="noreferrer">
              <GitBranch aria-hidden className="h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer">
              <Link aria-hidden className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export function HomeClient() {
  const { profile, setProfile, resetProfile, exportProfile, importProfile } = useLocalProfile();

  return (
    <main>
      <AppHeader />
      <HeroSection profile={profile} />
      <DashboardSection profile={profile} />
      <BenchmarkingSection profile={profile} />
      <AnalyticsSection profile={profile} />
      <PortfolioSection profile={profile} />
      <DocumentGeneratorSection profile={profile} />
      <RoadmapSection profile={profile} />
      <ProfileCmsSection
        profile={profile}
        setProfile={setProfile}
        resetProfile={resetProfile}
        exportProfile={exportProfile}
        importProfile={importProfile}
      />
      <FutureReadySection />
      <Footer profile={profile} />
    </main>
  );
}
