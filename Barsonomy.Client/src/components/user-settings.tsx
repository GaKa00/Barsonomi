"use client";

import { useEffect, useState } from "react";
import { dashboardApi } from "@/api/dashboard";
import type { DashboardSummary } from "@/api/api-types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function UserSettings({ isSetup = false }: { isSetup?: boolean }) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [beerPrice, setBeerPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    dashboardApi
      .get()
      .then((loadedSummary) => {
        setSummary(loadedSummary);
        setMonthlyIncome(String(loadedSummary.monthlyIncomeSek));
        setBeerPrice(String(loadedSummary.beerPriceSek));
      })
      .catch(() => setMessage("Could not load your settings."))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const monthlyIncomeSek = Number(monthlyIncome);
    const beerPriceSek = Number(beerPrice);

    if (
      !Number.isFinite(monthlyIncomeSek) ||
      monthlyIncomeSek <= 0 ||
      !Number.isFinite(beerPriceSek) ||
      beerPriceSek <= 0
    ) {
      setMessage("Enter positive values for both fields.");
      return;
    }

    try {
      setIsSaving(true);
      const updatedSummary = await dashboardApi.update({
        monthlyIncomeSek,
        beerPriceSek,
      });
      setSummary(updatedSummary);
      setMessage("Settings saved.");
      if (isSetup) {
        window.location.assign("/dashboard");
      }
    } catch {
      setMessage("Could not save your settings.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="settings-panel">
      <div className="settings-heading">
        <p className="eyebrow">{isSetup ? "One last thing" : "Your numbers"}</p>
        <h1>{isSetup ? "Set up your beer maths" : "Money & beer price"}</h1>
        <p>
          {isSetup
            ? "Tell us what your month looks like so the dashboard can speak your language."
            : "Keep these values current so your beer budget stays useful."}
        </p>
      </div>
      <form className="settings-form" onSubmit={handleSubmit}>
        <label>
          Total monthly money in SEK
          <Input
            required
            min="0.01"
            step="0.01"
            type="number"
            value={monthlyIncome}
            onChange={(event) => setMonthlyIncome(event.target.value)}
            disabled={isLoading || isSaving}
          />
        </label>
        <label>
          Beer price in SEK
          <Input
            required
            min="0.01"
            step="0.01"
            type="number"
            value={beerPrice}
            onChange={(event) => setBeerPrice(event.target.value)}
            disabled={isLoading || isSaving}
          />
        </label>
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || isSaving || !summary}
        >
          {isSaving
            ? "Saving..."
            : isSetup
              ? "Save and continue"
              : "Save settings"}
        </Button>
        {message && (
          <p className="settings-message" role="status">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
