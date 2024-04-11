import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(req: NextRequest) {
  try {
    const { verifyToken } = await req.json();
    const user = await prisma.user.findFirst({
      where: {
        verification_token: verifyToken,
        verification_expiry: {
          gte: new Date(),
        },
      },
    });
    if (!user)
      return NextResponse.json(
        {
          message:
            "invalid or expired verificaiton token or You have already verified",
        },
        { status: 400 }
      );
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        is_verified: true,
        verification_expiry: null,
        verification_token: null,
      },
    });
    return NextResponse.json({ message: "verification successful" });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
