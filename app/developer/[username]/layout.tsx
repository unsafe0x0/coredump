import type { Metadata } from "next";
import type { ReactNode } from "react";

type DeveloperLayoutProps = {
	children: ReactNode;
};

type DeveloperLayoutParams = {
	params: Promise<{
		username?: string;
	}>;
};

const toDisplayName = (value: string) => {
	const decoded = decodeURIComponent(value);
	const normalized = decoded.replace(/[-_]+/g, " ");

	return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
};

export async function generateMetadata({
	params,
}: DeveloperLayoutParams): Promise<Metadata> {
	const { username = "Developer" } = await params;
	const displayName = toDisplayName(username);

	return {
		title: `${displayName} | CoreDump Profile`,
		description: `Explore coding stats, favorite languages, and productivity trends for ${displayName} on CoreDump.`,
		openGraph: {
			title: `${displayName} | CoreDump Profile`,
			description: `Dive into ${displayName}'s CoreDump developer profile to see coding activity and achievements.`,
		},
		twitter: {
			title: `${displayName} | CoreDump Profile`,
			description: `Check out ${displayName}'s CoreDump profile with up-to-date coding statistics and accomplishments.`,
		},
	};
}

export default function DeveloperLayout({ children }: DeveloperLayoutProps) {
	return <>{children}</>;
}
