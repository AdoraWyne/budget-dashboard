import { Temporal } from "@js-temporal/polyfill";

interface HeaderProps {
  selectedMonthYear: Temporal.PlainYearMonth;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const Header = ({
  selectedMonthYear,
  onPrevMonth,
  onNextMonth,
}: HeaderProps) => {
  const formattedSelectedMonthYear = selectedMonthYear.toLocaleString("en-AU", {
    month: "long",
    year: "numeric",
  });

  return (
    <header className="grid grid-cols-3 items-center mt-4 mb-4">
      {/* Left: title */}
      <h1 className="text-[10px] font-semibold tracking-widest text-gray-400 w-fit">
        BUDGET DASHBOARD
      </h1>

      {/* Centre: navigation */}
      <nav className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={onPrevMonth}
          className="text-[#3a2bad] font-bold"
        >
          &lt;
        </button>
        <span className="text-[#3a2bad] text-xl font-bold whitespace-nowrap">
          {formattedSelectedMonthYear}
        </span>
        <button
          type="button"
          onClick={onNextMonth}
          className="text-[#3a2bad] font-bold"
        >
          &gt;
        </button>
      </nav>

      {/* Right: intentionally empty — balances the grid */}
      <div />
    </header>
  );
};

export default Header;
