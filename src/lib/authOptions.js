// lib/authOptions.js
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUserCollection } from "@/lib/dbCollections/getUserCollection";

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
        const users = await getUserCollection();
        const user = await users.findOne({ email });

        if (!user || !user.password)
          throw new Error("Invalid email or password");
        const isValid = await compare(password, user.password);
        if (!isValid) throw new Error("Invalid email or password");

        if (!user.verified) {
          throw new Error("Please verify your email before logging in");
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role || "user",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const users = await getUserCollection();
        const existing = await users.findOne({ email: user.email });
        if (!existing) {
          await users.insertOne({
            email: user.email,
            name: user.name,
            image: user.image,
            role: "user",
            verified: true, // Auto-verify Google users
            createdAt: new Date(),
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const users = await getUserCollection();
        const dbUser = await users.findOne({ email: token?.email });
        token.role = dbUser.role || "user";
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.image = token.image;
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
