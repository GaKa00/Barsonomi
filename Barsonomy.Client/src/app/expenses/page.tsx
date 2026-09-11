"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ExpensesList from "@/components/expenseslist";
import ExpensesTopBar from "@/components/expensestopbar";
import ExpenseSummary from "@/components/expensesummary";
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
  const [form, setForm] = useState({
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
        <div className="modal-backdrop" onMouseDown={closeAddExpenseModal}>
          <section
            className="expense-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-expense-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">Ny utgift</p>
                <h2 id="add-expense-title">Lägg till Bjudöl</h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close dialog"
                onClick={closeAddExpenseModal}
              >
                <X size={18} />
              </Button>
            </div>
            <form className="expense-form" onSubmit={addExpense}>
              <label>
                Titel
                <Input
                  required
                  autoFocus
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="Rent, groceries, savings..."
                />
              </label>
              <label>
               Antal Kronor
                <Input
                  required
                  min="0.01"
                  step="0.01"
                  type="number"
                  value={form.amount}
                  onChange={(event) =>
                    setForm({ ...form, amount: event.target.value })
                  }
                  placeholder="0.00"
                />
              </label>
              <label>
               Kategori
                <select
                  required
                  value={form.categoryId}
                  onChange={(event) =>
                    setForm({ ...form, categoryId: event.target.value })
                  }
                >
                  <option value="" disabled>
                   Välj Kategori
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.isMonthly}
                    onChange={(event) =>
                      setForm({ ...form, isMonthly: event.target.checked })
                    }
                  />
                Prenumeration?
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.isFixed}
                    onChange={(event) =>
                      setForm({ ...form, isFixed: event.target.checked })
                    }
                  />
                  Nödvändig Utgift ( t.ex. hyra, el, internet)
                </label>
              </div>
              <div className="modal-actions">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeAddExpenseModal}
                >
                  Avbryt
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving || categories.length === 0}
                >
                  {isSaving ? "Saving..." : "Add expense"}
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </AppShell>
  );
}
