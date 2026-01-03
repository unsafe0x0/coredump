import { LRUCache } from "lru-cache";
import { NextResponse } from "next/server";
import dbClient from "@/prisma/DbClient";

interface Activity {
	languageName: string;
	shortLanguageName: string;
	totalDuration: number;
	last24HoursDuration: number;
	last7DaysDuration: number;
}

interface UserWithActivities {
	name: string;
	gitUsername: string;
	twitterUsername: string;
	profileImage: string;
	streak: number;
	activities: Activity[];
}

const cache = new LRUCache<string, UserWithActivities[]>({
	max: 100,
	ttl: 1000 * 60 * 10,
});

export async function GET() {
	const cachedData = cache.get("leaderboardData");

	if (cachedData) {
		return NextResponse.json({
			message: "Data fetched successfully",
			status: 200,
			data: cachedData,
		});
	}

	try {
		const leaderboardData = (await dbClient.user.findMany({
			select: {
				name: true,
				gitUsername: true,
				twitterUsername: true,
				profileImage: true,
				streak: true,
				activities: {
					select: {
						languageName: true,
						shortLanguageName: true,
						totalDuration: true,
						last24HoursDuration: true,
						last7DaysDuration: true,
					},
				},
			},
		})) as UserWithActivities[];

		cache.set("leaderboardData", leaderboardData);

		return NextResponse.json({
			message: "Data fetched successfully",
			status: 200,
			data: leaderboardData,
		});
	} catch (_error) {
		return NextResponse.json({
			message: "Something went wrong",
			status: 500,
		});
	}
}
