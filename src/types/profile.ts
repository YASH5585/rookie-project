export type SkillCategory =
  | "Programming"
  | "Frontend"
  | "Backend"
  | "Data"
  | "AI/ML"
  | "Cloud"
  | "Design"
  | "Professional"
  | "Mathematics"
  | "Physics"
  | "Chemistry"
  | "Mechanical"
  | "Electrical"
  | "Civil"
  | "Chemical"
  | "Aerospace"
  | "Automotive"
  | "Industrial"
  | "Materials"
  | "Manufacturing"
  | "Robotics"
  | "Embedded"
  | "Networking"
  | "Security"
  | "Testing"
  | "DevOps";

export type EngineeringBranch =
  | "Computer Science"
  | "Software Engineering"
  | "Data Science"
  | "Artificial Intelligence"
  | "Machine Learning"
  | "Cybersecurity"
  | "Web Development"
  | "Mobile Development"
  | "Cloud Computing"
  | "DevOps"
  | "Product Management"
  | "UX/UI Design"
  | "Mechanical Engineering"
  | "Electrical Engineering"
  | "Civil Engineering"
  | "Chemical Engineering"
  | "Aerospace Engineering"
  | "Automotive Engineering"
  | "Industrial Engineering"
  | "Materials Engineering"
  | "Manufacturing Engineering"
  | "Robotics Engineering"
  | "Embedded Systems"
  | "Networking Engineering"
  | "Security Engineering"
  | "Academic/PhD"
  | "Entrepreneur"
  | "Freelancer";

export type Discipline =
  | "Computer Science"
  | "Electrical"
  | "Mechanical"
  | "Civil"
  | "Chemical"
  | "Aerospace"
  | "Automotive"
  | "Industrial"
  | "Materials"
  | "Manufacturing"
  | "Robotics"
  | "Embedded"
  | "Networking"
  | "Security"
  | "Security Engineering"
  | "Mathematics"
  | "Physics"
  | "Chemistry"
  | "Design"
  | "Business"
  | "Medicine"
  | "Finance";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  discipline?: Discipline;
  level: number;
  targetLevel: number;
  evidence: string;
};

export type Education = {
  institution: string;
  degree: string;
  field: string;
  branch?: EngineeringBranch;
  startYear: string;
  endYear: string;
  score: string;
  highlights: string[];
  coursework?: string[];
  projects?: string[];
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
  branch?: EngineeringBranch;
  technologies?: string[];
};

export type ProjectMetric = {
  label: string;
  value: string;
  unit?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  branch?: EngineeringBranch;
  liveUrl: string;
  githubUrl: string;
  category: string;
  impact: string;
  metrics: ProjectMetric[];
  featured: boolean;
  domain?: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  url: string;
  branch?: EngineeringBranch;
};

export type Achievement = {
  id: string;
  title: string;
  context: string;
  year: string;
  branch?: EngineeringBranch;
  type?: "academic" | "competition" | "hackathon" | "open-source" | "leadership";
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
  targetBranch?: EngineeringBranch;
  targetTimeline: string;
  preferredDomains: string[];
  targetCompanies: string[];
  learningFocus: string[];
  careerType: "technical" | "management" | "academic" | "entrepreneur" | "research";
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
  branch?: EngineeringBranch;
};

export type AIInsight = {
  id: string;
  type: "InterviewQuestion" | "BioVariation" | "SkillGap";
  content: string;
  context?: string;
};

export type BranchAnalysis = {
  branch: EngineeringBranch;
  averageSalary: {
    entry: number;
    mid: number;
    senior: number;
  };
  jobGrowth: number;
  keySkills: string[];
  topCompanies: string[];
  commonCertifications: string[];
  typicalCareerPath: string[];
  popularTechnologies: string[];
  demandRegions: string[];
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
  branchAnalysis?: BranchAnalysis;
  googleId?: string;
  displayName?: string;
  photoURL?: string;
};

export type ResumeTemplate =
  | "Software Engineer"
  | "Data Analyst"
  | "Product Manager"
  | "Research Intern"
  | "Executive"
  | "Academic"
  | "Creative"
  | "Functional"
  | "Mechanical Engineer"
  | "Electrical Engineer"
  | "Civil Engineer"
  | "Chemical Engineer"
  | "Aerospace Engineer"
  | "Automotive Engineer"
  | "Industrial Engineer"
  | "Materials Engineer"
  | "Robotics Engineer"
  | "Embedded Systems Engineer"
  | "Networking Engineer"
  | "Security Engineer"
  | "General / All Branches";

export type GeneratedDocumentType =
  | "resume"
  | "cover-letter"
  | "sop"
  | "professional-bio"
  | "interview-prep";