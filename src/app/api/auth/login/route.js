import { NextResponse } from "next/server";
import databaseClient from "../../../../../prisma/db";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
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

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const res = NextResponse.json({
      message: "Login successful",
      token,
      status: 200,
    });

    res.cookies.set("authToken", token, {
      httpOnly: true,
      maxAge: 3600 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
