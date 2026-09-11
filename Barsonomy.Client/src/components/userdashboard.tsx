"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowUpRight, Receipt } from "lucide-react";
import UserSpending from "./userspending";
import type { Expense } from "@/api/api-types";
import { expensesApi } from "@/api/expenses";

export default function UserDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    expensesApi
      .list()
      .then(setExpenses)
      .catch(() => setExpenses([]));
  }, []);

  return (
    <div>
      <section className="dashboard-grid">
        {/* <UserSpending /> */}
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
              {expenses
                .slice(0, 5)
                .map(({ id, name, categoryName, amount, date }) => (
                  <div className="expense-row" key={id}>
                    <div className="expense-icon">
                      <Receipt size={17} />
                    </div>
                    <div className="expense-name">
                      <strong>{name}</strong>
                      <span>{categoryName}</span>
                    </div>
                    <div className="expense-amount">
                      <strong>
                        {amount.toLocaleString("sv-SE", {
                          style: "currency",
                          currency: "SEK",
                        })}
                      </strong>
                      <span>{new Date(date).toLocaleDateString("sv-SE")}</span>
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
