interface SelectedMonthTransaction {
  date: string;
  amount: number;
  payee: string;
  category: string;
}

interface TotalSpentProps {
  selectedMonthTransactions: SelectedMonthTransaction[];
}

const formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 2,
});

const TotalSpent = ({ selectedMonthTransactions }: TotalSpentProps) => {
  const totalSpent = selectedMonthTransactions.reduce(
    (acc, cV) => acc + cV.amount,
    0,
  );

  const formattedTotalSpent = formatter.format(totalSpent);

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
