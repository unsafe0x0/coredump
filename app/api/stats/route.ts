import { NextResponse } from "next/server";
import dbClient from "@/prisma/DbClient";
import { formatMinutesAsHrMin } from "@/utils/ActivityMetrics";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    );
  }

  try {
    const user = await dbClient.user.findUnique({
      where: { gitUsername: username },
      select: {
        activities: {
          select: {
            last7DaysDuration: true,
            last24HoursDuration: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        },
      );
    }

    const weekTotal = user.activities.reduce(
      (sum, activity) => sum + (activity.last7DaysDuration || 0),
      0,
    );
    const todayTotal = user.activities.reduce(
      (sum, activity) => sum + (activity.last24HoursDuration || 0),
      0,
    );

    return NextResponse.json(
      {
        username,
        weekTotal: formatMinutesAsHrMin(weekTotal),
        todayTotal: formatMinutesAsHrMin(todayTotal),
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching public stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    );
  }
}
