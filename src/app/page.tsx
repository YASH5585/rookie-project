"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HomeClient } from "@/components/home-client";
import { useLocalProfile } from "@/hooks/use-local-profile";
import { ProfileInitializer } from "@/components/profile-initializer";
import { Loader2, User, Briefcase, LogIn } from "lucide-react";

export default function Home() {
  const { profile, isHydrated } = useLocalProfile();
  const [showProfile, setShowProfile] = useState(false);
  const [showProfileInitializer, setShowProfileInitializer] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    const hasProfile = profile.name !== "Your Name" && profile.headline !== "Your professional headline";
    const hasSkills = profile.skills.length > 0;
    const hasProjects = profile.projects.length > 0;

    if (hasProfile && (hasSkills || hasProjects)) {
      setShowProfile(true);
    } else {
      setShowProfileInitializer(true);
    }
  }, [isHydrated, profile]);

  if (showProfile) {
    return <HomeClient />;
  }

  if (showProfileInitializer) {
    return <ProfileInitializer />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <p className="text-muted-foreground mt-2">
              Let's get started with your basic information
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ProfileSetupForm />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function ProfileSetupForm() {
  const { setProfile } = useLocalProfile();
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedProfile = {
      name: name || "Your Name",
      headline: headline || "Your professional headline",
      education: [],
      skills: [],
      projects: []
    };

    setProfile(updatedProfile as any);
    setIsSubmitting(false);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">
          <User className="h-4 w-4 inline mr-1" />
          Your Name
        </Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="headline">
          <Briefcase className="h-4 w-4 inline mr-1" />
          Your Headline
        </Label>
        <Input
          id="headline"
          placeholder="Software Engineer | AI Enthusiast"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="mt-1"
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Getting Started...
          </>
        ) : (
          <>
            <User className="h-4 w-4 mr-2" />
            Start Building My Career Profile
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        This will personalize your portfolio, resume templates, and career dashboard
      </p>
    </form>
  );
}