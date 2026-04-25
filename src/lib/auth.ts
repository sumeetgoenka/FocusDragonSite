import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const ADMIN_EMAILS = new Set([
  "anay.goenka@yallo.co",
  "anaythetutor@gmail.com",
]);

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email?.toLowerCase();
      return !!email && ADMIN_EMAILS.has(email);
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
