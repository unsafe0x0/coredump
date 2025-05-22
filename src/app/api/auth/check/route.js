import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("authToken").value;
    if (token) {
      return NextResponse.json({ isLogged: true }, { status: 200 });
    } else {
      return NextResponse.json({ isLogged: false }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ isLogged: false }, { status: 200 });
  }
}
