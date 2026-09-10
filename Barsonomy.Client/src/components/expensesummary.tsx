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
              {Math.round(budgetProgress)}% of your{" "}
              {formatCurrency(monthlyBudget)} budget
            </span>
            <strong>
              {formatCurrency(Math.max(monthlyBudget - monthlyTotal, 0))} left
            </strong>
          </div>
        </Card>
        <Card>
          <div className="summary-label">Genomsnittligt dagligt uttag</div>
          <div className="summary-value">
            {formatCurrency(monthlyTotal / Math.max(new Date().getDate(), 1))}
          </div>
          <div className="summary-meta">
            <span>Daily average this month</span>
          </div>
        </Card>
        <Card>
          <div className="summary-label">Largest category</div>
          <div className="summary-value">{largestCategory}</div>
          <div className="summary-meta">
            <span>{formatCurrency(largestCategoryTotal)} this month</span>
          </div>
        </Card>
      </section>
    </div>
  );
}
