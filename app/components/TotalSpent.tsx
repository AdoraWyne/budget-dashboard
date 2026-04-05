import type { SelectedMonthTransaction } from "../types";
import { currencyFormatter } from "../utils/formatters";

interface TotalSpentProps {
  selectedMonthTransactions: SelectedMonthTransaction[];
}

const TotalSpent = ({ selectedMonthTransactions }: TotalSpentProps) => {
  const totalSpent = selectedMonthTransactions.reduce(
    (acc, cV) => acc + cV.amount,
    0,
  );

  const formattedTotalSpent = currencyFormatter.format(totalSpent);

  return (
    <div className="bg-white text-xs text-center border-none rounded-lg p-4">
      <p className="text-gray-400 font-semibold">
        TOTAL SPENT THIS MONTH{" "}
        <span className="text-black text-lg ml-2">{formattedTotalSpent}</span>
      </p>
    </div>
  );
};

export default TotalSpent;
