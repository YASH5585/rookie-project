export type SkillCategory =
  | "Programming"
  | "Frontend"
  | "Backend"
  | "Data"
  | "AI/ML"
  | "Cloud"
  | "Design"
  | "Professional";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  targetLevel: number;
  evidence: string;
};

export type Education = {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  score: string;
  highlights: string[];
};

export type Experience = {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  impact: string[];
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  impact: string;
  metrics: ProjectMetric[];
  featured: boolean;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  url: string;
};

export type Achievement = {
  id: string;
  title: string;
  context: string;
  year: string;
};

export type LeetCodeStats = {
  username: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  currentStreak: number;
  maxStreak: number;
  weeklySolved: number[];
  topicCoverage: {
    topic: string;
    solved: number;
    target: number;
  }[];
};

export type CodingPlatform =
  | "LeetCode"
  | "Codeforces"
  | "CodeChef"
  | "HackerRank"
  | "AtCoder"
  | "GeeksforGeeks";

export type CodingProfile = {
  id: string;
  platform: CodingPlatform;
  username: string;
  profileUrl: string;
  rating: number;
  maxRating: number;
  rank: string;
  totalSolved: number;
  contests: number;
  badges: string[];
  activity: {
    label: string;
    solved: number;
  }[];
};

export type GitHubStats = {
  username: string;
  repositories: number;
  contributionsLastYear: number;
  pullRequests: number;
  stars: number;
  languages: {
    name: string;
    value: number;
  }[];
  activity: {
    month: string;
    commits: number;
    prs: number;
    issues: number;
  }[];
};

export type CareerGoal = {
  targetRole: string;
  targetTimeline: string;
  preferredDomains: string[];
  targetCompanies: string[];
  learningFocus: string[];
};

export type ContactInfo = {
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  leetcode: string;
};

export type ApplicationStatus =
  | "Researching"
  | "Applying"
  | "Applied"
  | "Interviewing"
  | "Offer"
  | "Rejected"
  | "Accepted";

export type Application = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  dateApplied: string;
  location: string;
  notes: string;
  url: string;
  salary?: string;
  timeline: {
    date: string;
    label: string;
  }[];
};

export type AIInsight = {
  id: string;
  type: "InterviewQuestion" | "BioVariation" | "SkillGap";
  content: string;
  context?: string;
};

export type Profile = {
  id: string;
  name: string;
  headline: string;
  bio: string;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  experience: Experience[];
  leetCode: LeetCodeStats;
  codingProfiles: CodingProfile[];
  github: GitHubStats;
  careerGoals: CareerGoal;
  contact: ContactInfo;
  applications: Application[];
  aiInsights: AIInsight[];
  updatedAt: string;
};

export type ResumeTemplate =
  | "Software Engineer"
  | "Data Analyst"
  | "Product Manager"
  | "Research Intern"
  | "Executive"
  | "Academic"
  | "Creative"
  | "Functional";

export type GeneratedDocumentType =
  | "resume"
  | "cover-letter"
  | "sop"
  | "professional-bio"
  | "interview-prep";
