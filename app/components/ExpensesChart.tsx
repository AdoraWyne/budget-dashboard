import { Chart } from "react-google-charts";
import type { SelectedMonthTransaction } from "../types";

interface ExpensesChartProps {
  selectedMonthTransactions: SelectedMonthTransaction[];
}

const ExpensesChart = ({ selectedMonthTransactions }: ExpensesChartProps) => {
  const transformedData = new Map<string, number>();

  selectedMonthTransactions.forEach((obj) => {
    const current = transformedData.get(obj.category) ?? 0;
    transformedData.set(obj.category, current + obj.amount);
  });

  const data = [["Category", "Amount"], ...transformedData.entries()];

  return (
    <div className="bg-white text-xs border-none rounded-lg p-4 my-4 lg:w-2/5">
      <h2 className="text-gray-400 font-semibold mb-4">EXPENSES BY CATEGORY</h2>
      <Chart chartType="PieChart" data={data} width={"100%"} height={"400px"} />
    </div>
  );
};

export default ExpensesChart;
