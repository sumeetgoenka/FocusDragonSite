import { cookies } from "next/headers";
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
    <div className="min-h-screen bg-grid flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[var(--card-border)] bg-black/40 backdrop-blur p-8">
        <h1 className="text-3xl font-black tracking-tight mb-2">Almost there.</h1>
        <p className="text-neutral-400 mb-8 text-sm">
          We just need a couple of details before you start using FocusDragon.
        </p>
        <ProfileForm />
      </div>
    </div>
  );
}
