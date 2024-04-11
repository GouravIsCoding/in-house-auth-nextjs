import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { comparePasswords } from "@/utils/bcrypt";
import { signinSchema } from "@/utils/validators";
import { ZodError } from "zod";
import CONFIG from "@/config";

import * as jose from "jose";

const thirtyDay = 24 * 60 * 60 * 1000 * 30;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    signinSchema.parse({ email, password });

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );

    if (!user?.is_verified) {
      return NextResponse.json(
        {
          message:
            "User not verified. Please visit your email and click on verify",
        },
        { status: 400 }
      );
    }
    const passwordCorrect = await comparePasswords(password, user.password);

    if (!passwordCorrect)
      return NextResponse.json(
        { message: "User email or password incorrect" },
        { status: 400 }
      );
    const jwtPayload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
    const accessToken = await new jose.SignJWT(jwtPayload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(CONFIG.ACCESS_TOKEN);
    console.log(accessToken, "here");
    const fifteenMinutes = 1000 * 60 * 15; //15 minutes

    const res = NextResponse.json({ message: "user login successful!" });
    res.cookies.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      sameSite: "lax",
      expires: Date.now() + fifteenMinutes,
    });
    if (
      user.refresh_token &&
      user.refresh_token_expiry &&
      new Date(user.refresh_token_expiry) > new Date()
    ) {
      res.cookies.set({
        name: "refresh_token",
        value: user.refresh_token,
        httpOnly: true,
        sameSite: "strict",
        expires: user.refresh_token_expiry,
      });

      return res;
    }

    const jwtRefreshToken = await new jose.SignJWT(jwtPayload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(CONFIG.REFRESH_TOKEN);
    const refreshTokenexpiry = Date.now() + thirtyDay;

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        refresh_token: jwtRefreshToken,
        refresh_token_expiry: new Date(refreshTokenexpiry),
      },
    });

    res.cookies.set({
      name: "refresh_token",
      value: jwtRefreshToken,
      httpOnly: true,
      sameSite: "strict",
      expires: refreshTokenexpiry,
    });

    return res;
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message },
        { status: 500 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
