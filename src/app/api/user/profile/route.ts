import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get("userId");
    if (!userId)
      return NextResponse.json({ message: "No user Found" }, { status: 403 });
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user)
      return NextResponse.json({ message: "No user Found" }, { status: 403 });
    return NextResponse.json({
      message: "Profile fetching successful",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        id: user.id,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
