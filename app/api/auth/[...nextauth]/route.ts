import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: { strategy: "jwt", updateAge: 10 },
  providers: [
    CredentialsProvider({
      credentials: { email: {}, password: {} },
      async authorize(credentials, req) {
        return {
          email: credentials?.email,
          id: credentials?.password!,
          name: "Vahe. M.",
        };
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async signIn() {
      return true;
    },
  },
});

export { handler as GET, handler as POST };
