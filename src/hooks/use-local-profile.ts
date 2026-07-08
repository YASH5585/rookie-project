"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultProfile } from "@/data/default-profile";
import type { Profile } from "@/types/profile";

const STORAGE_KEY = "career-intelligence-profile-v1";

function reviveProfile(value: unknown): Profile {
  return {
    ...defaultProfile,
    ...(value as Partial<Profile>),
    education: (value as Partial<Profile>)?.education ?? defaultProfile.education,
    skills: (value as Partial<Profile>)?.skills ?? defaultProfile.skills,
    projects: (value as Partial<Profile>)?.projects ?? defaultProfile.projects,
    certifications:
      (value as Partial<Profile>)?.certifications ?? defaultProfile.certifications,
    achievements: (value as Partial<Profile>)?.achievements ?? defaultProfile.achievements,
    experience: (value as Partial<Profile>)?.experience ?? defaultProfile.experience,
    leetCode: {
      ...defaultProfile.leetCode,
      ...(value as Partial<Profile>)?.leetCode
    },
    codingProfiles:
      (value as Partial<Profile>)?.codingProfiles ?? defaultProfile.codingProfiles,
    github: {
      ...defaultProfile.github,
      ...(value as Partial<Profile>)?.github
    },
    careerGoals: {
      ...defaultProfile.careerGoals,
      ...(value as Partial<Profile>)?.careerGoals
    },
    contact: {
      ...defaultProfile.contact,
      ...(value as Partial<Profile>)?.contact
    },
    applications: (value as Partial<Profile>)?.applications ?? defaultProfile.applications,
    aiInsights: (value as Partial<Profile>)?.aiInsights ?? defaultProfile.aiInsights
  };
}

export function useLocalProfile() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setProfile(reviveProfile(JSON.parse(stored)));
      }
    } catch {
      setProfile(defaultProfile);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...profile, updatedAt: new Date().toISOString() })
    );
  }, [isHydrated, profile]);

  const api = useMemo(
    () => ({
      profile,
      setProfile,
      isHydrated,
      resetProfile: () => setProfile(defaultProfile),
      exportProfile: () => JSON.stringify(profile, null, 2),
      importProfile: (json: string) => setProfile(reviveProfile(JSON.parse(json)))
    }),
    [isHydrated, profile]
  );

  return api;
}
