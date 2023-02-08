import NextAuth, { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
// import AppleProvider from "next-auth/providers/apple";
import EmailProvider from "next-auth/providers/email";
import mongoPromise from "@lib/database/mongodb";
import { IUser } from "@lib/database/models";
import { emailService } from "@lib/email";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(mongoPromise),
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
        user: user as IUser,
      };
    },
  },
};

export default NextAuth(authOptions);
