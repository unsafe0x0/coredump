import { NextResponse } from "next/server";
import dbClient from "@/prisma/DbClient";
import { isSameDay, getMonth, getYear, subDays } from "date-fns";
import languageShortNames from "@/utils/LanguageShortNames";
import { generateAchievements } from "@/utils/GenerateAchievements";
import type { WeekDay, Month } from "@prisma/client";

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

function getUTC(date: Date): Date {
  const utcDate = new Date(date);
  utcDate.setUTCHours(0, 0, 0, 0);
  return utcDate;
}

function calculateNewStreak(
  currentStreak: number | null | undefined,
  lastUpdated: Date,
  now: Date,
): number {
  if (isSameDay(now, lastUpdated)) return currentStreak || 0;
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  return isSameDay(yesterday, lastUpdated) ? (currentStreak || 0) + 1 : 1;
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
    if (roundedTime <= 0)
      return NextResponse.json({ message: "Invalid time spent", status: 400 });

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

    if (!user)
      return NextResponse.json({ message: "User not found", status: 404 });

    const now = new Date();
    const today = getUTC(now);

    const dayNames = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ] as const;
    const dayName = dayNames[today.getUTCDay()] as WeekDay;

    const monthNames = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ] as const;
    const monthEnum = monthNames[getMonth(today)] as Month;
    const year = getYear(today);

    await dbClient.$transaction(async (tx) => {
      await tx.activity.upsert({
        where: {
          userId_languageName: {
            userId: user.id,
            languageName: normalizedLang,
          },
        },
        update: {
          totalDuration: { increment: roundedTime },
          last24HoursDuration: { increment: roundedTime },
          last7DaysDuration: { increment: roundedTime },
          last30DaysDuration: { increment: roundedTime },
          shortLanguageName: shortLang,
          lastUpdated: now,
        },
        create: {
          userId: user.id,
          languageName: normalizedLang,
          shortLanguageName: shortLang,
          totalDuration: roundedTime,
          last24HoursDuration: roundedTime,
          last7DaysDuration: roundedTime,
          last30DaysDuration: roundedTime,
          lastUpdated: now,
        },
      });

      await tx.dailyActivity.upsert({
        where: { userId_date: { userId: user.id, date: today } },
        update: { duration: { increment: roundedTime } },
        create: {
          userId: user.id,
          weekDay: dayName,
          date: today,
          duration: roundedTime,
        },
      });

      const todayTotal = await tx.dailyActivity.aggregate({
        _sum: { duration: true },
        where: { userId: user.id, weekDay: dayName },
      });

      const totalToday = todayTotal._sum.duration || 0;

      await tx.weeklyActivity.upsert({
        where: {
          userId_weekDay: {
            userId: user.id,
            weekDay: dayName,
          },
        },
        update: { totalDuration: totalToday },
        create: {
          userId: user.id,
          weekDay: dayName,
          totalDuration: totalToday,
        },
      });

      const sevenDaysAgo = getUTC(subDays(today, 6));
      const last7Days = await tx.dailyActivity.aggregate({
        _sum: { duration: true },
        where: {
          userId: user.id,
          date: { gte: sevenDaysAgo, lte: today },
        },
      });

      const totalWeekDuration = last7Days._sum.duration || 0;

      await tx.weeklyActivity.upsert({
        where: {
          userId_weekDay: {
            userId: user.id,
            weekDay: "MONDAY",
          },
        },
        update: { totalDuration: totalWeekDuration },
        create: {
          userId: user.id,
          weekDay: "MONDAY",
          totalDuration: totalWeekDuration,
        },
      });

      const monthData = await tx.dailyActivity.aggregate({
        _sum: { duration: true },
        where: {
          userId: user.id,
          date: {
            gte: new Date(Date.UTC(year, getMonth(today), 1)),
            lte: today,
          },
        },
      });

      const totalMonthDuration = monthData._sum.duration || 0;

      await tx.monthlyActivity.upsert({
        where: {
          userId_month_year: {
            userId: user.id,
            month: monthEnum,
            year,
          },
        },
        update: { totalDuration: totalMonthDuration },
        create: {
          userId: user.id,
          month: monthEnum,
          year,
          totalDuration: totalMonthDuration,
        },
      });

      const activitiesAfter = await tx.activity.findMany({
        where: { userId: user.id },
      });

      const newAchievements = generateAchievements(user, activitiesAfter);
      const totalMinutes = activitiesAfter.reduce(
        (sum, a) => sum + (a.totalDuration || 0),
        0,
      );

      const computedPoints = Math.floor(totalMinutes / 10);
      const newStreak = calculateNewStreak(
        user.streak,
        user.streakUpdatedAt,
        now,
      );

      await tx.user.update({
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
