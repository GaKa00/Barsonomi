"use client";

import { useState } from "react";
import {
  ArrowDownUp,
  CalendarDays,
  ChevronDown,
  Download,
  Plus,
  Receipt,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialExpenses = [
  {
    merchant: "Whole Foods Market",
    category: "Groceries",
    date: "Aug 26, 2026",
    amount: "$86.42",
    color: "green",
  },
  {
    merchant: "The Corner Coffee",
    category: "Dining",
    date: "Aug 25, 2026",
    amount: "$5.80",
    color: "orange",
  },
  {
    merchant: "Spotify",
    category: "Entertainment",
    date: "Aug 22, 2026",
    amount: "$10.99",
    color: "purple",
  },
  {
    merchant: "Shell Station",
    category: "Transport",
    date: "Aug 21, 2026",
    amount: "$42.00",
    color: "blue",
  },
  {
    merchant: "Adobe Creative Cloud",
    category: "Subscriptions",
    date: "Aug 20, 2026",
    amount: "$59.99",
    color: "red",
  },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [query, setQuery] = useState("");
  const filtered = expenses.filter((expense) =>
    `${expense.merchant} ${expense.category}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const addExpense = () =>
    setExpenses((items) => [
      {
        merchant: "New expense",
        category: "Uncategorized",
        date: "Aug 26, 2026",
        amount: "$0.00",
        color: "orange",
      },
      ...items,
    ]);
  return (
    <AppShell>
      <header className="topbar">
        <div>
          <p className="eyebrow">TRANSACTIONS</p>
          <h1>Expenses</h1>
          <p className="page-intro">
            Keep a clear view of where your money goes.
          </p>
        </div>
        <Button onClick={addExpense}>
          <Plus size={17} /> Add expense
        </Button>
      </header>
      <main className="content">
        <section className="expense-summary">
          <Card>
            <div className="summary-label">Total spent this month</div>
            <div className="summary-value">$2,418.60</div>
            <div className="progress">
              <span />
            </div>
            <div className="summary-meta">
              <span>68% of your $3,550 budget</span>
              <strong>$1,131.40 left</strong>
            </div>
          </Card>
          <Card>
            <div className="summary-label">Average daily spend</div>
            <div className="summary-value">$93.02</div>
            <div className="summary-meta">
              <span className="positive">↓ 12.4% vs July</span>
            </div>
          </Card>
          <Card>
            <div className="summary-label">Largest category</div>
            <div className="summary-value">Groceries</div>
            <div className="summary-meta">
              <span>$681.20 this month</span>
            </div>
          </Card>
        </section>
        <Card className="table-card">
          <div className="table-toolbar">
            <div className="search-wrap">
              <Search size={17} />
              <Input
                placeholder="Search expenses..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="toolbar-actions">
              <button className="filter-button">
                <CalendarDays size={16} /> This month <ChevronDown size={14} />
              </button>
              <button className="filter-button">
                <SlidersHorizontal size={16} /> Filter
              </button>
              <button className="icon-button" aria-label="Export expenses">
                <Download size={17} />
              </button>
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Merchant</th>
                  <th>Category</th>
                  <th>
                    Date <ArrowDownUp size={13} />
                  </th>
                  <th className="align-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((expense) => (
                  <tr key={`${expense.merchant}-${expense.date}`}>
                    <td>
                      <div className="merchant-cell">
                        <span className={`merchant-icon ${expense.color}`}>
                          <Receipt size={16} />
                        </span>
                        <strong>{expense.merchant}</strong>
                      </div>
                    </td>
                    <td>
                      <span className="category-pill">{expense.category}</span>
                    </td>
                    <td className="muted-cell">{expense.date}</td>
                    <td className="amount-cell">-{expense.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">No expenses match your search.</div>
          )}
          <div className="table-footer">
            Showing {filtered.length} of {expenses.length} expenses{" "}
            <span>Page 1 of 1</span>
          </div>
        </Card>
      </main>
    </AppShell>
  );
}
