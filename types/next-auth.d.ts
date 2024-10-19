import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;        
    githubId: string;   
    username: string;
    
  }

  interface Session {
    user: User; 
    accessToken: string;
  }
}