import { NextResponse, NextRequest } from "next/server";
import { LRUCache } from "lru-cache";
import dbClient from "@/prisma/DbClient";

interface Activity {
  languageName: string;
  shortLanguageName: string;
  totalDuration: number;
  last24HoursDuration: number;
  last7DaysDuration: number;
}

interface DailyActivity {
  weekDay: number;
  date: string;
  duration: number;
}

interface WeeklyActivity {
  weekStartDay: string;
  totalDuration: number;
}

interface UserDetails {
  name: string;
  gitUsername: string;
  twitterUsername: string;
  profileImage: string;
  website?: string;
  streak: number;
  totalPoints: number;
  activities: Activity[];
  achievements: string[];
  dailyActivity: DailyActivity[];
  weeklyActivity: WeeklyActivity[];
}

const cache = new LRUCache<string, UserDetails>({
  max: 100,
  ttl: 1000 * 60 * 10,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 },
      );
    }

    const cacheKey = username.toLowerCase();

    if (cache.has(cacheKey)) {
      return NextResponse.json(
        {
          message: "User data fetched from cache",
          data: cache.get(cacheKey),
        },
        { status: 200 },
      );
    }

    const user = await dbClient.user.findUnique({
      where: { gitUsername: username },
      select: {
        name: true,
        gitUsername: true,
        twitterUsername: true,
        profileImage: true,
        website: true,
        streak: true,
        totalPoints: true,
        achievements: true,
        activities: {
          select: {
            languageName: true,
            shortLanguageName: true,
            totalDuration: true,
            last24HoursDuration: true,
            last7DaysDuration: true,
          },
        },
        dailyActivity: {
          select: {
            weekDay: true,
            date: true,
            duration: true,
          },
        },
        weeklyActivity: {
          select: {
            weekStartDay: true,
            totalDuration: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const weekDayMap: Record<string, number> = {
      SUNDAY: 0,
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
    };

    const normalizedUser: UserDetails = {
      name: user.name ?? "",
      gitUsername: user.gitUsername ?? "",
      twitterUsername: user.twitterUsername ?? "",
      profileImage: user.profileImage ?? "",
      website: user.website ?? "",
      streak: user.streak ?? 0,
      totalPoints: user.totalPoints ?? 0,
      achievements: user.achievements ?? [],
      activities: (user.activities || []).map((a) => ({
        languageName: a.languageName ?? "Unknown",
        shortLanguageName: a.shortLanguageName ?? "",
        totalDuration: a.totalDuration ?? 0,
        last24HoursDuration: a.last24HoursDuration ?? 0,
        last7DaysDuration: a.last7DaysDuration ?? 0,
      })),
      dailyActivity: (user.dailyActivity || []).map((d) => ({
        weekDay: weekDayMap[d.weekDay as keyof typeof weekDayMap] ?? 0,
        date:
          d.date instanceof Date
            ? d.date.toISOString()
            : new Date(d.date).toISOString(),
        duration: d.duration ?? 0,
      })),
      weeklyActivity: (user.weeklyActivity || []).map((w) => ({
        weekStartDay: w.weekStartDay ?? "",
        totalDuration: w.totalDuration ?? 0,
      })),
    };

    cache.set(cacheKey, normalizedUser);

    return NextResponse.json(
      {
        message: "User details fetched successfully",
        data: normalizedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
