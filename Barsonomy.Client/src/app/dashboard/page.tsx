import Link from "next/link";
import {
  ArrowUpRight,
  CreditCard,
  Plus,
  Receipt,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recent = [
  ["Whole Foods Market", "Groceries", "-$86.42", "Today"],
  ["The Corner Coffee", "Dining", "-$5.80", "Yesterday"],
  ["Spotify", "Entertainment", "-$10.99", "Aug 22"],
  ["Shell Station", "Transport", "-$42.00", "Aug 21"],
];

export default function DashboardPage() {
  return (
    <AppShell>
      <header className="topbar">
        <div>
          <p className="eyebrow">Tuesday, August 26, 2026</p>
          <h1>
            Good morning, Jamie <span className="wave">✦</span>
          </h1>
        </div>
        <Button asChild>
          <Link href="/expenses">
            <Plus size={17} /> Add expense
          </Link>
        </Button>
      </header>
      <main className="content">
        <section className="stat-grid">
          <Card className="balance-card">
            <CardContent>
              <div className="stat-label">
                <Wallet size={18} /> Total balance
              </div>
              <div className="stat-value">$12,680.24</div>
              <div className="stat-foot positive">
                <TrendingUp size={15} /> 8.2% <span>from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="stat-label">
                <ArrowUpRight size={18} /> This month
              </div>
              <div className="stat-value">$2,418.60</div>
              <div className="stat-foot">42 transactions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="stat-label">
                <CreditCard size={18} /> Upcoming bills
              </div>
              <div className="stat-value">$680.00</div>
              <div className="stat-foot">Due in the next 7 days</div>
            </CardContent>
          </Card>
        </section>
        <section className="dashboard-grid">
          <Card className="spending-card">
            <CardHeader>
              <div className="card-heading">
                <div>
                  <CardTitle>Spending overview</CardTitle>
                  <p className="card-subtitle">
                    Your expenses across the last 6 months
                  </p>
                </div>
                <button className="select-button">
                  Last 6 months <span>⌄</span>
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="chart">
                <div className="chart-y">
                  <span>$4k</span>
                  <span>$3k</span>
                  <span>$2k</span>
                  <span>$1k</span>
                  <span>$0</span>
                </div>
                <div className="bars">
                  {[38, 48, 32, 56, 43, 76].map((height, index) => (
                    <div className="bar-wrap" key={index}>
                      <div
                        className={index === 5 ? "bar current" : "bar"}
                        style={{ height: `${height}%` }}
                      />
                      <span>
                        {["Mar", "Apr", "May", "Jun", "Jul", "Aug"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="recent-card">
            <CardHeader>
              <div className="card-heading">
                <div>
                  <CardTitle>Recent expenses</CardTitle>
                  <p className="card-subtitle">Your latest activity</p>
                </div>
                <Link className="text-link" href="/expenses">
                  View all <ArrowUpRight size={15} />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="expense-list">
                {recent.map(([name, category, amount, date]) => (
                  <div className="expense-row" key={name}>
                    <div className="expense-icon">
                      <Receipt size={17} />
                    </div>
                    <div className="expense-name">
                      <strong>{name}</strong>
                      <span>{category}</span>
                    </div>
                    <div className="expense-amount">
                      <strong>{amount}</strong>
                      <span>{date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="insight">
          <div className="insight-icon">✦</div>
          <div>
            <strong>A small win worth noticing</strong>
            <p>
              You&apos;re spending 14% less on dining out than last month. Keep
              it up.
            </p>
          </div>
          <Link href="/expenses">
            See insights <ArrowUpRight size={15} />
          </Link>
        </section>
      </main>
    </AppShell>
  );
}
