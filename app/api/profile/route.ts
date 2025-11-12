import { NextResponse, NextRequest } from "next/server";
import { LRUCache } from "lru-cache";
import dbClient from "@/prisma/DbClient";
import { startOfWeek, endOfWeek, addDays } from "date-fns";

interface PublicUserData {
  name: string;
  gitUsername: string;
  twitterUsername: string | null;
  website: string | null;
  profileImage: string | null;
  streak: number;
  maxStreak: number;
  totalPoints: number;
  achievements: string[];
  activities: {
    languageName: string;
    shortLanguageName: string;
    totalDuration: number;
    last24HoursDuration: number;
    last7DaysDuration: number;
    last30DaysDuration: number;
  }[];
  dailyActivity: {
    weekDay: number;
    date: string;
    duration: number;
  }[];
  monthlyActivity: {
    month: number;
    year: number;
    totalDuration: number;
  }[];
}

const cache = new LRUCache<string, PublicUserData>({
  max: 100,
  ttl: 1000 * 60 * 5,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 },
      );
    }

    const cacheKey = username.toLowerCase();
    const cached = cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(
        { message: "Fetched from cache", data: cached },
        { status: 200 },
      );
    }

    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });

    const user = await dbClient.user.findUnique({
      where: { gitUsername: username },
      select: {
        name: true,
        gitUsername: true,
        twitterUsername: true,
        website: true,
        profileImage: true,
        streak: true,
        maxStreak: true,
        totalPoints: true,
        achievements: true,
        activities: {
          select: {
            languageName: true,
            shortLanguageName: true,
            totalDuration: true,
            last24HoursDuration: true,
            last7DaysDuration: true,
            last30DaysDuration: true,
          },
        },
        dailyActivity: {
          where: {
            date: {
              gte: start,
              lte: end,
            },
          },
          select: {
            weekDay: true,
            date: true,
            duration: true,
          },
        },
        monthlyActivity: {
          select: {
            month: true,
            year: true,
            totalDuration: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const monthMap: Record<string, number> = {
      JANUARY: 0,
      FEBRUARY: 1,
      MARCH: 2,
      APRIL: 3,
      MAY: 4,
      JUNE: 5,
      JULY: 6,
      AUGUST: 7,
      SEPTEMBER: 8,
      OCTOBER: 9,
      NOVEMBER: 10,
      DECEMBER: 11,
    };

    const fullWeek = Array.from({ length: 7 }).map((_, i) => {
      const date = addDays(start, i);
      const existing = user.dailyActivity.find(
        (d) => new Date(d.date).toDateString() === date.toDateString(),
      );
      return {
        weekDay: date.getDay(),
        date: date.toISOString(),
        duration: existing?.duration ?? 0,
      };
    });

    const normalized: PublicUserData = {
      name: user.name ?? "",
      gitUsername: user.gitUsername ?? "",
      twitterUsername: user.twitterUsername ?? null,
      website: user.website ?? null,
      profileImage: user.profileImage ?? null,
      streak: user.streak ?? 0,
      maxStreak: user.maxStreak ?? 0,
      totalPoints: user.totalPoints ?? 0,
      achievements: user.achievements ?? [],
      activities: user.activities.map((a) => ({
        languageName: a.languageName ?? "Unknown",
        shortLanguageName: a.shortLanguageName ?? "NULL",
        totalDuration: a.totalDuration ?? 0,
        last24HoursDuration: a.last24HoursDuration ?? 0,
        last7DaysDuration: a.last7DaysDuration ?? 0,
        last30DaysDuration: a.last30DaysDuration ?? 0,
      })),
      dailyActivity: fullWeek,
      monthlyActivity: user.monthlyActivity.map((m) => ({
        month: monthMap[m.month],
        year: m.year,
        totalDuration: m.totalDuration ?? 0,
      })),
    };

    cache.set(cacheKey, normalized);

    return NextResponse.json(
      { message: "User profile data fetched successfully", data: normalized },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
