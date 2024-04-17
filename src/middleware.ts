import { NextRequest, NextResponse } from "next/server";

import CONFIG from "./config";
import * as jose from "jose";

interface userToken {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("access_token");
    if (!accessToken)
      return NextResponse.json(
        { message: "Not logged in!", accessTokenNeeded: true },
        { status: 403 }
      );
    const verified = await jose.jwtVerify<userToken>(
      accessToken.value,
      CONFIG.ACCESS_TOKEN
    );
    if (!verified)
      return NextResponse.json({ message: "Invalid Token" }, { status: 403 });

    return NextResponse.next({
      headers: {
        ...req.headers,
        userId: verified.payload?.id || "",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/user/profile"],
};
