import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import dbClient from "@/prisma/DbClient";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = session?.user?.id;

    const dashboardData = await dbClient.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        gitUsername: true,
        twitterUsername: true,
        profileImage: true,
        privateKey: true,
        streak: true,
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
      },
    });
    if (!dashboardData) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }
    return NextResponse.json({
      message: "User details fetched successfully",
      status: 200,
      data: dashboardData,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
