import { ArrowDownUp, CalendarDays, ChevronDown, Download, Receipt, Search, SlidersHorizontal } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export default function ExpensesList() {
    return (
      <div>
        <Card className="table-card">
          <div className="table-toolbar">
            <div className="search-wrap">
              <Search size={17} />
              <Input
                placeholder="Search expenses..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="toolbar-actions">
              <button className="filter-button">
                <CalendarDays size={16} />  Denna månad <ChevronDown size={14} />
              </button>
              <button className="filter-button">
                <SlidersHorizontal size={16} /> Filter
              </button>
              <button className="icon-button" aria-label="Export expenses">
                <Download size={17} />
              </button>
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Merchant</th>
                  <th>Category</th>
                  <th>
                    Date <ArrowDownUp size={13} />
                  </th>
                  <th className="align-right">Antal</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((expense) => (
                  <tr key={`${expense.merchant}-${expense.date}`}>
                    <td>
                      <div className="merchant-cell">
                        <span className={`merchant-icon ${expense.color}`}>
                          <Receipt size={16} />
                        </span>
                        <strong>{expense.merchant}</strong>
                      </div>
                    </td>
                    <td>
                      <span className="category-pill">{expense.category}</span>
                    </td>
                    <td className="muted-cell">{expense.date}</td>
                    <td className="amount-cell">-{expense.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">No expenses match your search.</div>
          )}
          <div className="table-footer">
            {filtered.length} av {expenses.length}Bärs {" "}
            <span>Page 1 of 1</span>
          </div>
        </Card>
      </div>
    );
}