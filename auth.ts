import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: { params: { scope: "repo" } },

      profile: (profile) => {
        console.log("Profile is:", profile);
        return {
          id: profile.id,
          username: profile.login,
          githubId: profile.id,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await prisma.user.upsert({
          where: { githubId: String(user.githubId) },
          update: { username: user.username },
          create: { githubId: String(user.githubId), username: user.username },
        });
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      try {
        if (account) {
          token.accessToken = account.access_token;
          token.sub = user?.githubId;
        }
        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        return token;
      }
    },

    async session({ session, token }) {
      try {
        if (token.sub && token.accessToken) {
          session.user.id = token.sub;
          session.accessToken = token.accessToken as string;
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
