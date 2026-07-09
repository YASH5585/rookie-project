"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useGoogleAuth, signInWithGoogle, signOut } from "@/lib/google-auth";

type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useGoogleAuth(setUser);

  useEffect(() => {
    const handleAuthChange = (event: CustomEvent) => {
      setUser(event.detail);
      setLoading(false);
    };

    const handleSignOut = () => {
      setUser(null);
      setLoading(false);
    };

    window.addEventListener("google-auth-change", handleAuthChange as any);
    window.addEventListener("google-signout", handleSignOut);

    const storedUser = localStorage.getItem("career-intelligence-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

    return () => {
      window.removeEventListener("google-auth-change", handleAuthChange as any);
      window.removeEventListener("google-signout", handleSignOut);
    };
  }, []);

  const signIn = async () => {
    const result = await signInWithGoogle();
    if (result) {
      setUser(result);
    }
  };

  const signOutUser = () => {
    signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle: signIn, signOut: signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}