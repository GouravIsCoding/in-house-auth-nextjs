import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get("userId");
    if (!userId)
      return NextResponse.json({ authStatus: false }, { status: 403 });

    return NextResponse.json({ authStatus: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
