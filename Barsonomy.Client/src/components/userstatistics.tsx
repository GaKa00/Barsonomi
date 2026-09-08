import { ArrowUpRight, CreditCard, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function UserStatistics() {
    return (
      <div>
        <section className="stat-grid">
          <Card className="balance-card">
            <CardContent>
              <div className="stat-label">
                <Wallet size={18} /> Total balance
              </div>
              <div className="stat-value">$12,680.24</div>
              <div className="stat-foot positive">
                <TrendingUp size={15} /> 8.2% <span>from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="stat-label">
                <ArrowUpRight size={18} /> This month
              </div>
              <div className="stat-value">$2,418.60</div>
              <div className="stat-foot">42 transactions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="stat-label">
                <CreditCard size={18} /> Upcoming bills
              </div>
              <div className="stat-value">$680.00</div>
              <div className="stat-foot">Due in the next 7 days</div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
}