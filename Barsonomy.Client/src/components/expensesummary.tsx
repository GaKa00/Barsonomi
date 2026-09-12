import { Card } from "./ui/card";

type ExpenseSummaryProps = {
  monthlyTotal: number;
  monthlyBudget: number;
  largestCategory: string;
  largestCategoryTotal: number;
};

const formatCurrency = (value: number) =>
  value.toLocaleString("sv-SE", { style: "currency", currency: "SEK" });

export default function ExpenseSummary({
  monthlyTotal,
  monthlyBudget,
  largestCategory,
  largestCategoryTotal,
}: ExpenseSummaryProps) {
  const budgetProgress =
    monthlyBudget > 0 ? Math.min((monthlyTotal / monthlyBudget) * 100, 100) : 0;

  return (
    <div>
      <section className="expense-summary">
        <Card>
          <div className="summary-label">Bärs denna månad</div>
          <div className="summary-value">{formatCurrency(monthlyTotal)}</div>
          <div className="progress">
            <span style={{ width: `${budgetProgress}%` }} />
          </div>
          <div className="summary-meta">
            <span>
              {Math.round(budgetProgress)}% av{" "}
              {formatCurrency(monthlyBudget)} budget
            </span>
            <strong>
              {formatCurrency(Math.max(monthlyBudget - monthlyTotal, 0))} kvar
            </strong>
          </div>
        </Card>
        <Card>
          <div className="summary-label">Genomsnittligt dagligt uttag</div>
          <div className="summary-value">
            {formatCurrency(monthlyTotal / Math.max(new Date().getDate(), 1))}
          </div>
         
        </Card>
        <Card>
          <div className="summary-label">Största kategori</div>
          <div className="summary-value">{largestCategory}</div>
          <div className="summary-meta">
            <span>{formatCurrency(largestCategoryTotal)} denna månad</span>
          </div>
        </Card>
      </section>
    </div>
  );
}
