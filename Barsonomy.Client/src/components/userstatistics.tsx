"use client";

import { ArrowUpRight, CreditCard, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { dashboardApi } from "@/api/dashboard";
import { expensesApi } from "@/api/expenses";
import type { DashboardSummary, Expense } from "@/api/api-types";
import { Card, CardContent } from "./ui/card";

const formatBeers = (value: number) => `${value.toFixed(1)} 🍺`;

export default function UserStatistics({
  refreshKey = 0,
}: {
  refreshKey?: number;
}) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    Promise.all([dashboardApi.get(), expensesApi.list()])
      .then(([dashboard, userExpenses]) => {
        setSummary(dashboard);
        setExpenses(userExpenses);
      })
      .catch(() => setSummary(null));
  }, [refreshKey]);

  if (!summary) {
    return (
      <section className="stat-grid" aria-label="Beer statistics">
        Letar efter öl...
      </section>
    );
  }

  const beerPrice = summary.beerPriceSek;
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const nextMonthStart = new Date(monthStart);
  nextMonthStart.setMonth(nextMonthStart.getMonth() + 1);
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= monthStart && expenseDate < nextMonthStart;
  });
  const monthlySubscriptions = expenses.filter(
    (expense) => expense.isMonthly && !expense.isFixed,
  );
  const monthlySpentBeers =
    monthlyExpenses.reduce((total, expense) => total + expense.amount, 0) /
    beerPrice;
  const upcomingBillsBeers =
    monthlySubscriptions.reduce((total, expense) => total + expense.amount, 0) /
    beerPrice;

  return (
    <div>
      <section className="stat-grid">
        <Card className="balance-card">
          <CardContent>
            <div className="stat-label">
              <Wallet size={18} /> Bärskonto
            </div>
            <div className="stat-value">
              {formatBeers(summary.remainingIncomeSek / beerPrice)}
            </div>
            <span className="stat-foot">
              {summary.monthlyIncomeSek + " Kr"}
            </span>

            <div className="stat-foot positive">
              <TrendingUp size={15} />{" "}
              {formatBeers(summary.monthlyIncomeSek / beerPrice)}{" "}
              <span>monthly budget</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="stat-label">
              <ArrowUpRight size={18} /> Öl denna månad
            </div>
            <div className="stat-value">{formatBeers(monthlySpentBeers)}</div>
            <span className="stat-foot">
              {monthlySpentBeers * beerPrice + " Kr -  Spenderade"}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="stat-label">
              <CreditCard size={18} /> Bjudöl per månad
            </div>
            <div className="stat-value">{formatBeers(upcomingBillsBeers)}</div>
            <div className="flex space-x-3">
              <div className="stat-foot">
                {monthlySubscriptions.length} Prenumeration
              </div>
              <span className="stat-foot">
                {" - " + upcomingBillsBeers * beerPrice + " Kr"}
              </span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
