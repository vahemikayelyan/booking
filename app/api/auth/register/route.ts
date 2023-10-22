import prisma from "@/app/db/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const salt = bcrypt.genSaltSync(12);
  const { email, password } = await req.json();
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
      select: { id: true },
    });

    if (user) {
      return Response.json({
        message: "User successfully registered.",
        ok: true,
      });
    } else {
      return Response.json({
        message: "There was an error during registration. Please try again.",
      });
    }
  } catch (e) {
    let message: string = "Sorry something went wrong. Please try again.";

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        message = "The email address is already in use.";
      }
    }

    return Response.json({ message, ok: false });
  } finally {
    await prisma.$disconnect();
  }
}
