import { Card } from "./ui/card";

export default function ExpenseSummary() {
  return (
    <div>
      <section className="expense-summary">
        <Card>
          <div className="summary-label">Total spent this month</div>
          <div className="summary-value">$2,418.60</div>
          <div className="progress">
            <span />
          </div>
          <div className="summary-meta">
            <span>68% of your $3,550 budget</span>
            <strong>$1,131.40 left</strong>
          </div>
        </Card>
        <Card>
          <div className="summary-label">Average daily spend</div>
          <div className="summary-value">$93.02</div>
          <div className="summary-meta">
            <span className="positive">↓ 12.4% vs July</span>
          </div>
        </Card>
        <Card>
          <div className="summary-label">Largest category</div>
          <div className="summary-value">Groceries</div>
          <div className="summary-meta">
            <span>$681.20 this month</span>
          </div>
        </Card>
      </section>
    </div>
  );
}