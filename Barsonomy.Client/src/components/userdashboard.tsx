import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowUpRight, Receipt } from "lucide-react";
import UserSpending from "./userspending";

export default function UserDashboard() {
  return (
    <div>
      <section className="dashboard-grid">
        <UserSpending />
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
                // recent expenses
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
    </div>
  );
}