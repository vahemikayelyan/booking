import prisma from "@/app/db/prisma";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: { email: { type: "text" }, password: { type: "text" } },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          return null;
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt(params: any) {
      //console.log(params);
      return params;
    },
  },
});

export { handler as GET, handler as POST };
