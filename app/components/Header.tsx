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
  return (
    <>
      <button type="button" onClick={onPrevMonth}>
        &lt;
      </button>
      <p>
        {selectedMonthYear.month} {selectedMonthYear.year}
      </p>
      <button type="button" onClick={onNextMonth}>
        &gt;
      </button>
    </>
  );
};

export default Header;
