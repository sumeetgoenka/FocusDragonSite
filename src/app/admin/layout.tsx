import Link from "next/link";
import SessionWrapper from "./SessionWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <SessionWrapper>
      <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 antialiased">
        {/* Ambient gradient backdrop */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(1200px 600px at 80% -10%, rgba(249,115,22,0.10), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(99,102,241,0.08), transparent 55%)",
          }}
        />

        <header className="relative z-10 border-b border-white/5 backdrop-blur-md bg-black/30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/admin" className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-900/30 text-sm">
                  🐉
                </span>
                <span className="font-semibold tracking-tight">
                  FocusDragon{" "}
                  <span className="text-zinc-500 font-normal">/ Admin</span>
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {session?.user?.email && (
                <span className="text-xs text-zinc-400 hidden sm:inline">
                  {session.user.email}
                </span>
              )}
              <Link
                href="/admin/login"
                className="text-xs text-zinc-500 hover:text-zinc-200 transition"
              >
                Sign out
              </Link>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
          {children}
        </main>
      </div>
    </SessionWrapper>
  );
}
