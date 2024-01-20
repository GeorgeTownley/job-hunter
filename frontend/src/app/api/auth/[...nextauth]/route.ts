import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const GITHUB_ID = process.env.GITHUB_ID!;
const GITHUB_SECRET = process.env.GITHUB_SECRET!;

// Define the structure of your user object
interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

interface Credentials {
  username: string;
  password: string;
}

// Open a connection to your SQLite database
const dbPromise = open({
  filename: "../backend/jobTrackerDB.sqlite",
  driver: sqlite3.Database,
});

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: Credentials) => {
        const db = await dbPromise;
        const user: User | null = await db.get(
          "SELECT * FROM users WHERE username = ?",
          credentials?.username
        );

        if (
          user &&
          credentials?.password &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return { id: user.id, name: user.username, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

export default NextAuth(authOptions);
