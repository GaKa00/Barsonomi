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
import ExpensesTopBar from "@/components/expensestopbar";
import ExpenseSummary from "@/components/expensesummary";

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
<ExpensesTopBar />
      <main className="content">
  <ExpenseSummary />
        
      </main>
    </AppShell>
  );
}
