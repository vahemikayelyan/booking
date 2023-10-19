"use server";
import prisma from "@/app/db/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async (email: string, password: string) => {
  const passwordHash = bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: { email, password: passwordHash },
  });

  console.log(user);

  return "done";
};
