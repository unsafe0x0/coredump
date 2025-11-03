import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbClient from "@/prisma/DbClient";
import bcrypt from "bcryptjs";

interface UpdateBody {
  name?: string;
  gitUsername?: string;
  twitterUsername?: string;
  website?: string;
  password?: string;
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body: UpdateBody = await req.json();
    const { name, gitUsername, twitterUsername, website, password } = body;

    const updates: any = {};
    if (name) updates.name = name;
    if (gitUsername) {
      const githubUsername = gitUsername.toLowerCase();
      const githubProfile = await fetch(
        `https://api.github.com/users/${githubUsername}`,
      );
      if (!githubProfile.ok) {
        return NextResponse.json(
          { message: "GitHub user not found" },
          { status: 404 },
        );
      }

      const githubData = await githubProfile.json();
      updates.gitUsername = githubUsername;
      updates.profileImage = githubData.avatar_url;
    }

    if (website) {
      updates.website = website;
    }

    if (twitterUsername) {
      updates.twitterUsername = twitterUsername.toLowerCase();
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    await dbClient.user.update({
      where: { id: session.user.id },
      data: updates,
    });

    return NextResponse.json(
      {
        message: "User updated successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Username or email already exists" },
        { status: 409 },
      );
    }

    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
