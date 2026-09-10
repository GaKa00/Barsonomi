"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dashboardApi } from "@/api/dashboard";
import type { DashboardSummary } from "@/api/api-types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function UserSettings({ isSetup = false }: { isSetup?: boolean }) {
  const router = useRouter();
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
        router.push("/dashboard");
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
   
        <h1>{ isSetup ? "Ställ in dina uppgifter" : "Ändra dina uppgifter" }</h1>
        <p>
          {isSetup
            ? "Berätta oss om din ekonomi så vi kan räkna ut hur mycket bärs du har råd med."
            : "Blivigt fattigare? Eller har inflationen slagit emot biran? Ändra dina uppgifter här."}
        </p>
      </div>
      <form className="settings-form" onSubmit={handleSubmit}>
        <label>
          Hur många riksdaler har du i ägo?
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
         Vad kostar bärsen?
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
              ? "Spara inställningar"
              : "Spara ändringar"}
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
