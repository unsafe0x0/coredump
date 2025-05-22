import { NextResponse } from "next/server";
import databaseClient from "../../../../prisma/db";
import { LRUCache } from "next/dist/server/lib/lru-cache";

const cache = new LRUCache({ max: 100, ttl: 1000 * 60 * 10 });

export async function GET() {
  if (cache.has("leaderboardData")) {
    return NextResponse.json({
      message: "Data fetched successfully",
      status: 200,
      data: cache.get("leaderboardData"),
    });
  }

  try {
    const leaderboardData = await databaseClient.user.findMany({
      select: {
        gitUsername: true,
        profileImage: true,
        name: true,
        twitterUsername: true,
        activities: true,
        streak: true,
      },
    });

    const filteredData = leaderboardData.map((user) => {
      const filteredActivities = user.activities.filter(
        (activity) => activity.languageName !== "scminput",
      );

      return { ...user, activities: filteredActivities };
    });

    cache.set("leaderboardData", filteredData);

    return NextResponse.json({
      message: "Data fetched successfully",
      status: 200,
      data: filteredData,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
