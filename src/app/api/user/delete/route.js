import { NextResponse } from "next/server";
import databaseClient from "../../../../../prisma/db";
import getTokenData from "@/helpers/getTokenData";

export async function POST(req) {
  const { email } = getTokenData(req);

  try {
    await databaseClient.user.delete({
      where: {
        email,
      },
    });

    return NextResponse.json({
      message: "User deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
