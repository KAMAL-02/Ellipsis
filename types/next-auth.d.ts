import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    githubId: string;
    username: string;
    avatar: string;
    followers: number;
    bio: string;
    following: number;
    repos: number;
    createdAt: string;
  }

  interface Session {
    user: User;
    accessToken: string;
  }

  interface JWT {
    accessToken: string;
    sub: string;  
  }
}
