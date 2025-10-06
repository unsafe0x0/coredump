import dbClient from "@/prisma/DbClient";
import { NextResponse } from "next/server";
import { generateSVG } from "@/utils/GenerateSvg";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const format = searchParams.get("format");

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const user = await dbClient.user.findUnique({
      where: { gitUsername: String(username) },
      select: {
        activities: {
          select: {
            languageName: true,
            totalDuration: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const totalTime = user.activities.reduce(
      (acc, activity) => acc + (activity.totalDuration || 0),
      0
    );

    const languageStats: Record<string, number> = {};
    for (const activity of user.activities) {
      const lang = activity.languageName || "Unknown";
      languageStats[lang] =
        (languageStats[lang] || 0) + (activity.totalDuration || 0);
    }

    if (format === "svg") {
      const svg = generateSVG(totalTime, languageStats);
      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
      });
    }

    return NextResponse.json({
      totalTime,
      languages: Object.entries(languageStats).map(([language, time]) => ({
        language,
        time,
      })),
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
