import prisma from "@/prisma/client";
import { AppResponse, FormError } from "@/utils/shared";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export interface RegisterResponse extends AppResponse {
  formError?: FormError;
}

export async function POST(req: Request) {
  const salt = bcrypt.genSaltSync(12);
  const { email, password } = await req.json();
  const hashedPassword = bcrypt.hashSync(password, salt);
  const response: RegisterResponse = { ok: false };

  if (!email || email.trim() === "") {
    response.formError = { email: "Email is required and cannot be empty." };
  }

  if (!password || password.trim() === "") {
    if (!response.formError) {
      response.formError = {};
    }
    response.formError.password = "Password is required and cannot be empty.";
  }

  if (response.formError) {
    return Response.json(response);
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
      select: { id: true },
    });

    if (user) {
      response.ok = true;
      response.message = "User successfully registered.";
    } else {
      response.error =
        "There was an error during registration. Please try again.";
    }
    return Response.json(response);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        response.formError = { email: "The email address is already in use." };
      }
    }
    if (!response.formError) {
      response.error = "Sorry something went wrong. Please try again.";
    }

    return Response.json(response);
  } finally {
    await prisma.$disconnect();
  }
}
