import { NextRequest, NextResponse } from "next/server";
import dbClient from "@/prisma/DbClient";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

interface RegisterBody {
  name: string;
  email: string;
  gitUsername: string;
  twitterUsername: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterBody = await request.json();
    let { name, email, gitUsername, twitterUsername, password } = body;

    if (!name || !email || !password || !gitUsername || !twitterUsername) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 },
      );
    }

    email = email.toLowerCase();
    gitUsername = gitUsername.toLowerCase();
    twitterUsername = twitterUsername.toLowerCase();

    const existingUser = await dbClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const githubResponse = await fetch(
      `https://api.github.com/users/${gitUsername}`,
    );
    if (!githubResponse.ok) {
      return NextResponse.json(
        { message: "GitHub user not found" },
        { status: 404 },
      );
    }

    const githubData = await githubResponse.json();
    const profileImage: string = githubData.avatar_url;

    const hashedPassword = await bcryptjs.hash(password, 10);
    const privateKey = crypto.randomBytes(32).toString("hex");

    const newUser = await dbClient.user.create({
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
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 },
    );
  }
}
