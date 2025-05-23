import { NextResponse } from "next/server";
import databaseClient from "../../../../../prisma/db";
import { LRUCache } from "next/dist/server/lib/lru-cache";

const cache = new LRUCache({ max: 100, ttl: 1000 * 60 * 10 });

export async function GET(request, { params }) {
  if (cache.has(params.username)) {
    return NextResponse.json({
      message: "Data fetched successfully",
      status: 200,
      data: cache.get(params.username),
    });
  }

  try {
    const { username } = await params;
    const user = await databaseClient.user.findUnique({
      where: {
        gitUsername: username,
      },
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
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    cache.set(params.username, user);

    return NextResponse.json({
      message: "User details fetched successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
