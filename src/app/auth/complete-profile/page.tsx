import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import ProfileForm from "./ProfileForm";

export const dynamic = "force-dynamic";

function makeServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => (await cookieStore).getAll(),
        setAll: async (toSet) => {
          const store = await cookieStore;
          for (const { name, value, options } of toSet) {
            store.set(name, value, options);
          }
        },
      },
    },
  );
}

export default async function CompleteProfilePage() {
  const supabase = makeServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/start");

  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (existing) redirect("/auth/callback");

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-grid text-white">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow-secondary" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="dragon-glow rounded-3xl mb-6">
              <Image
                src="/icon.png"
                alt="FocusDragon"
                width={72}
                height={72}
                className="rounded-2xl"
                priority
              />
            </div>
            <h1 className="text-4xl font-black tracking-tight leading-[1.1] mb-3">
              <span className="gradient-text dragon-glow-text">Name your dragon.</span>
            </h1>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Just a couple of details so your dragon greets you properly
              when you open the app.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-md p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <ProfileForm />
          </div>

          <p className="mt-10 text-center text-[10px] uppercase tracking-[0.18em] text-neutral-600">
            FocusDragon
          </p>
        </div>
      </div>
    </main>
  );
}
