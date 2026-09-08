import { Plus } from "lucide-react";
import { Button } from "./ui/button";

type ExpensesTopBarProps = {
  onAddExpense: () => void;
};

export default function ExpensesTopBar({ onAddExpense }: ExpensesTopBarProps) {
  return (
    <div>
      <header className="topbar">
        <div>
          <p className="eyebrow">TRANSACTIONS</p>
          <h1>Expenses</h1>
          <p className="page-intro">
            Keep a clear view of where your money goes.
          </p>
        </div>
        <Button onClick={onAddExpense}>
          <Plus size={17} />
          Add expense
        </Button>
      </header>
    </div>
  );
}
