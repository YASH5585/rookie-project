import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://career-intelligence.local"),
  title: {
    default: "Career Intelligence Portfolio",
    template: "%s | Career Intelligence Portfolio"
  },
  description:
    "A personal portfolio, resume builder, career dashboard, and professional branding platform powered by a local JSON profile.",
  applicationName: "Career Intelligence Portfolio",
  authors: [{ name: "Open Source Contributors" }],
  keywords: [
    "portfolio",
    "resume builder",
    "career dashboard",
    "Next.js",
    "AI portfolio",
    "GitHub analytics",
    "LeetCode analytics"
  ],
  openGraph: {
    title: "Career Intelligence Portfolio",
    description:
      "Portfolio, resume builder, analytics dashboard, and career intelligence platform in one open-source Next.js app.",
    type: "website",
    url: "https://career-intelligence.local"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b12" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
