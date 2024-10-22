import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    githubId: string;
    username: string;
    avatar: string;   // Add avatar field
  }

  interface Session {
    user: User;  // Extend session user to include custom fields
    accessToken: string;
  }

  interface JWT {
    accessToken: string; // Ensure that the JWT also includes accessToken
    sub: string;  // The GitHub ID (githubId) from your callback
  }
}
