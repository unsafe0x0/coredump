import { NextRequest, NextResponse } from "next/server";
import dbClient from "@/prisma/DbClient";
import bcryptjs from "bcryptjs";
import { generatePrivateKey } from "@/utils/GeneratePrivateKey";

export async function POST(request: NextRequest) {
  try {
    const { name, email, gitUsername, twitterUsername, password } =
      await request.json();

    if (!name || !email || !password || !gitUsername || !twitterUsername) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

    const normalisedEmail = email.toLowerCase();
    const normalisedGitUsername = gitUsername.toLowerCase();
    const normalisedTwitterUsername = twitterUsername.toLowerCase();

    const existingUser = await dbClient.user.findUnique({
      where: { email: normalisedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const githubResponse = await fetch(
      `https://api.github.com/users/${normalisedGitUsername}`
    );
    if (!githubResponse.ok) {
      return NextResponse.json(
        { message: "GitHub user not found" },
        { status: 404 }
      );
    }

    const githubData = await githubResponse.json();
    const profileImage: string = githubData.avatar_url;

    const hashedPassword = await bcryptjs.hash(password, 10);
    const privateKey = generatePrivateKey();

    await dbClient.user.create({
      data: {
        name,
        email: normalisedEmail,
        gitUsername: normalisedGitUsername,
        twitterUsername: normalisedTwitterUsername,
        profileImage,
        password: hashedPassword,
        privateKey,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
