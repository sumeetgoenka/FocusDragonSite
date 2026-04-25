"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");

  useEffect(() => {
    const email = session?.user?.email?.toLowerCase();
    if (status === "authenticated" && (email === "anay.goenka@yallo.co" || email === "anaythetutor@gmail.com")) {
      router.replace("/admin");
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-[var(--fg)]">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
        <h1 className="text-xl font-semibold text-center">FocusDragon Admin</h1>
        <p className="text-sm opacity-70 text-center">
          Sign in with the admin Google account.
        </p>
        {error === "AccessDenied" && (
          <div className="text-sm rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-300">
            That account isn&apos;t allowed.
          </div>
        )}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="w-full rounded-lg bg-white text-black px-4 py-2.5 font-medium hover:bg-white/90"
        >
          Continue with Google
        </button>
        {status === "authenticated" && (
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full text-xs opacity-60 hover:opacity-100"
          >
            Sign out
          </button>
        )}
      </div>
    </div>
  );
}
