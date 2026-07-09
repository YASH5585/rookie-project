"use client";

import { motion } from "framer-motion";
import { Skill, EngineeringBranch } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, Check, Target } from "lucide-react";
import { average, clamp } from "@/lib/utils";

const SKILL_CATEGORIES = {
  Programming: { color: "bg-blue-500", icon: "💻" },
  Frontend: { color: "bg-green-500", icon: "🎨" },
  Backend: { color: "bg-purple-500", icon: "⚙️" },
  Data: { color: "bg-cyan-500", icon: "📊" },
  "AI/ML": { color: "bg-pink-500", icon: "🤖" },
  Cloud: { color: "bg-orange-500", icon: "☁️" },
  Design: { color: "bg-red-500", icon: "🎯" },
  Professional: { color: "bg-yellow-500", icon: "📈" },
  Mathematics: { color: "bg-indigo-500", icon: "∑" },
  Physics: { color: "bg-teal-500", icon: "⚛️" },
  Chemistry: { color: "bg-lime-500", icon: "⚗️" },
  Mechanical: { color: "bg-amber-500", icon: "⚙️" },
  Electrical: { color: "bg-sky-500", icon: "⚡" },
  Civil: { color: "bg-rose-500", icon: "🏗️" },
  Chemical: { color: "bg-emerald-500", icon: "🔬" },
  Aerospace: { color: "bg-violet-500", icon: "🚀" },
  Automotive: { color: "bg-fuchsia-500", icon: "🚗" },
  Industrial: { color: "bg-cyan-600", icon: "🏭" },
  Materials: { color: "bg-slate-500", icon: "🧪" },
  Manufacturing: { color: "bg-zinc-500", icon: "🏭" },
  Robotics: { color: "bg-pink-600", icon: "🤖" },
  Embedded: { color: "bg-blue-600", icon: "🔌" },
  Networking: { color: "bg-green-600", icon: "🌐" },
  Security: { color: "bg-red-600", icon: "🛡️" },
  DevOps: { color: "bg-orange-600", icon: "🔧" },
  "UX/UI Design": { color: "bg-purple-600", icon: "👁️" },
  "Product Management": { color: "bg-pink-600", icon: "📋" }
};

type Branch = EngineeringBranch;

const BRANCH_WEIGHTS: Record<Branch, number> = {
  "Computer Science": 0.95,
  "Software Engineering": 0.98,
  "Data Science": 0.92,
  "Artificial Intelligence": 0.88,
  "Machine Learning": 0.86,
  "Cybersecurity": 0.85,
  "Web Development": 0.90,
  "Mobile Development": 0.82,
  "Cloud Computing": 0.87,
  "DevOps": 0.84,
  "Product Management": 0.78,
  "UX/UI Design": 0.75,
  "Mechanical Engineering": 0.70,
  "Electrical Engineering": 0.72,
  "Civil Engineering": 0.68,
  "Chemical Engineering": 0.65,
  "Aerospace Engineering": 0.71,
  "Automotive Engineering": 0.69,
  "Industrial Engineering": 0.67,
  "Materials Engineering": 0.66,
  "Manufacturing Engineering": 0.64,
  "Robotics Engineering": 0.63,
  "Embedded Systems": 0.61,
  "Networking Engineering": 0.59,
  "Security Engineering": 0.58,
  "Academic/PhD": 0.55,
  "Entrepreneur": 0.52,
  "Freelancer": 0.50
};

type WeightedSkill = Skill & { weightedLevel: number };

export function SkillMarketChart({ skills, branch = "Software Engineering" }: { skills: Skill[]; branch?: Branch }) {
  const branchWeight = BRANCH_WEIGHTS[branch] || 0.8;
  const weightedSkills: WeightedSkill[] = skills.map(skill => ({
    ...skill,
    weightedLevel: clamp(skill.level * branchWeight, 0, 100)
  }));

  const totalSkills = weightedSkills.length;
  const avgLevel = average(weightedSkills.map(s => s.weightedLevel));
  const strongSkills = weightedSkills.filter(s => s.level >= 80).length;
  const targetSkills = weightedSkills.filter(s => s.targetLevel >= s.level + 15).length;

  const skillGroups = weightedSkills.reduce((acc, skill) => {
    const category = skill.category as keyof typeof SKILL_CATEGORIES;
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, WeightedSkill[]>);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Skill Index"
          value={`${Math.round(avgLevel)}%`}
          description="Your weighted skill level"
        />
        <StatCard
          icon={<Target className="h-5 w-5" />}
          label="Target Gap"
          value={targetSkills.toString()}
          description="Skills needing focus"
        />
        <StatCard
          icon={<Check className="h-5 w-5" />}
          label="Strong Skills"
          value={strongSkills.toString()}
          description="80+ level skills"
        />
        <StatCard
          icon={<Briefcase className="h-5 w-5" />}
          label="Total Skills"
          value={totalSkills.toString()}
          description="Skills tracked"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(skillGroups).map(([category, categorySkills]) => {
              const avgCategoryLevel = average(categorySkills.map(s => s.weightedLevel));
              const icon = (SKILL_CATEGORIES as any)[category]?.icon || "📊";
              const colorClass = (SKILL_CATEGORIES as any)[category]?.color || "bg-slate-500";

              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{icon}</span>
                      <span className="font-medium">{category}</span>
                    </div>
                    <span className="text-sm font-semibold">{Math.round(avgCategoryLevel)}%</span>
                  </div>
                  <Progress value={avgCategoryLevel} className={`h-2 ${colorClass}`} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weightedSkills
              .sort((a, b) => b.level - a.level)
              .slice(0, 5)
              .map((skill, index) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                      {index + 1}
                    </span>
                    <span className="text-sm">{skill.name}</span>
                  </div>
                  <Badge tone="neutral" className="font-mono">
                    {skill.level}/{skill.targetLevel}
                  </Badge>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  description
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}