"use client";

import { Temporal } from "@js-temporal/polyfill";
import transactions from "../../data/transactions.json";
import { useMemo, useState } from "react";

import Header from "../components/Header";
import TotalSpent from "./TotalSpent";
import TransactionTable from "./TransactionTable";
import ExpensesChart from "./ExpensesChart";

const sortedTransactions = [...transactions].sort((a, b) => {
  return Temporal.PlainDate.compare(a.date, b.date);
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

  const selectedMonthTransactions = useMemo(() => {
    return sortedTransactions
      .filter((obj) => {
        const date = Temporal.PlainDate.from(obj.date);
        return (
          date.month === selectedMonthYear.month &&
          date.year === selectedMonthYear.year
        );
      })
      .reverse();
  }, [selectedMonthYear]);

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
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <ExpensesChart selectedMonthTransactions={selectedMonthTransactions} />
        <TransactionTable
          selectedMonthTransactions={selectedMonthTransactions}
        />
      </div>
    </>
  );
};

export default BudgetDashboard;
