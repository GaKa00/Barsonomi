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
import { Button } from "@/components/ui/button";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<ExpenseFormState>({
    name: "",
    amount: "",
    categoryId: "",
    isMonthly: false,
    isFixed: false,
    date: new Date().toISOString(),
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
  const visibleExpenses = expenses.filter(
    (expense) => new Date(expense.date) >= monthStart,
  );
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
    setEditingExpenseId(null);
    setForm((currentForm) => ({
      ...currentForm,
      categoryId: currentForm.categoryId || String(categories[0]?.id ?? ""),
    }));
    setIsModalOpen(true);
  };

  const openEditExpenseModal = (expense: Expense) => {
    setError(null);
    setEditingExpenseId(expense.id);
    setForm({
      name: expense.name,
      amount: String(expense.amount),
      categoryId: String(expense.categoryId),
      isMonthly: expense.isMonthly,
      isFixed: expense.isFixed,
      date: expense.date,
    });
    setIsModalOpen(true);
  };

  const deleteExpense = async (expense: Expense) => {
    setExpenseToDelete(expense);
  };

  const confirmDeleteExpense = async () => {
    if (!expenseToDelete) return;

    try {
      await expensesApi.remove(expenseToDelete.id);
      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (currentExpense) => currentExpense.id !== expenseToDelete.id,
        ),
      );
      setExpenseToDelete(null);
      setError(null);
    } catch {
      setError("Could not delete the expense.");
    }
  };

  const closeAddExpenseModal = () => {
    if (!isSaving) {
      setIsModalOpen(false);
    }
  };

  const saveExpense = async (event: React.FormEvent<HTMLFormElement>) => {
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
      const expensePayload = {
        name:
          editingExpenseId === null
            ? form.name.trim().charAt(0).toUpperCase() +
              form.name.trim().slice(1)
            : form.name.trim(),
        amount,
        date: form.date,
        isMonthly: form.isMonthly,
        isFixed: form.isFixed,
        categoryId,
      };
      if (editingExpenseId === null) {
        const createdExpense = await expensesApi.create(expensePayload);
        setExpenses((currentExpenses) => [createdExpense, ...currentExpenses]);
      } else {
        const currentExpense = expenses.find(
          (expense) => expense.id === editingExpenseId,
        );
        if (!currentExpense) throw new Error("Expense not found.");
        const updatedExpense = await expensesApi.update({
          ...currentExpense,
          ...expensePayload,
        });
        setExpenses((currentExpenses) =>
          currentExpenses.map((expense) =>
            expense.id === updatedExpense.id ? updatedExpense : expense,
          ),
        );
      }
      setError(null);
      setForm({
        name: "",
        amount: "",
        categoryId: String(categories[0]?.id ?? ""),
        isMonthly: false,
        isFixed: false,
        date: new Date().toISOString(),
      });
      setIsModalOpen(false);
    } catch {
      setError("Could not save the expense.");
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
          <ExpensesList
            expenses={visibleExpenses}
            onEdit={openEditExpenseModal}
            onDelete={deleteExpense}
          />
        )}
      </main>
      {isModalOpen && (
        <ExpenseModal
          closeAddExpenseModal={closeAddExpenseModal}
          form={form}
          setForm={setForm}
          addExpense={saveExpense}
          categories={categories}
          isSaving={isSaving}
          isEditing={editingExpenseId !== null}
        />
      )}
      {expenseToDelete && (
        <div
          className="modal-backdrop"
          onMouseDown={() => setExpenseToDelete(null)}
        >
          <section
            className="expense-modal delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-expense-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <p className="eyebrow">Ta bort utgift</p>
            <h2 id="delete-expense-title">Är du säker?</h2>
            <p className="delete-modal-copy">
              Vill du ta bort <strong>{expenseToDelete.name}</strong>? Detta går
              inte att ångra.
            </p>
            <div className="modal-actions">
              <Button
                type="button"
                variant="outline"
                onClick={() => setExpenseToDelete(null)}
              >
                Avbryt
              </Button>
              <Button
                type="button"
                className="delete-confirm-button"
                onClick={confirmDeleteExpense}
              >
                Ta bort
              </Button>
            </div>
          </section>
        </div>
      )}
    </AppShell>
  );
}
