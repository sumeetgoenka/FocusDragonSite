import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { AGE_RANGES, type AgeRange } from "@/lib/auth-contract";

type Body = {
  displayName?: unknown;
  ageRange?: unknown;
};

function bad(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

function makeUserClient() {
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

function makeServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export async function POST(req: Request) {
  const supabase = makeUserClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as Body;

  const displayNameRaw = typeof body.displayName === "string" ? body.displayName.trim() : "";
  if (displayNameRaw.length < 1 || displayNameRaw.length > 60) {
    return bad("display_name_invalid");
  }

  let ageRange: AgeRange | null = null;
  if (body.ageRange !== null && body.ageRange !== undefined) {
    if (typeof body.ageRange !== "string" || !(AGE_RANGES as readonly string[]).includes(body.ageRange)) {
      return bad("age_range_invalid");
    }
    ageRange = body.ageRange as AgeRange;
  }

  const admin = makeServiceClient();
  const { error } = await admin
    .from("profiles")
    .upsert(
      {
        id: user.id,
        display_name: displayNameRaw,
        age_range: ageRange,
      },
      { onConflict: "id" },
    );

  if (error) {
    console.error("complete-profile insert failed", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
