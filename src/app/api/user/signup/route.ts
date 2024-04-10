import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { hashPassword } from "@/utils/bcrypt";
import { sendMail } from "@/utils/mailer";
import { signupSchema } from "@/utils/validators";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstname, lastname } = await req.json();

    signupSchema.parse({ email, password, firstname, lastname });

    const hashedPassword = await hashPassword(password);

    const uuid = crypto.randomUUID();

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        verification_token: uuid,
        verification_expiry: new Date(Date.now() + 3600 * 1000),
      },
    });

    const sentMail = await sendMail(user.email, uuid);

    console.log(sentMail.messageId);

    return NextResponse.json({
      email,
      firstname,
      lastname,
      message: "Email sent to your email for verification",
    });
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
