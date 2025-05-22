import { NextResponse } from "next/server";
import databaseClient from "../../../../../prisma/db";
import getTokenData from "@/helpers/getTokenData";

export async function POST(req) {
  const { email: userEmail } = getTokenData(req);

  const { name, email, gitUsername, twitterUsername, password } =
    await req.json();

  if (!email || !password || !gitUsername || !name || !twitterUsername) {
    return NextResponse.json({
      message: "Please fill all fields",
      status: 400,
    });
  }

  try {
    const updatedData = {
      name,
      email,
      gitUsername,
      twitterUsername,
    };

    if (password) {
      updatedData.password = password;
    }

    await databaseClient.user.update({
      where: {
        email: userEmail,
      },
      data: {
        ...updatedData,
      },
    });

    return NextResponse.json({
      message: "User updated successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
