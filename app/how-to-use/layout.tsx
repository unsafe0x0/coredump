import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "How to Use CoreDump",
  description:
    "Learn how to connect your coding activity, interpret analytics, and make the most of CoreDump in just a few steps.",
  openGraph: {
    title: "How to Use CoreDump",
    description:
      "Step-by-step guidance to connect your tools, understand metrics, and compete on the CoreDump leaderboard.",
  },
  twitter: {
    title: "How to Use CoreDump",
    description:
      "Follow our quick tutorial to track coding time and climb the CoreDump leaderboard.",
  },
};

export default function HowToUseLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
