import { NextResponse } from "next/server";
import dbClient from "@/prisma/DbClient";
import { isSameDay } from "date-fns";
import languageShortNames from "@/utils/LanguageShortNames";
import { generateAchievements } from "@/utils/GenerateAchievements";

interface RequestBody {
  privateKey: string;
  languageName: string;
  timeSpent: number;
}

interface Activity {
  id: string;
  userId: string;
  languageName: string;
  shortLanguageName: string;
  totalDuration: number;
  last24HoursDuration: number;
  last7DaysDuration: number;
  lastUpdated: Date;
}

interface User {
  id: string;
  name: string;
  privateKey: string;
  streak: number;
  streakUpdatedAt: Date;
}

const programmingLanguages = new Set(Object.keys(languageShortNames));

function getShortLanguageName(lang: string): string {
  return (
    languageShortNames[lang as keyof typeof languageShortNames] ||
    lang.toUpperCase()
  );
}

function calculateNewStreak(
  currentStreak: number,
  lastUpdated: Date,
  now: Date,
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

    const user = (await dbClient.user.findUnique({
      where: { privateKey },
      select: {
        id: true,
        name: true,
        achievements: true,
        totalPoints: true,
        streak: true,
        streakUpdatedAt: true,
      },
    })) as
      | (User & {
          achievements: string[];
          totalPoints: number;
        })
      | null;

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    const now = new Date();

    const activity = (await dbClient.activity.findFirst({
      where: {
        userId: user.id,
        languageName: normalizedLang,
      },
    })) as Activity | null;

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
      const activitiesAfter = (await dbClient.activity.findMany({
        where: { userId: user.id },
      })) as Activity[];

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

      await dbClient.user.update({
        where: { id: user.id },
        data: {
          streak: newStreak,
          streakUpdatedAt: now,
          totalPoints: computedPoints,
          ...(newAchievements.length > 0
            ? { achievements: { push: newAchievements.map((a) => a.id) } }
            : {}),
        },
      });

      return NextResponse.json({ message: "Activity created", status: 200 });
    }

    const newLast24 = activity.last24HoursDuration + roundedTime;
    const newLast7 = activity.last7DaysDuration + roundedTime;

    await dbClient.activity.update({
      where: { id: activity.id },
      data: {
        totalDuration: activity.totalDuration + roundedTime,
        last24HoursDuration: newLast24,
        last7DaysDuration: newLast7,
        lastUpdated: now,
        shortLanguageName: shortLang,
      },
    });

    const newStreak = calculateNewStreak(
      user.streak,
      user.streakUpdatedAt,
      now,
    );

    const activitiesAfter = (await dbClient.activity.findMany({
      where: { userId: user.id },
    })) as Activity[];

    const newAchievements = generateAchievements(user, activitiesAfter);
    const totalMinutes = activitiesAfter.reduce(
      (sum, a) => sum + (a.totalDuration || 0),
      0,
    );
    const computedPoints = Math.floor(totalMinutes / 10);

    await dbClient.user.update({
      where: { id: user.id },
      data: {
        streak: newStreak,
        streakUpdatedAt: now,
        totalPoints: computedPoints,
        ...(newAchievements.length > 0
          ? { achievements: { push: newAchievements.map((a) => a.id) } }
          : {}),
      },
    });

    return NextResponse.json({
      message: `Activity updated ${user.name} ${normalizedLang}: +${roundedTime}m`,
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
