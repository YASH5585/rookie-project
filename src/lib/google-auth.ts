"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

type GoogleUser = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

export function useGoogleAuth(onAuthChange: (user: GoogleUser | null) => void) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google?.accounts?.id?.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });
    };
    document.head.appendChild(script);

    function handleCredentialResponse(response: any) {
      if (response.credential) {
        try {
          const payload = JSON.parse(atob(response.credential.split(".")[1]));
          const user: GoogleUser = {
            uid: payload.sub,
            email: payload.email,
            displayName: payload.name,
            photoURL: payload.picture,
          };
          localStorage.setItem("career-intelligence-user", JSON.stringify(user));
          onAuthChange(user);
        } catch (e) {
          console.error("Failed to parse Google token", e);
        }
      }
    }

    const storedUser = localStorage.getItem("career-intelligence-user");
    if (storedUser) {
      onAuthChange(JSON.parse(storedUser));
    }

    return () => {
      const existingScript = document.querySelector('script[src*="accounts.google.com"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [onAuthChange]);
}

export function signInWithGoogle() {
  return new Promise<GoogleUser | null>((resolve) => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    }
    const handleAuthChange = (user: GoogleUser | null) => {
      resolve(user);
    };
    window.dispatchEvent(new CustomEvent("google-auth-change", { detail: handleAuthChange }));
  });
}

export function signOut() {
  localStorage.removeItem("career-intelligence-user");
  window.dispatchEvent(new CustomEvent("google-signout"));
}