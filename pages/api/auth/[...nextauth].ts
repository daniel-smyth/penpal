import NextAuth, { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
// import Auth0Provider from 'next-auth/providers/auth0';
import AppleProvider from "next-auth/providers/apple";
import EmailProvider from "next-auth/providers/email";
import clientPromise from "@lib/database/mongodb";
import { userService } from "@lib/database/services";
import { IUser, User } from "@lib/database/models";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains
    */
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
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   issuer: process.env.AUTH0_ISSUER
    // })
  ],
  theme: {
    colorScheme: "light",
  },
  pages: {
    signIn:
      "/?showSignInModal=true&error=Use sign in method originally used to create account",
    error: "/?showSignInModal=true", // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: user as IUser,
      };
    },
  },
};

export default NextAuth(authOptions);
