"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import ExpensesList from "@/components/expenseslist";
import ExpensesTopBar from "@/components/expensestopbar";
import ExpenseSummary from "@/components/expensesummary";
import ExpenseModal, { type ExpenseFormState } from "@/components/expensemodal";
import { expensesApi } from "@/api/expenses";
import { dashboardApi } from "@/api/dashboard";
import { categoriesApi } from "@/api/categories";
import type { Category, DashboardSummary, Expense } from "@/api/api-types";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<ExpenseFormState>({
    name: "",
    amount: "",
    categoryId: "",
    isMonthly: false,
    isFixed: false,
  });

  useEffect(() => {
    Promise.all([expensesApi.list(), dashboardApi.get(), categoriesApi.list()])
      .then(([loadedExpenses, loadedSummary, loadedCategories]) => {
        setExpenses(loadedExpenses);
        setSummary(loadedSummary);
        setCategories(loadedCategories);
      })
      .catch(() => setError("Could not load your expenses."))
      .finally(() => setIsLoading(false));
  }, []);

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const nextMonthStart = new Date(monthStart);
  nextMonthStart.setMonth(nextMonthStart.getMonth() + 1);
  const monthlyExpenses = expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date >= monthStart && date < nextMonthStart;
  });
  const monthlyTotal = monthlyExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  const categoryTotals = monthlyExpenses.reduce<Record<string, number>>(
    (totals, expense) => {
      totals[expense.categoryName] =
        (totals[expense.categoryName] ?? 0) + expense.amount;
      return totals;
    },
    {},
  );
  const largestCategory = Object.entries(categoryTotals).sort(
    ([, first], [, second]) => second - first,
  )[0];
  const openAddExpenseModal = () => {
    setError(null);
    setForm((currentForm) => ({
      ...currentForm,
      categoryId: currentForm.categoryId || String(categories[0]?.id ?? ""),
    }));
    setIsModalOpen(true);
  };

  const closeAddExpenseModal = () => {
    if (!isSaving) {
      setIsModalOpen(false);
    }
  };

  const addExpense = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(form.amount);
    const categoryId = Number(form.categoryId);

    if (
      !form.name.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !categoryId
    ) {
      setError("Enter a name, a valid amount, and a category.");
      return;
    }

    try {
      setIsSaving(true);
      const createdExpense = await expensesApi.create({
        name: form.name.trim(),
        amount,
        date: new Date().toISOString(),
        isMonthly: form.isMonthly,
        isFixed: form.isFixed,
        categoryId,
      });
      setExpenses((currentExpenses) => [createdExpense, ...currentExpenses]);
      setError(null);
      setForm({
        name: "",
        amount: "",
        categoryId: String(categories[0]?.id ?? ""),
        isMonthly: false,
        isFixed: false,
      });
      setIsModalOpen(false);
    } catch {
      setError("Could not create the expense.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppShell>
      <ExpensesTopBar onAddExpense={openAddExpenseModal} />
      <main className="content">
        {error && <p role="alert">{error}</p>}
        <ExpenseSummary
          monthlyTotal={monthlyTotal}
          monthlyBudget={summary?.monthlyIncomeSek ?? 0}
          largestCategory={largestCategory?.[0] ?? "No data"}
          largestCategoryTotal={largestCategory?.[1] ?? 0}
        />
        {isLoading ? (
          <p>Loading expenses...</p>
        ) : (
          <ExpensesList expenses={expenses} />
        )}
      </main>
      {isModalOpen && (
        <ExpenseModal
          closeAddExpenseModal={closeAddExpenseModal}
          form={form}
          setForm={setForm}
          addExpense={addExpense}
          categories={categories}
          isSaving={isSaving}
        />
      )}
    </AppShell>
  );
}
