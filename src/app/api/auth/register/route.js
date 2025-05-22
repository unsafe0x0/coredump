import { NextResponse } from "next/server";
import databaseClient from "../../../../../prisma/db";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

export async function POST(req) {
  let { name, email, gitUsername, twitterUsername, password } =
    await req.json();

  if (!name || !email || !password || !gitUsername || !twitterUsername) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 },
    );
  }

  try {
    const user = await databaseClient.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const usernameExists = await databaseClient.user.findUnique({
      where: {
        gitUsername,
      },
    });

    if (usernameExists) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 },
      );
    }

    email = email.toLowerCase();
    gitUsername = gitUsername.toLowerCase();
    twitterUsername = twitterUsername.toLowerCase();

    const hashedPassword = await bcryptjs.hash(password, 10);
    const privateKey = crypto.randomBytes(32).toString("hex");

    const githubProfile = await fetch(
      `https://api.github.com/users/${gitUsername}`,
    );

    if (!githubProfile.ok) {
      return NextResponse.json(
        { message: "GitHub user not found" },
        { status: 404 },
      );
    }

    const githubData = await githubProfile.json();
    const profileImage = githubData.avatar_url;

    await databaseClient.user.create({
      data: {
        name,
        email,
        gitUsername,
        twitterUsername,
        profileImage,
        password: hashedPassword,
        privateKey,
      },
    });

    return NextResponse.json(
      { message: "User signup successful" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
