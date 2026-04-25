import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const ADMIN_EMAIL = "anay.goenka@yallo.co";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return profile?.email?.toLowerCase() === ADMIN_EMAIL;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
};
