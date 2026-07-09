"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EngineeringBranch } from "@/types/profile";
import { useLocalProfile } from "@/hooks/use-local-profile";

const ENGINEERING_BRANCHES: { value: EngineeringBranch; label: string }[] = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Software Engineering", label: "Software Engineering" },
  { value: "Data Science", label: "Data Science" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Web Development", label: "Web Development" },
  { value: "Mobile Development", label: "Mobile Development" },
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "DevOps", label: "DevOps" },
  { value: "Product Management", label: "Product Management" },
  { value: "UX/UI Design", label: "UX/UI Design" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Chemical Engineering", label: "Chemical Engineering" },
  { value: "Aerospace Engineering", label: "Aerospace Engineering" },
  { value: "Automotive Engineering", label: "Automotive Engineering" },
  { value: "Industrial Engineering", label: "Industrial Engineering" },
  { value: "Materials Engineering", label: "Materials Engineering" },
  { value: "Manufacturing Engineering", label: "Manufacturing Engineering" },
  { value: "Robotics Engineering", label: "Robotics Engineering" },
  { value: "Embedded Systems", label: "Embedded Systems" },
  { value: "Networking Engineering", label: "Networking Engineering" },
  { value: "Security Engineering", label: "Security Engineering" },
  { value: "Academic/PhD", label: "Academic / PhD" },
  { value: "Entrepreneur", label: "Entrepreneur" },
  { value: "Freelancer", label: "Freelancer" },
];

type CareerDream = "full-stack" | "ai-engineer" | "data-scientist" | "product-manager" | "cybersecurity" | "devops" | "ux-designer" | "mechanical-engineer" | "electrical-engineer" | "civil-engineer" | "chemical-engineer" | "aerospace-engineer" | "automotive-engineer" | "robotics-engineer" | "embedded-systems" | "networking-engineer" | "entrepreneur" | "academic";

const DREAM_MAPPING: Record<CareerDream, { branch: EngineeringBranch; headline: string; focusAreas: string[] }> = {
  "full-stack": {
    branch: "Software Engineering",
    headline: "Building full-stack applications that scale",
    focusAreas: ["Frontend Development", "Backend Development", "Database Design", "Cloud Deployment"]
  },
  "ai-engineer": {
    branch: "Artificial Intelligence",
    headline: "Building intelligent systems that learn and adapt",
    focusAreas: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"]
  },
  "data-scientist": {
    branch: "Data Science",
    headline: "Turning data into actionable insights",
    focusAreas: ["Statistical Analysis", "Machine Learning", "Data Visualization", "Big Data"]
  },
  "product-manager": {
    branch: "Product Management",
    headline: "Building products users love and businesses need",
    focusAreas: ["Product Strategy", "User Research", "Agile Methodology", "Data Analysis"]
  },
  "cybersecurity": {
    branch: "Security Engineering",
    headline: "Protecting digital assets and building secure systems",
    focusAreas: ["Network Security", "Penetration Testing", "Cryptography", "Compliance"]
  },
  "devops": {
    branch: "DevOps",
    headline: "Building reliable, scalable infrastructure",
    focusAreas: ["CI/CD", "Cloud Infrastructure", "Monitoring", "Automation"]
  },
  "ux-designer": {
    branch: "UX/UI Design",
    headline: "Designing intuitive and beautiful user experiences",
    focusAreas: ["User Research", "Wireframing", "Prototyping", "Usability Testing"]
  },
  "mechanical-engineer": {
    branch: "Mechanical Engineering",
    headline: "Designing mechanical systems and mechanisms",
    focusAreas: ["CAD Design", "FMEA", "Thermal Systems", "Manufacturing"]
  },
  "electrical-engineer": {
    branch: "Electrical Engineering",
    headline: "Designing electrical systems and circuits",
    focusAreas: ["Circuit Design", "Power Systems", "Control Systems", "Signal Processing"]
  },
  "civil-engineer": {
    branch: "Civil Engineering",
    headline: "Building the infrastructure of tomorrow",
    focusAreas: ["Structural Design", "Geotechnical Engineering", "Transportation", "Construction Management"]
  },
  "chemical-engineer": {
    branch: "Chemical Engineering",
    headline: "Developing processes and products through chemistry",
    focusAreas: ["Process Design", "Thermodynamics", "Separation Processes", "Safety Engineering"]
  },
  "aerospace-engineer": {
    branch: "Aerospace Engineering",
    headline: "Pushing the boundaries of flight and space exploration",
    focusAreas: ["Aerodynamics", "Propulsion", "Materials", "Flight Dynamics"]
  },
  "automotive-engineer": {
    branch: "Automotive Engineering",
    headline: "Building the future of transportation",
    focusAreas: ["Vehicle Dynamics", "Powertrains", "Emissions", "Autonomous Systems"]
  },
  "robotics-engineer": {
    branch: "Robotics Engineering",
    headline: "Creating intelligent machines that work alongside humans",
    focusAreas: ["Robot Control", "Sensors", "Computer Vision", "Motion Planning"]
  },
  "embedded-systems": {
    branch: "Embedded Systems",
    headline: "Building intelligent embedded solutions",
    focusAreas: ["Microcontrollers", "Real-time Systems", "IoT", "Firmware Development"]
  },
  "networking-engineer": {
    branch: "Networking Engineering",
    headline: "Building and securing global networks",
    focusAreas: ["Network Design", "Routing", "Wireless Technologies", "Network Security"]
  },
  "entrepreneur": {
    branch: "Entrepreneur",
    headline: "Building innovative businesses and solving problems",
    focusAreas: ["Business Model", "Product-Market Fit", "Fundraising", "Growth Strategy"]
  },
  "academic": {
    branch: "Academic/PhD",
    headline: "Advancing knowledge through research",
    focusAreas: ["Research Methodology", "Publication", "Grant Writing", "Teaching"]
  }
};

