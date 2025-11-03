import { NextResponse, NextRequest } from "next/server";
import dbClient from "@/prisma/DbClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = session.user.id;

    const user = await dbClient.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        gitUsername: true,
        twitterUsername: true,
        website: true,
        profileImage: true,
        privateKey: true,
        streak: true,
        totalPoints: true,
        createdAt: true,
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

    const normalizedUser = {
      ...user,
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

    return NextResponse.json(
      {
        message: "Dashboard data fetched successfully",
        data: normalizedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
