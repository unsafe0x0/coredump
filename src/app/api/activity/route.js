import { NextResponse } from "next/server";
import databaseClient from "../../../../prisma/db";
import { isSameDay, isSameWeek } from "date-fns";
import languageShortNames from "@/lib/languageShortNames";

const programmingLanguages = new Set(Object.keys(languageShortNames));

function getShortLanguageName(lang) {
  return languageShortNames[lang] || lang.toUpperCase();
}

function calculateNewStreak(currentStreak, lastUpdated, now) {
  const sameDay = isSameDay(now, lastUpdated);
  if (sameDay) return currentStreak || 0;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(yesterday, lastUpdated)) {
    return (currentStreak || 0) + 1;
  }

  return 1;
}

export async function POST(req) {
  try {
    const body = await req.json();
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
    const roundedTime = Math.round(timeSpent * 60) / 60;

    if (roundedTime <= 0) {
      return NextResponse.json({ message: "Insufficient time", status: 400 });
    }

    const user = await databaseClient.user.findUnique({
      where: { privateKey },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    const now = new Date();

    const allActivities = await databaseClient.activity.findMany({
      where: {
        userId: user.id,
      },
    });

    const latestUpdate = allActivities.reduce((latest, activity) => {
      return activity.lastUpdated > latest ? activity.lastUpdated : latest;
    }, new Date(0));

    const isNewDay = !isSameDay(now, latestUpdate);
    const isNewWeek = !isSameWeek(now, latestUpdate, { weekStartsOn: 1 });

    if (isNewDay) {
      await databaseClient.activity.updateMany({
        where: { userId: user.id },
        data: { last24HoursDuration: 0, lastUpdated: now },
      });
    }

    if (isNewWeek) {
      await databaseClient.activity.updateMany({
        where: { userId: user.id },
        data: { last7DaysDuration: 0, lastUpdated: now },
      });
    }

    let activity = await databaseClient.activity.findFirst({
      where: {
        userId: user.id,
        languageName: normalizedLang,
      },
    });

    if (!activity) {
      await databaseClient.activity.create({
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
        now,
      );

      await databaseClient.user.update({
        where: { id: user.id },
        data: {
          streak: newStreak,
          streakUpdatedAt: now,
        },
      });

      return NextResponse.json({ message: "Activity created", status: 200 });
    }

    const newLast24 = activity.last24HoursDuration + roundedTime;
    const newLast7 = activity.last7DaysDuration + roundedTime;

    await databaseClient.activity.update({
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

    await databaseClient.user.update({
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