export function ProfileInitializer() {
  const [step, setStep] = useState(1);
  const [selectedDream, setSelectedDream] = useState<CareerDream | null>(null);
  const [customBranch, setCustomBranch] = useState("");
  const [customHeadline, setCustomHeadline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setProfile } = useLocalProfile();

  const handleDreamSelect = (dream: CareerDream) => {
    setSelectedDream(dream);
    setStep(2);
  };

  const handleCustomSelection = () => {
    setStep(3);
  };

  const handleSaveProfile = () => {
    setIsSubmitting(true);
    
    const dream = selectedDream;
    const branch = customBranch || (dream ? DREAM_MAPPING[dream].branch : "Computer Science");
    const headline = customHeadline || (dream ? DREAM_MAPPING[dream].headline : "Your professional headline");
    const focusAreas = dream ? DREAM_MAPPING[dream].focusAreas : ["Your Key Skills"];
    const careerType = dream ? getCareerType(dream) : "technical";
    
    const updatedProfile = {
      careerGoals: {
        targetRole: dream ? getRoleName(dream) : "Your Target Role",
        targetBranch: branch,
        targetTimeline: "12 months",
        preferredDomains: focusAreas,
        targetCompanies: [],
        learningFocus: focusAreas,
        careerType
      },
      headline,
      education: [],
      skills: [],
      projects: []
    };

    setProfile(updatedProfile as any);
    setIsSubmitting(false);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">What's Your Career Dream?</CardTitle>
            <p className="text-muted-foreground">Select your dream role to get personalized recommendations</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(Object.keys(DREAM_MAPPING) as CareerDream[]).map((dream) => (
                <button
                  key={dream}
                  onClick={() => handleDreamSelect(dream)}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left"
                >
                  <h3 className="font-semibold">
                    {dream === "full-stack" && "Full Stack Developer"}
                    {dream === "ai-engineer" && "AI Engineer"}
                    {dream === "data-scientist" && "Data Scientist"}
                    {dream === "product-manager" && "Product Manager"}
                    {dream === "cybersecurity" && "Cybersecurity Specialist"}
                    {dream === "devops" && "DevOps Engineer"}
                    {dream === "ux-designer" && "UX Designer"}
                    {dream === "mechanical-engineer" && "Mechanical Engineer"}
                    {dream === "electrical-engineer" && "Electrical Engineer"}
                    {dream === "civil-engineer" && "Civil Engineer"}
                    {dream === "chemical-engineer" && "Chemical Engineer"}
                    {dream === "aerospace-engineer" && "Aerospace Engineer"}
                    {dream === "automotive-engineer" && "Automotive Engineer"}
                    {dream === "robotics-engineer" && "Robotics Engineer"}
                    {dream === "embedded-systems" && "Embedded Systems Engineer"}
                    {dream === "networking-engineer" && "Networking Engineer"}
                    {dream === "entrepreneur" && "Entrepreneur"}
                    {dream === "academic" && "Academic / Researcher"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {DREAM_MAPPING[dream].headline}
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={handleCustomSelection}
              className="mt-4 w-full text-center text-blue-600 hover:underline"
            >
              Something else?
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Your Career Path</CardTitle>
            <p className="text-muted-foreground">
              {selectedDream && `Branch: ${DREAM_MAPPING[selectedDream].branch}`}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="headline">Your Headline</Label>
                <Input
                  id="headline"
                  value={customHeadline}
                  onChange={(e) => setCustomHeadline(e.target.value)}
                  placeholder={selectedDream ? DREAM_MAPPING[selectedDream].headline : "Your professional headline"}
                />
              </div>
              <div>
                <Label htmlFor="branch">Engineering Branch</Label>
                <Input
                  id="branch"
                  value={customBranch}
                  onChange={(e) => setCustomBranch(e.target.value as EngineeringBranch)}
                  placeholder="Type or select your branch"
                />
                <div className="mt-2 flex flex-wrap gap-1">
                  {ENGINEERING_BRANCHES.slice(0, 6).map((b) => (
                    <button
                      key={b.value}
                      onClick={() => setCustomBranch(b.value)}
                      className="px-2 py-1 text-xs border rounded hover:bg-blue-50"
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleSaveProfile} disabled={isSubmitting}>
                {isSubmitting ? "Setting up..." : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}

function getRoleName(dream: CareerDream): string {
  const names: Record<CareerDream, string> = {
    "full-stack": "Full Stack Developer",
    "ai-engineer": "AI Engineer",
    "data-scientist": "Data Scientist",
    "product-manager": "Product Manager",
    "cybersecurity": "Cybersecurity Specialist",
    "devops": "DevOps Engineer",
    "ux-designer": "UX Designer",
    "mechanical-engineer": "Mechanical Engineer",
    "electrical-engineer": "Electrical Engineer",
    "civil-engineer": "Civil Engineer",
    "chemical-engineer": "Chemical Engineer",
    "aerospace-engineer": "Aerospace Engineer",
    "automotive-engineer": "Automotive Engineer",
    "robotics-engineer": "Robotics Engineer",
    "embedded-systems": "Embedded Systems Engineer",
    "networking-engineer": "Networking Engineer",
    "entrepreneur": "Entrepreneur",
    "academic": "Researcher / Academic"
  };
  return names[dream];
}

function getCareerType(dream: CareerDream): "technical" | "management" | "academic" | "entrepreneur" | "research" {
  if (["full-stack", "ai-engineer", "data-scientist", "cybersecurity", "devops", "mechanical-engineer", "electrical-engineer", "civil-engineer", "chemical-engineer", "aerospace-engineer", "automotive-engineer", "robotics-engineer", "embedded-systems", "networking-engineer"].includes(dream)) {
    return "technical";
  }
  if (dream === "product-manager" || dream === "ux-designer") {
    return "management";
  }
  if (dream === "academic") {
    return "academic";
  }
  if (dream === "entrepreneur") {
    return "entrepreneur";
  }
  return "technical";
}