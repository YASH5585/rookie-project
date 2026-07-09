"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { BenchmarkPillar } from "@/lib/scoring";
import type { CodingProfile, GitHubStats, LeetCodeStats, Skill } from "@/types/profile";
export { SkillMarketChart } from "@/components/skill-market-chart";

const axisStyle = { fill: "rgb(var(--muted-foreground))", fontSize: 12 };
const gridColor = "rgba(148, 163, 184, 0.24)";
const colors = ["#60a5fa", "#34d399", "#fbbf24", "#fb7185", "#a78bfa", "#22d3ee"];

export function SkillRadarChart({ data }: { data: BenchmarkPillar[] }) {
  return (
    <ResponsiveContainer width="100%" height={310}>
      <RadarChart data={data}>
        <PolarGrid stroke={gridColor} />
        <PolarAngleAxis dataKey="pillar" tick={axisStyle} />
        <Radar dataKey="softwareEngineering" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.12} />
        <Radar dataKey="internship" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.14} />
        <Radar dataKey="user" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.35} />
        <Tooltip contentStyle={{ background: "rgb(var(--card))", border: "1px solid rgba(var(--border),0.8)" }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function SkillHeatmap({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {skills.map((skill) => {
        const intensity = Math.max(0.18, skill.level / 100);

        return (
          <div
            key={skill.id}
            className="rounded-[var(--radius)] border border-[rgba(var(--border),0.75)] p-3"
            style={{ background: `rgba(96, 165, 250, ${intensity * 0.24})` }}
          >
            <div className="truncate text-sm font-semibold">{skill.name}</div>
            <div className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">{skill.level}/100</div>
          </div>
        );
      })}
    </div>
  );
}

export function LeetCodeChart({ stats }: { stats: LeetCodeStats }) {
  const difficulty = [
    { name: "Easy", value: stats.easy },
    { name: "Medium", value: stats.medium },
    { name: "Hard", value: stats.hard }
  ];
  const weekly = stats.weeklySolved.map((value, index) => ({ week: `W${index + 1}`, solved: value }));

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={difficulty}>
          <CartesianGrid stroke={gridColor} vertical={false} />
          <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "rgb(var(--card))", border: "1px solid rgba(var(--border),0.8)" }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {difficulty.map((_, index) => (
              <Cell key={colors[index]} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={230}>
        <AreaChart data={weekly}>
          <defs>
            <linearGradient id="leetcodeSolved" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={gridColor} vertical={false} />
          <XAxis dataKey="week" tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "rgb(var(--card))", border: "1px solid rgba(var(--border),0.8)" }} />
          <Area type="monotone" dataKey="solved" stroke="#34d399" fill="url(#leetcodeSolved)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GitHubActivityChart({ stats }: { stats: GitHubStats }) {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <LineChart data={stats.activity}>
        <CartesianGrid stroke={gridColor} vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "rgb(var(--card))", border: "1px solid rgba(var(--border),0.8)" }} />
        <Line type="monotone" dataKey="commits" stroke="#60a5fa" strokeWidth={2.4} dot={false} />
        <Line type="monotone" dataKey="prs" stroke="#34d399" strokeWidth={2.4} dot={false} />
        <Line type="monotone" dataKey="issues" stroke="#fbbf24" strokeWidth={2.4} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function LanguageChart({ stats }: { stats: GitHubStats }) {
  return (
    <div className="space-y-3">
      {stats.languages.map((language, index) => (
        <div key={language.name} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold">{language.name}</span>
            <span className="text-[rgb(var(--muted-foreground))]">{language.value}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-[var(--radius)] bg-[rgba(var(--muted),0.9)]">
            <div
              className="h-full rounded-[var(--radius)]"
              style={{ width: `${language.value}%`, backgroundColor: colors[index % colors.length] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CodingPlatformChart({ profiles }: { profiles: CodingProfile[] }) {
  const data = profiles.map((profile) => ({
    platform: profile.platform,
    solved: profile.totalSolved,
    contests: profile.contests,
    rating: profile.maxRating || profile.rating
  }));

  return (
    <ResponsiveContainer width="100%" height={270}>
      <BarChart data={data}>
        <CartesianGrid stroke={gridColor} vertical={false} />
        <XAxis dataKey="platform" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "rgb(var(--card))", border: "1px solid rgba(var(--border),0.8)" }} />
        <Bar dataKey="solved" fill="#60a5fa" radius={[6, 6, 0, 0]} />
        <Bar dataKey="contests" fill="#34d399" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
