import { NextResponse } from "next/server";
import dbClient from "@/prisma/DbClient";
import { isSameDay, isSameWeek, isSameMonth } from "date-fns";

export async function GET(req: Request) {
  const RESET_KEY = process.env.RESET_KEY;

  if (!RESET_KEY) {
    console.error("RESET_KEY not set in environment");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key || key !== RESET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();

    const latestUpdateResult = await dbClient.activity.findFirst({
      orderBy: { lastUpdated: "desc" },
      select: { lastUpdated: true },
    });

    const latestUpdate = latestUpdateResult?.lastUpdated || new Date(0);

    const isNewDay = !isSameDay(now, latestUpdate);
    const isNewWeek = !isSameWeek(now, latestUpdate, { weekStartsOn: 1 });
    const isNewMonth = !isSameMonth(now, latestUpdate);

    if (isNewDay) {
      await dbClient.activity.updateMany({
        data: { last24HoursDuration: 0, lastUpdated: now },
      });
      console.log("Reset last24HoursDuration for all activities");
    } else {
      console.log("No reset needed for last24HoursDuration");
    }

    if (isNewWeek) {
      await dbClient.activity.updateMany({
        data: { last7DaysDuration: 0, lastUpdated: now },
      });
      console.log("Reset last7DaysDuration for all activities");
    } else {
      console.log("No reset needed for last7DaysDuration");
    }

    if (isNewMonth) {
      await dbClient.activity.updateMany({
        data: { last30DaysDuration: 0, lastUpdated: now },
      });
      console.log("Reset last30DaysDuration for all activities");
    }

    return NextResponse.json({ message: "Reset completed" });
  } catch (error) {
    console.error("Reset error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
