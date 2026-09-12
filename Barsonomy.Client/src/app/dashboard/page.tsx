"use client";

import { useState } from "react";
import UserStatistics from "@/components/userstatistics";
import UserDashboard from "@/components/userdashboard";
import { AppShell } from "@/components/app-shell";
import { UserSettings } from "@/components/user-settings";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <AppShell>
      <main className="content">
        <h1 className="eyebrow"> Bärsonomi</h1>
        <UserSettings onUpdated={() => setRefreshKey((key) => key + 1)} />
        <UserStatistics refreshKey={refreshKey} />
        <UserDashboard refreshKey={refreshKey} />
      </main>
    </AppShell>
  );
}
