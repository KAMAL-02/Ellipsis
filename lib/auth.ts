import NextAuth, { NextAuthOptions } from "next-auth";
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
          avatar: profile.avatar_url,
          bio: profile.bio,
          followers: profile.followers,
          following: profile.following,
          repos: profile.repos,
          createdAt: profile.created_at,
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

        if (user) {
          token.avatar = user.avatar; 
          token.username = user.username; 
          token.bio = user.bio;        
          token.followers = user.followers; 
          token.following = user.following; 
          token.repos = user.repos;
          token.createdAt = user.createdAt;
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

        session.user.avatar = token.avatar as string;  
        session.user.username = token.username as string;
        session.user.bio = token.bio as string;             
        session.user.followers = token.followers as number;   
        session.user.following = token.following as number;   
        session.user.repos = token.repos as number;
        session.user.createdAt = token.createdAt as string

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
  pages:{
    signIn: '/auth/signin',
  }
};

// Export NextAuth
export default NextAuth(authOptions);
