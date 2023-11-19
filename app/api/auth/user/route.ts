import prisma from "@/prisma/client";
import { ApiResponse, FormError } from "@/utils/shared";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import validator from "validator";

export interface RegisterResponse extends ApiResponse {
  formError?: FormError;
}

export async function POST(req: Request) {
  const salt = bcrypt.genSaltSync(12);
  let { email, password } = await req.json();
  const hashedPassword = bcrypt.hashSync(password, salt);
  const response: RegisterResponse = { ok: false };
  email = email.trim();

  if (!validator.isEmail(email)) {
    response.formError = { email: "" };

    if (email) {
      response.formError.email = "Please provide a valid email.";
    } else {
      response.formError.email = "Email is required and cannot be empty.";
    }
  }

  if (!password || password.trim() === "") {
    response.formError = {
      ...response.formError,
      password: "Password is required and cannot be empty.",
    };
  }

  if (response.formError) {
    return Response.json(response);
  }

  try {
    const user = await prisma.customer.create({
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
      response.formError = {
        unknown: "There was an error during registration. Please try again.",
      };
    }
    return Response.json(response);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        response.formError = { email: "The email address is already in use." };
      } else {
        response.formError = {
          unknown: "Sorry something went wrong. Please try again.",
        };
      }
    }

    return Response.json(response);
  } finally {
    //await prisma.$disconnect();
  }
}
