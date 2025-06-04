import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./mongodb";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        const client = await clientPromise;
        const user = await client.db().collection("users").findOne({ email });

        if (!user || !user.password)
          throw new Error("Invalid email or password");
        const isValid = await compare(password, user.password);
        if (!isValid) throw new Error("Invalid email or password");

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role || "user",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Store Google user if not already stored
      if (account.provider === "google") {
        const client = await clientPromise;
        const db = client.db();
        const users = db.collection("users");

        const existing = await users.findOne({ email: user.email });
        if (!existing) {
          await users.insertOne({
            email: user.email,
            name: user.name,
            role: "user",
            createdAt: new Date(),
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
