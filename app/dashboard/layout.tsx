import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard | CoreDump",
  description:
    "Review your CoreDump coding analytics, manage profile settings, and explore productivity insights on the dashboard.",
  openGraph: {
    title: "CoreDump Dashboard",
    description:
      "Stay on top of your coding time, favorite languages, and activity trends with the CoreDump dashboard.",
  },
  twitter: {
    title: "CoreDump Dashboard",
    description:
      "Monitor and optimize your coding activity with personalized insights on the CoreDump dashboard.",
  },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
