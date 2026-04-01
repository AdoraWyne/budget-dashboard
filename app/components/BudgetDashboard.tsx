"use client";

import { Temporal } from "@js-temporal/polyfill";
import transactions from "../../data/transactions.json";
import { useState } from "react";

const sortedTransactions = [...transactions].sort((a, b) => {
  return Temporal.PlainDate.compare(
    Temporal.PlainDate.from(a.date),
    Temporal.PlainDate.from(b.date),
  );
});

const mostRecentDate = Temporal.PlainDate.from(sortedTransactions.at(-1)!.date);

interface SelectedMonthYear {
  month: number;
  year: number;
}

const BudgetDashboard = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState<SelectedMonthYear>(
    {
      month: mostRecentDate.month,
      year: mostRecentDate.year,
    },
  );

  const selectedMonthTransactions = sortedTransactions.filter((obj) => {
    const date = Temporal.PlainDate.from(obj.date);
    return (
      date.month === selectedMonthYear.month &&
      date.year === selectedMonthYear.year
    );
  });

  return <p>adora budget dashboard</p>;
};

export default BudgetDashboard;
