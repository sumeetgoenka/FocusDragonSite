import { redirect } from "next/navigation";
import { APP_DEEPLINK } from "@/lib/auth-contract";
import DeepLinkLauncher from "../callback/DeepLinkLauncher";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface LaunchProps {
  searchParams: Promise<{ token_hash?: string | string[] }>;
}

function pick(v: string | string[] | undefined): string | null {
  if (Array.isArray(v)) return v[0] ?? null;
  return typeof v === "string" ? v : null;
}

/// Renders the deep-link launcher after the route handler has minted
/// a magic-link OTP for the app. Pure presentational page; no auth
/// logic lives here.
export default async function LaunchPage({ searchParams }: LaunchProps) {
  const params = await searchParams;
  const tokenHash = pick(params.token_hash);
  if (!tokenHash) redirect("/auth/start");

  const deepLink = `${APP_DEEPLINK}?token_hash=${encodeURIComponent(tokenHash)}`;
  return <DeepLinkLauncher deepLink={deepLink} code={tokenHash} />;
}
