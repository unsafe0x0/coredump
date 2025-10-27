import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "API Documentation | CoreDump",
  description:
    "Access CoreDump's public APIs for coding statistics. Get SVG badges for your README or fetch JSON data programmatically.",
  openGraph: {
    title: "CoreDump API Documentation",
    description:
      "Learn how to integrate CoreDump's public APIs into your projects and showcase your coding stats.",
  },
  twitter: {
    title: "CoreDump API Documentation",
    description:
      "Discover CoreDump's public APIs for displaying coding statistics in README files and applications.",
  },
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
