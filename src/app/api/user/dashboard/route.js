import { NextResponse } from "next/server";
import databaseClient from "../../../../../prisma/db";
import getTokenData from "@/helpers/getTokenData";

export async function GET(req) {
  let email;

  try {
    const tokenData = getTokenData(req);
    email = tokenData.email;

    if (!email) {
      return NextResponse.json({
        message: "Unauthorized: Invalid or missing token",
        status: 401,
      });
    }

    const userDetails = await databaseClient.user.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
        email: true,
        gitUsername: true,
        twitterUsername: true,
        profileImage: true,
        privateKey: true,
        streak: true,
        createdAt: true,
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

    if (!userDetails) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "User details fetched successfully",
      status: 200,
      data: userDetails,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
