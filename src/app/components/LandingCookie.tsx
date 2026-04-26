"use client";

import { useEffect } from "react";

export default function LandingCookie() {
  useEffect(() => {
    if (document.cookie.split("; ").some((c) => c.startsWith("fd_landed_at="))) return;
    document.cookie = `fd_landed_at=${Date.now()}; path=/; max-age=86400; samesite=lax`;
  }, []);
  return null;
}
