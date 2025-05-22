import { NextResponse } from "next/server";
import databaseClient from "../../../../../prisma/db";

export async function POST(req) {
  const { gitUsername } = await req.json();

  if (!gitUsername) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });
  }

  try {
    const userDetails = await databaseClient.user.findUnique({
      where: {
        gitUsername,
      },
      select: {
        name: true,
        profileImage: true,
        gitUsername: true,
        activities: true,
      },
    });

    return NextResponse.json({
      message: "User details fetched successfully",
      status: 200,
      data: userDetails,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
