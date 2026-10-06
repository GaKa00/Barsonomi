"use client";

import { useState } from "react";
import {
  ArrowDownUp,
  CalendarDays,
  ChevronDown,
  Download,
  Pencil,
  Receipt,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import type { Expense } from "@/api/api-types";

type ExpensesListProps = {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
};

export default function ExpensesList({
  expenses,
  onEdit,
  onDelete,
}: ExpensesListProps) {
  const [query, setQuery] = useState("");
  const filtered = expenses.filter((expense) =>
    `${expense.name} ${expense.categoryName}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div>
      <Card className="table-card">
        <div className="table-toolbar">
          <div className="search-wrap">
            <Search size={17} />
            <Input
              placeholder="Sök utgifter..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <button className="filter-button">
              <CalendarDays size={16} /> Denna månad <ChevronDown size={14} />
            </button>
           
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Namn</th>
                <th>Kategori</th>
                <th>
                  Datum <ArrowDownUp size={13} />
                </th>
                <th className="align-right">Antal</th>
                <th aria-label="Åtgärder" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((expense) => (
                <tr key={expense.id}>
                  <td>
                    <div className="merchant-cell">
                      <span className="merchant-icon">
                        <Receipt size={16} />
                      </span>
                      <strong>{expense.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="category-pill">
                      {expense.categoryName}
                    </span>
                  </td>
                  <td className="muted-cell">
                    {new Date(expense.date).toLocaleDateString("sv-SE")}
                  </td>
                  <td className="amount-cell">
                    -
                    {expense.amount.toLocaleString("sv-SE", {
                      style: "currency",
                      currency: "SEK",
                    })}
                  </td>
                  <td className="align-right space-x-2">
                    <button
                      className="icon-button expense-action expense-action-edit"
                      type="button"
                      aria-label={`Redigera ${expense.name}`}
                      onClick={() => onEdit(expense)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="icon-button expense-action expense-action-delete"
                      type="button"
                      aria-label={`Ta bort ${expense.name}`}
                      onClick={() => onDelete(expense)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="empty-state">
            Inga utgifter matchar din sökning.
          </div>
        )}
        <div className="table-footer">
          Visar {filtered.length} av {expenses.length} utgifter
        </div>
      </Card>
    </div>
  );
}
