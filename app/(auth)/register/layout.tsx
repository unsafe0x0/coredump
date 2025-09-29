import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create a CoreDump Account",
  description:
    "Register for CoreDump to start tracking your coding time, compete on the leaderboard, and showcase your skills.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Join CoreDump",
    description:
      "Create a CoreDump account to unlock productivity insights and climb the leaderboard.",
  },
  twitter: {
    title: "Join CoreDump",
    description:
      "Sign up for CoreDump to track your coding activity and compete with developers worldwide.",
  },
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
