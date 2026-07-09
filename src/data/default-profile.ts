import type { Profile } from "@/types/profile";

export const defaultProfile: Profile = {
  id: "profile-template",
  name: "Alex Rivera",
  headline: "Full-stack developer building useful AI products with measurable impact",
  bio: "I design and ship polished software across web, data, and AI workflows. My work focuses on reliable user experiences, clean systems, and practical automation for career and education outcomes.",
  education: [
    {
      institution: "Future Institute of Technology",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      startYear: "2023",
      endYear: "2027",
      score: "8.8 CGPA",
      highlights: [
        "Core coursework in data structures, database systems, operating systems, and machine learning.",
        "Built student productivity tools used by peers for interview preparation."
      ]
    }
  ],
  skills: [
    {
      id: "skill-ts",
      name: "TypeScript",
      category: "Programming",
      level: 84,
      targetLevel: 92,
      evidence: "Used across production-grade Next.js dashboards and API integrations."
    },
    {
      id: "skill-next",
      name: "Next.js",
      category: "Frontend",
      level: 82,
      targetLevel: 92,
      evidence: "Built app-router projects with reusable components, SEO metadata, and responsive UI."
    },
    {
      id: "skill-react",
      name: "React",
      category: "Frontend",
      level: 86,
      targetLevel: 94,
      evidence: "Created component systems, stateful forms, charts, and animated interfaces."
    },
    {
      id: "skill-node",
      name: "Node.js",
      category: "Backend",
      level: 72,
      targetLevel: 86,
      evidence: "Implemented API services, local data pipelines, and export utilities."
    },
    {
      id: "skill-python",
      name: "Python",
      category: "Data",
      level: 76,
      targetLevel: 88,
      evidence: "Used for data analysis, automation scripts, and ML experiments."
    },
    {
      id: "skill-dsa",
      name: "Data Structures & Algorithms",
      category: "Programming",
      level: 68,
      targetLevel: 90,
      evidence: "Practicing graph, dynamic programming, and interval problems on LeetCode."
    },
    {
      id: "skill-ml",
      name: "Machine Learning",
      category: "AI/ML",
      level: 61,
      targetLevel: 82,
      evidence: "Built model evaluation notebooks and prompt-assisted analysis workflows."
    },
    {
      id: "skill-cloud",
      name: "Cloud Deployment",
      category: "Cloud",
      level: 58,
      targetLevel: 80,
      evidence: "Deployed web apps with environment management and CI-ready build scripts."
    }
  ],
  projects: [
    {
      id: "project-career-os",
      title: "Career OS",
      description: "A career dashboard that turns profile data into resumes, roadmaps, and readiness scores.",
      longDescription:
        "Career OS centralizes a student profile, generates professional documents, and visualizes skill growth with transparent benchmark models.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Local Storage"],
      liveUrl: "https://example.com/career-os",
      githubUrl: "https://github.com/example/career-os",
      category: "AI Productivity",
      impact: "Reduced resume-update time from hours to minutes by reusing one structured profile.",
      metrics: [
        { label: "Lighthouse", value: "95+" },
        { label: "Exports", value: "4 formats" },
        { label: "Profile fields", value: "12 modules" }
      ],
      featured: true
    },
    {
      id: "project-code-radar",
      title: "Code Radar",
      description: "A LeetCode and GitHub analytics view for tracking coding consistency.",
      longDescription:
        "Code Radar combines problem-solving stats, language usage, and activity graphs to help students plan focused practice.",
      techStack: ["React", "Recharts", "Framer Motion", "JSON"],
      liveUrl: "https://example.com/code-radar",
      githubUrl: "https://github.com/example/code-radar",
      category: "Analytics",
      impact: "Made weekly coding progress easier to review with topic coverage and streak indicators.",
      metrics: [
        { label: "Charts", value: "7" },
        { label: "Topics", value: "8" },
        { label: "Refresh", value: "Local" }
      ],
      featured: true
    },
    {
      id: "project-studyflow",
      title: "StudyFlow Planner",
      description: "A roadmap planner for internship, placement, and research preparation.",
      longDescription:
        "StudyFlow Planner converts career goals into phased milestones, portfolio tasks, and measurable learning checkpoints.",
      techStack: ["TypeScript", "React", "Local Storage"],
      liveUrl: "https://example.com/studyflow",
      githubUrl: "https://github.com/example/studyflow",
      category: "Education",
      impact: "Helped convert broad goals into weekly execution plans with observable outcomes.",
      metrics: [
        { label: "Roadmaps", value: "4" },
        { label: "Milestones", value: "24" },
        { label: "Mode", value: "Offline" }
      ],
      featured: false
    }
  ],
  certifications: [
    {
      id: "cert-cloud",
      title: "Cloud Practitioner Foundations",
      issuer: "Open Learning Cloud",
      year: "2025",
      url: "https://example.com/certifications/cloud"
    },
    {
      id: "cert-data",
      title: "Applied Data Analytics",
      issuer: "Data Skills Academy",
      year: "2025",
      url: "https://example.com/certifications/data"
    }
  ],
  achievements: [
    {
      id: "ach-hackathon",
      title: "Top 5 Finalist, Campus Build Sprint",
      context: "Built an AI-assisted student planning app in 36 hours.",
      year: "2025"
    },
    {
      id: "ach-open-source",
      title: "Open-source Maintainer",
      context: "Maintained reusable UI utilities and documentation for student projects.",
      year: "2026"
    }
  ],
  experience: [
    {
      id: "exp-intern",
      role: "Software Engineering Intern",
      organization: "BrightPath Labs",
      location: "Remote",
      startDate: "May 2025",
      endDate: "Aug 2025",
      summary: "Built internal tools for analytics, document workflows, and team dashboards.",
      impact: [
        "Implemented reusable chart components that reduced dashboard delivery time.",
        "Improved form reliability with typed validation and accessible field states.",
        "Documented deployment steps for new contributors."
      ]
    }
  ],
  leetCode: {
    username: "alexcodes",
    totalSolved: 265,
    easy: 104,
    medium: 138,
    hard: 23,
    currentStreak: 9,
    maxStreak: 31,
    weeklySolved: [5, 8, 6, 10, 7, 12, 9, 11],
    topicCoverage: [
      { topic: "Arrays", solved: 46, target: 60 },
      { topic: "Strings", solved: 34, target: 45 },
      { topic: "Hashing", solved: 31, target: 40 },
      { topic: "Trees", solved: 28, target: 45 },
      { topic: "Graphs", solved: 21, target: 45 },
      { topic: "DP", solved: 18, target: 50 },
      { topic: "Greedy", solved: 24, target: 35 },
      { topic: "Binary Search", solved: 19, target: 30 }
    ]
  },
  codingProfiles: [
    {
      id: "coding-leetcode",
      platform: "LeetCode",
      username: "alexcodes",
      profileUrl: "https://leetcode.com/alexcodes",
      rating: 1680,
      maxRating: 1742,
      rank: "Knight track",
      totalSolved: 265,
      contests: 18,
      badges: ["Daily streak", "Top interview topics"],
      activity: [
        { label: "Arrays", solved: 46 },
        { label: "Graphs", solved: 21 },
        { label: "DP", solved: 18 },
        { label: "Trees", solved: 28 }
      ]
    },
    {
      id: "coding-codeforces",
      platform: "Codeforces",
      username: "alex_cf",
      profileUrl: "https://codeforces.com/profile/alex_cf",
      rating: 1324,
      maxRating: 1410,
      rank: "Pupil",
      totalSolved: 186,
      contests: 24,
      badges: ["Div. 2 practice", "Greedy focus"],
      activity: [
        { label: "800-1000", solved: 74 },
        { label: "1100-1300", solved: 63 },
        { label: "1400-1600", solved: 31 },
        { label: "1700+", solved: 18 }
      ]
    },
    {
      id: "coding-codechef",
      platform: "CodeChef",
      username: "alex_cc",
      profileUrl: "https://www.codechef.com/users/alex_cc",
      rating: 1588,
      maxRating: 1636,
      rank: "2 Star",
      totalSolved: 128,
      contests: 16,
      badges: ["Long challenge", "Starters"],
      activity: [
        { label: "Beginner", solved: 52 },
        { label: "Easy", solved: 41 },
        { label: "Medium", solved: 27 },
        { label: "Hard", solved: 8 }
      ]
    },
    {
      id: "coding-hackerrank",
      platform: "HackerRank",
      username: "alex_hr",
      profileUrl: "https://www.hackerrank.com/alex_hr",
      rating: 0,
      maxRating: 0,
      rank: "5 Star Problem Solving",
      totalSolved: 92,
      contests: 5,
      badges: ["Problem solving", "SQL"],
      activity: [
        { label: "Algorithms", solved: 42 },
        { label: "Data Structures", solved: 26 },
        { label: "SQL", solved: 18 },
        { label: "Python", solved: 6 }
      ]
    },
    {
      id: "coding-atcoder",
      platform: "AtCoder",
      username: "alex_ac",
      profileUrl: "https://atcoder.jp/users/alex_ac",
      rating: 612,
      maxRating: 680,
      rank: "Brown",
      totalSolved: 54,
      contests: 9,
      badges: ["ABC practice"],
      activity: [
        { label: "ABC A/B", solved: 31 },
        { label: "ABC C", solved: 14 },
        { label: "ABC D", solved: 7 },
        { label: "ARC", solved: 2 }
      ]
    }
  ],
  github: {
    username: "alexrivera",
    repositories: 24,
    contributionsLastYear: 742,
    pullRequests: 61,
    stars: 128,
    languages: [
      { name: "TypeScript", value: 42 },
      { name: "Python", value: 22 },
      { name: "JavaScript", value: 16 },
      { name: "CSS", value: 12 },
      { name: "SQL", value: 8 }
    ],
    activity: [
      { month: "Jan", commits: 46, prs: 3, issues: 4 },
      { month: "Feb", commits: 58, prs: 5, issues: 6 },
      { month: "Mar", commits: 64, prs: 6, issues: 5 },
      { month: "Apr", commits: 71, prs: 8, issues: 7 },
      { month: "May", commits: 84, prs: 7, issues: 6 },
      { month: "Jun", commits: 79, prs: 9, issues: 9 }
    ]
  },
  careerGoals: {
    targetRole: "Software Engineering Intern",
    targetBranch: "Software Engineering",
    targetTimeline: "12 months",
    preferredDomains: ["AI Products", "Developer Tools", "Education Technology"],
    targetCompanies: ["High-growth startups", "Product-led engineering teams", "Research labs"],
    learningFocus: ["System design fundamentals", "Advanced DSA", "AI application architecture"],
    careerType: "technical"
  },
  contact: {
    email: "alex@example.com",
    phone: "+1 555 014 7283",
    location: "Remote / San Francisco, CA",
    website: "https://alex.example.com",
    github: "https://github.com/alexrivera",
    linkedin: "https://linkedin.com/in/alexrivera",
    leetcode: "https://leetcode.com/alexcodes"
  },
  applications: [
    {
      id: "app-stripe",
      company: "Stripe",
      role: "Backend Engineer Intern",
      status: "Interviewing",
      dateApplied: "2026-05-12",
      location: "Remote",
      notes: "Referred by alumni. Emphasis on distributed systems and API design.",
      url: "https://stripe.com/jobs",
      salary: "$9,000/mo",
      timeline: [
        { date: "2026-05-12", label: "Applied via referral" },
        { date: "2026-05-20", label: "Phone screen completed" },
        { date: "2026-06-02", label: "Technical round scheduled" }
      ]
    },
    {
      id: "app-vercel",
      company: "Vercel",
      role: "Frontend Engineer Intern",
      status: "Applied",
      dateApplied: "2026-06-01",
      location: "Remote",
      notes: "Highlighted the Next.js portfolio projects and open-source work.",
      url: "https://vercel.com/careers",
      salary: "",
      timeline: [{ date: "2026-06-01", label: "Submitted application" }]
    },
    {
      id: "app-databricks",
      company: "Databricks",
      role: "Data Engineering Intern",
      status: "Researching",
      dateApplied: "",
      location: "Remote",
      notes: "Reviewing system design and Spark fundamentals before applying.",
      url: "https://databricks.com/careers",
      salary: "",
      timeline: []
    }
  ],
  aiInsights: [],
  updatedAt: "2026-07-09T00:00:00.000Z"
};