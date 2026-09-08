"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  LogOut,
  Receipt,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/expenses", label: "Expenses", icon: Receipt },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const hasAccessToken =
    typeof window !== "undefined" &&
    Boolean(window.localStorage.getItem("barsonomy.accessToken"));

  useEffect(() => {
    if (!hasAccessToken) {
      router.replace("/login");
    }
  }, [hasAccessToken, router]);

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <Link href="/dashboard" className="brand">
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          <span>Bärsonomi</span>
        </Link>
     
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn("side-link", pathname === href && "active")}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="main-area">{children}</div>
    </div>
  );
}

export function AuthLogo() {
  return (
    <Link href="/" className="brand auth-brand">
      <span className="brand-mark">
        <Sparkles size={18} />
      </span>
      <span>Bärsonomi</span>
    </Link>
  );
}
