import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Leaderboard | CoreDump",
	description:
		"Track top developers, compare coding hours, and see which languages are trending on the CoreDump leaderboard.",
	openGraph: {
		title: "CoreDump Leaderboard",
		description:
			"Discover the most active developers and trending languages on the CoreDump leaderboard.",
	},
	twitter: {
		title: "CoreDump Leaderboard",
		description:
			"Check who's leading the CoreDump coding competition and explore language rankings.",
	},
};

export default function LeaderboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	return <>{children}</>;
}
