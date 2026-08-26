"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  return (
    <div className="app-frame">
      <aside className="sidebar">
        <Link href="/dashboard" className="brand">
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          <span>barsonomy</span>
        </Link>
        <div className="workspace-label">
          Workspace <span>PERSONAL</span>
        </div>
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
        <div className="sidebar-bottom">
          <Link href="#" className="side-link">
            <Settings size={18} />
            Settings
          </Link>
          <div className="profile">
            <div className="avatar">JD</div>
            <div>
              <strong>Jamie Davis</strong>
              <small>Free plan</small>
            </div>
            <LogOut size={16} className="profile-logout" />
          </div>
        </div>
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
      <span>barsonomy</span>
    </Link>
  );
}
