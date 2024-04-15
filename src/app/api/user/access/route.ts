import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { comparePasswords } from "@/utils/bcrypt";
import { signinSchema } from "@/utils/validators";
import { ZodError } from "zod";
import CONFIG from "@/config";

import * as jose from "jose";

interface userToken {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}
export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refresh_token");
    if (!refreshToken)
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    const verified = await jose.jwtVerify<userToken>(
      refreshToken.value,
      CONFIG.REFRESH_TOKEN
    );
    const user = await prisma.user.findFirst({
      where: {
        id: verified.payload.id,
      },
    });
    if (!user)
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });

    if (
      user?.refresh_token_expiry &&
      new Date(user.refresh_token_expiry) < new Date(Date.now())
    ) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refresh_token: null,
          refresh_token_expiry: null,
        },
      });
      const res = NextResponse.json({
        message: "session expired!Login again!",
      });
      res.cookies.delete("refresh_token");
      res.cookies.delete("access_token");
      res.cookies.delete("auth_status");
      return res;
    }
    const jwtPayload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
    const accessToken = await new jose.SignJWT(jwtPayload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(CONFIG.ACCESS_TOKEN);

    const fifteenMinutes = 1000 * 60 * 15; //15 minutes

    const res = NextResponse.json({ message: "access token provided!" });
    res.cookies.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      sameSite: "lax",
      expires: Date.now() + fifteenMinutes,
    });
    return res;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
