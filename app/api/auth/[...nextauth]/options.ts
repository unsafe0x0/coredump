import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import { generatePrivateKey } from "@/utils/GeneratePrivateKey";
import dbClient from "@/prisma/DbClient";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        const user = await dbClient.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("No user found");

        const isPasswordValid = await bcryptjs.compare(
          credentials.password,
          user.password as string
        );

        if (!isPasswordValid) throw new Error("Invalid password");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          gitUsername: user.gitUsername,
          twitterUsername: user.twitterUsername,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const googleId = profile?.sub || user.id;

        const dbUser = await dbClient.user.findUnique({
          where: { googleId },
        });

        if (!dbUser) {
          const privateKey = generatePrivateKey();

          await dbClient.user.create({
            data: {
              email: user.email!,
              name: user.name || "",
              profileImage:
                user.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              gitUsername: "unknown",
              twitterUsername: "unknown",
              privateKey,
              googleId,
            },
          });
        }

        return true;
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        const dbUser = await dbClient.user.findUnique({
          where: { email: token.email as string },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.profileImage = dbUser.profileImage;
          token.gitUsername = dbUser.gitUsername;
          token.twitterUsername = dbUser.twitterUsername;
          token.googleId = dbUser.googleId;
        }
      }

      if (user && account?.provider === "credentials") {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.profileImage = user.profileImage;
        token.gitUsername = (user as any).gitUsername;
        token.twitterUsername = (user as any).twitterUsername;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.profileImage = token.profileImage;
        session.user.gitUsername = token.gitUsername;
        session.user.twitterUsername = token.twitterUsername;
        session.user.googleId = token.googleId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
