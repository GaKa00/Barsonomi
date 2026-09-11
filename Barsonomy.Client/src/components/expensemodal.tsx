import { X } from "lucide-react";
import type { Category, CreateExpenseRequest } from "@/api/api-types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export type ExpenseFormState = Omit<
  CreateExpenseRequest,
  "amount" | "categoryId" | "date"
> & {
  amount: string;
  categoryId: string;
};

interface ExpenseModalProps {
  closeAddExpenseModal: () => void;
  form: ExpenseFormState;
  setForm: React.Dispatch<React.SetStateAction<ExpenseFormState>>;
  addExpense: React.FormEventHandler<HTMLFormElement>;
  categories: Category[];
  isSaving: boolean;
}

export default function ExpenseModal({
  closeAddExpenseModal,
  form,
  setForm,
  addExpense,
  categories,
  isSaving,
}: ExpenseModalProps) {
  return (
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
                setForm((currentForm) => ({
                  ...currentForm,
                  name: event.target.value,
                }))
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
                setForm((currentForm) => ({
                  ...currentForm,
                  amount: event.target.value,
                }))
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
                setForm((currentForm) => ({
                  ...currentForm,
                  categoryId: event.target.value,
                }))
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
                  setForm((currentForm) => ({
                    ...currentForm,
                    isMonthly: event.target.checked,
                  }))
                }
              />
              Prenumeration?
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.isFixed}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    isFixed: event.target.checked,
                  }))
                }
              />
              Nödvändig Utgift (t.ex. hyra, el, internet)
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
  );
}
