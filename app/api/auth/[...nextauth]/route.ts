import prisma from "@/prisma/client";
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
  callbacks: {
    async session(params) {
      if (params.session.user) {
        params.session.user.email = params.token.email;
      }

      return params.session;
    },
    async jwt(params) {
      if (params.user) {
        params.token.email = params.user.email;
      }

      return params.token;
    },
  },
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
