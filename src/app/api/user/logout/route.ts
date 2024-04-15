import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const res = NextResponse.json({ message: "Logged out!" });
    res.cookies.delete("refresh_token");
    res.cookies.delete("access_token");
    res.cookies.delete("auth_status");
    return res;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
