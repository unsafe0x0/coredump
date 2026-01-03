import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Login | CoreDump",
	description:
		"Sign in to CoreDump to sync your coding activity, track progress, and compete with fellow developers.",
	robots: {
		index: false,
		follow: false,
	},
	openGraph: {
		title: "Login to CoreDump",
		description:
			"Access your CoreDump dashboard to monitor coding time and leaderboard standings.",
	},
	twitter: {
		title: "Login to CoreDump",
		description:
			"Sign in to CoreDump to resume tracking your coding productivity and progress.",
	},
};

export default function LoginLayout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
