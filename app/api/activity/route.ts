import { NextResponse } from "next/server";
import dbClient from "@/prisma/DbClient";
import { isSameDay, isSameWeek } from "date-fns";
import languageShortNames from "@/utils/LanguageShortNames";
import {
  generateAchievements,
  countAchievementsPoints,
} from "@/utils/AchievementsData";

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
    })) as User | null;

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    const now = new Date();

    const allActivities = (await dbClient.activity.findMany({
      where: {
        userId: user.id,
      },
    })) as Activity[];

    const latestUpdate = allActivities.reduce((latest, activity) => {
      return activity.lastUpdated > latest ? activity.lastUpdated : latest;
    }, new Date(0));

    const isNewDay = !isSameDay(now, latestUpdate);
    const isNewWeek = !isSameWeek(now, latestUpdate, { weekStartsOn: 1 });

    if (isNewDay) {
      await dbClient.activity.updateMany({
        where: { userId: user.id },
        data: { last24HoursDuration: 0, lastUpdated: now },
      });
    }

    if (isNewWeek) {
      await dbClient.activity.updateMany({
        where: { userId: user.id },
        data: { last7DaysDuration: 0, lastUpdated: now },
      });
    }

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
        },
      });

      return NextResponse.json({ message: "Activity created", status: 200 });
    }

    const newAchievements = generateAchievements(user, allActivities);
    const points = countAchievementsPoints(newAchievements);

    if (newAchievements.length > 0) {
      await dbClient.user.update({
        where: { id: user.id },
        data: {
          totalPoints: points,
          achievements: {
            push: newAchievements.map((a) => a.id),
          },
        },
      });
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
      now
    );

    await dbClient.user.update({
      where: { id: user.id },
      data: {
        streak: newStreak,
        streakUpdatedAt: now,
      },
    });

    return NextResponse.json({ message: "Activity updated", status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
