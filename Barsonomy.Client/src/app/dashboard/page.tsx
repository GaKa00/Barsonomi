import UserStatistics from "@/components/userstatistics";
import UserDashboard from "@/components/userdashboard";
import { AppShell } from "@/components/app-shell";
import { UserSettings } from "@/components/user-settings";

export default function DashboardPage() {
  return (
    <AppShell>
      <main className="content">
        <h1 className="eyebrow"> Bärsonomi</h1>
        <UserSettings />
        <UserStatistics />
        <UserDashboard />
      </main>
    </AppShell>
  );
}
