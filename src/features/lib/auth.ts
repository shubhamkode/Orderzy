import { User } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthProvider } from "./providers/AuthProvider";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signIn",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johnDoe@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const [email, password] = [credentials?.email, credentials?.password];
        if (!email || !password) {
          return null;
        }
        return await AuthProvider.LogIn({ email, password });
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = (token as any).id;
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },
  },
};
