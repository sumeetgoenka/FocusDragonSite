export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface ErrorProps {
  searchParams: Promise<{ description?: string | string[] }>;
}

function pick(v: string | string[] | undefined): string | null {
  if (Array.isArray(v)) return v[0] ?? null;
  return typeof v === "string" ? v : null;
}

export default async function CallbackErrorPage({ searchParams }: ErrorProps) {
  const params = await searchParams;
  const description = pick(params.description) ?? "Something went wrong.";
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-[var(--background)] text-white">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-3">Sign-in failed</h1>
        <p className="text-sm text-[var(--muted)] mb-6">{description}</p>
        <a href="/auth/start" className="text-[var(--accent)] underline">Try again</a>
      </div>
    </main>
  );
}
