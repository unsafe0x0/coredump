import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    googleId?: string;
    name: string;
    email: string;
    profileImage?: string;
    gitUsername?: string;
    twitterUsername?: string;
  }

  interface Session {
    user: {
      id: string;
      googleId?: string;
      name: string;
      email: string;
      profileImage?: string;
      gitUsername?: string;
      twitterUsername?: string;
    } & DefaultSession["user"];
  }
}
