import NextAuth, { NextAuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import EmailProvider from "next-auth/providers/email";
// import AppleProvider from "next-auth/providers/apple";

import { prisma } from "@lib/prisma";
import { emailService } from "@lib/email";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    EmailProvider({
      server: {
        service: process.env.EMAIL_SERVICE!,
        host: process.env.EMAIL_HOST!,
        auth: {
          user: process.env.EMAIL_USERNAME!,
          pass: process.env.EMAIL_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({ identifier, url }) {
        emailService.sendVerificationRequest({ identifier, url });
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in", // Error code passed in query string as ?error=
  },
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: user as User,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
