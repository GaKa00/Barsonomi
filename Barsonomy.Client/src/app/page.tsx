"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const destination = window.localStorage.getItem("barsonomy.accessToken")
      ? "/dashboard"
      : "/login";

    router.replace(destination);
  }, [router]);

  return null;
}
