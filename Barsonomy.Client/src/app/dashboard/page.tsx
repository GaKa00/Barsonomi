
import UserStatistics from "@/components/userstatistics";
import UserDashboard from "@/components/userdashboard";
import { AppShell } from "@/components/app-shell";


export default function DashboardPage() {
  return (
    <AppShell>

      <main className="content">
        <UserStatistics />
       <UserDashboard />
      </main>
    </AppShell>
  );
}
