import { NextResponse, NextRequest } from "next/server";
import { LRUCache } from "lru-cache";
import dbClient from "@/prisma/DbClient";

interface RequestBody {
  username: string;
}

interface Activity {
  languageName: string;
  shortLanguageName: string;
  totalDuration: number;
  last24HoursDuration: number;
  last7DaysDuration: number;
}

interface UserDetails {
  name: string;
  gitUsername: string;
  twitterUsername: string;
  profileImage: string;
  streak: number | null;
  activities: Activity[];
}

const cache = new LRUCache<string, UserDetails>({
  max: 100,
  ttl: 1000 * 60 * 10,
});

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { username } = body;

    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { message: "Username is required", status: 400 },
        { status: 400 },
      );
    }

    if (cache.has(username)) {
      return NextResponse.json({
        message: "Data fetched successfully (cache)",
        status: 200,
        data: cache.get(username),
      });
    }

    const user = await dbClient.user.findUnique({
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

    const normalizedUser: UserDetails = {
      ...user,
      streak: user.streak ?? 0,
      activities: user.activities.map((activity) => ({
        ...activity,
        shortLanguageName: activity.shortLanguageName ?? "",
        totalDuration: activity.totalDuration ?? 0,
        last24HoursDuration: activity.last24HoursDuration ?? 0,
        last7DaysDuration: activity.last7DaysDuration ?? 0,
      })),
    };

    cache.set(username, normalizedUser);

    return NextResponse.json({
      message: "User details fetched successfully",
      status: 200,
      data: normalizedUser,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
        status: 500,
      },
      { status: 500 },
    );
  }
}
