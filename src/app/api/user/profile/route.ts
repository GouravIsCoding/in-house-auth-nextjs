import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get("userId");
    return NextResponse.json({ userId });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
