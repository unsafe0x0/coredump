import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );

    res.cookies.set("authToken", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Error while logging out" },
      { status: 500 },
    );
  }
}
