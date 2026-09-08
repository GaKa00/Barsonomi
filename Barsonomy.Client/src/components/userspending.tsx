import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function UserSpending() {
  return (
    <div>
         <Card className="spending-card">
          <CardHeader>
            <div className="card-heading">
              <div>
                <CardTitle>Spending overview</CardTitle>
                <p className="card-subtitle">
                  Your expenses across the last 6 months
                </p>
              </div>
              <button className="select-button">
                Last 6 months <span>⌄</span>
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="chart">
              <div className="chart-y">
                <span>$4k</span>
                <span>$3k</span>
                <span>$2k</span>
                <span>$1k</span>
                <span>$0</span>
              </div>
              <div className="bars">
                {[38, 48, 32, 56, 43, 76].map((height, index) => (
                  <div className="bar-wrap" key={index}>
                    <div
                      className={index === 5 ? "bar current" : "bar"}
                      style={{ height: `${height}%` }}
                    />
                    <span>
                      {["Mar", "Apr", "May", "Jun", "Jul", "Aug"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}