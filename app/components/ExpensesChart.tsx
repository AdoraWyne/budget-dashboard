import { Chart } from "react-google-charts";

interface SelectedMonthTransaction {
  date: string;
  amount: number;
  payee: string;
  category: string;
}

interface ExpensesChartProps {
  selectedMonthTransactions: SelectedMonthTransaction[];
}

const ExpensesChart = ({ selectedMonthTransactions }: ExpensesChartProps) => {
  const data: [[string, string], ...[string, number][]] = [
    ["Category", "Amount"],
  ];

  selectedMonthTransactions.forEach((obj) => {
    const existing = data.find((ele) => ele[0] === obj.category);

    if (existing && typeof existing[1] === "number") {
      existing[1] += obj.amount;
    } else {
      data.push([obj.category, obj.amount]);
    }
  });

  return (
    <div className="bg-white text-xs border-none rounded-lg p-4 my-4">
      <h2 className="text-gray-400 font-semibold mb-4">EXPENSES BY CATEGORY</h2>
      <Chart chartType="PieChart" data={data} width={"100%"} height={"400px"} />
    </div>
  );
};

export default ExpensesChart;
