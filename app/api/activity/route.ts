import { NextResponse } from "next/server";
import dbClient from "@/prisma/DbClient";
import { isSameDay, subDays } from "date-fns";
import languageShortNames from "@/utils/LanguageShortNames";
import { generateAchievements } from "@/utils/GenerateAchievements";

interface RequestBody {
  privateKey: string;
  languageName: string;
  timeSpent: number;
}

const programmingLanguages = new Set(Object.keys(languageShortNames));

function getShortLanguageName(lang: string): string {
  return (
    languageShortNames[lang as keyof typeof languageShortNames] ||
    lang.toUpperCase()
  );
}

function calculateNewStreak(
  currentStreak: number | null | undefined,
  lastUpdated: Date,
  now: Date
): number {
  const sameDay = isSameDay(now, lastUpdated);
  if (sameDay) return currentStreak || 0;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(yesterday, lastUpdated)) {
    return (currentStreak || 0) + 1;
  }

  return 1;
}

function getUTC(date: Date): Date {
  const utcDate = new Date(date);
  utcDate.setUTCHours(0, 0, 0, 0);
  return utcDate;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const { privateKey, languageName, timeSpent } = body;

    if (!privateKey || !languageName || typeof timeSpent !== "number") {
      return NextResponse.json({ message: "Missing fields", status: 400 });
    }

    const normalizedLang = languageName.toLowerCase();
    if (!programmingLanguages.has(normalizedLang)) {
      return NextResponse.json({
        message: "Unsupported language",
        status: 400,
      });
    }

    const shortLang = getShortLanguageName(normalizedLang);
    const roundedTime = Number(timeSpent.toFixed(2));

    if (roundedTime <= 0) {
      return NextResponse.json({ message: "Invalid time spent", status: 400 });
    }

    const user = await dbClient.user.findUnique({
      where: { privateKey },
      select: {
        id: true,
        name: true,
        achievements: true,
        totalPoints: true,
        streak: true,
        streakUpdatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    const now = new Date();

    const activity = await dbClient.activity.findFirst({
      where: {
        userId: user.id,
        languageName: normalizedLang,
      },
    });

    if (!activity) {
      await dbClient.activity.create({
        data: {
          userId: user.id,
          languageName: normalizedLang,
          shortLanguageName: shortLang,
          totalDuration: roundedTime,
          last24HoursDuration: roundedTime,
          last7DaysDuration: roundedTime,
          lastUpdated: now,
        },
      });
    } else {
      await dbClient.activity.update({
        where: { id: activity.id },
        data: {
          totalDuration: (activity.totalDuration || 0) + roundedTime,
          last24HoursDuration:
            (activity.last24HoursDuration || 0) + roundedTime,
          last7DaysDuration: (activity.last7DaysDuration || 0) + roundedTime,
          lastUpdated: now,
          shortLanguageName: shortLang,
        },
      });
    }

    const activitiesAfter = await dbClient.activity.findMany({
      where: { userId: user.id },
    });

    const newAchievements = generateAchievements(user, activitiesAfter);
    const totalMinutes = activitiesAfter.reduce(
      (sum, a) => sum + (a.totalDuration || 0),
      0
    );
    const computedPoints = Math.floor(totalMinutes / 10);
    const newStreak = calculateNewStreak(
      user.streak,
      user.streakUpdatedAt,
      now
    );

    await dbClient.user.update({
      where: { id: user.id },
      data: {
        streak: newStreak,
        streakUpdatedAt: now,
        totalPoints: computedPoints,
        ...(newAchievements.length > 0
          ? { achievements: { push: newAchievements.map((a: any) => a.id) } }
          : {}),
      },
    });

    const today = getUTC(now);
    const dayName = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ][today.getDay()] as
      | "SUNDAY"
      | "MONDAY"
      | "TUESDAY"
      | "WEDNESDAY"
      | "THURSDAY"
      | "FRIDAY"
      | "SATURDAY";

    await dbClient.dailyActivity.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
      update: {
        duration: { increment: roundedTime },
      },
      create: {
        userId: user.id,
        weekDay: dayName,
        date: today,
        duration: roundedTime,
      },
    });

    const weekStartDate = subDays(today, 6);
    const weekRecords = await dbClient.dailyActivity.findMany({
      where: {
        userId: user.id,
        date: { gte: weekStartDate, lte: today },
      },
      select: { duration: true },
    });

    const totalWeekMinutes = weekRecords.reduce(
      (sum, r) => sum + r.duration,
      0
    );

    const weekStartDay = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ][weekStartDate.getDay()] as
      | "SUNDAY"
      | "MONDAY"
      | "TUESDAY"
      | "WEDNESDAY"
      | "THURSDAY"
      | "FRIDAY"
      | "SATURDAY";

    await dbClient.weeklyActivity.upsert({
      where: {
        userId_weekStartDay: {
          userId: user.id,
          weekStartDay,
        },
      },
      update: {
        totalDuration: totalWeekMinutes,
      },
      create: {
        userId: user.id,
        weekStartDay,
        totalDuration: totalWeekMinutes,
      },
    });

    return NextResponse.json({
      message: `Activity updated for ${user.name} (${normalizedLang}): +${roundedTime}m`,
      status: 200,
    });
  } catch (err) {
    console.error("Error updating activity:", err);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
