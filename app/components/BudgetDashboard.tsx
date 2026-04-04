"use client";

import { Temporal } from "@js-temporal/polyfill";
import transactions from "../../data/transactions.json";
import { useState } from "react";

import Header from "../components/Header";
import TotalSpent from "./TotalSpent";
import TransactionTable from "./TransactionTable";
import ExpensesChart from "./ExpensesChart";

const sortedTransactions = [...transactions].sort((a, b) => {
  return Temporal.PlainDate.compare(
    Temporal.PlainDate.from(a.date),
    Temporal.PlainDate.from(b.date),
  );
  // return a.date.localeCompare(b.date);
});

const mostRecentDate = Temporal.PlainDate.from(sortedTransactions.at(-1)!.date);

const BudgetDashboard = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState(
    Temporal.PlainYearMonth.from({
      month: mostRecentDate.month,
      year: mostRecentDate.year,
      calendar: "gregory",
    }),
  );

  // useMemo
  const selectedMonthTransactions = sortedTransactions
    .filter((obj) => {
      const date = Temporal.PlainDate.from(obj.date);
      return (
        date.month === selectedMonthYear.month &&
        date.year === selectedMonthYear.year
      );
    })
    .reverse();

  const goToPrevMonth = () => {
    setSelectedMonthYear((prev) => prev.subtract({ months: 1 }));
  };

  const goToNextMonth = () => {
    setSelectedMonthYear((prev) => prev.add({ months: 1 }));
  };

  return (
    <>
      <Header
        selectedMonthYear={selectedMonthYear}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
      />
      <TotalSpent selectedMonthTransactions={selectedMonthTransactions} />
      <TransactionTable selectedMonthTransactions={selectedMonthTransactions} />
      <ExpensesChart selectedMonthTransactions={selectedMonthTransactions} />
    </>
  );
};

export default BudgetDashboard;
