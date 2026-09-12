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
          <p className="eyebrow">Bärsdata</p>
          <h1>Bjudöl</h1>
          <p className="page-intro">
           Håll koll på hur många bjudöl du är skyldig, klart Hyresvärden ska dricka!
          </p>
        </div>
        <Button onClick={onAddExpense}>
          <Plus size={17} />
          Lägg till utgift
        </Button>
      </header>
    </div>
  );
}
