import Link from "next/link";
import SessionWrapper from "./SessionWrapper";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="font-semibold">FocusDragon Admin</Link>
          <Link href="/admin/login" className="text-xs opacity-50 hover:opacity-100">sign out</Link>
        </header>
        <main className="px-6 py-8 max-w-6xl mx-auto">{children}</main>
      </div>
    </SessionWrapper>
  );
}
