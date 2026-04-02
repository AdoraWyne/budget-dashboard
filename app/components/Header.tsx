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
    <>
      <button type="button" onClick={onPrevMonth}>
        &lt;
      </button>
      <p>{formattedSelectedMonthYear}</p>
      <button type="button" onClick={onNextMonth}>
        &gt;
      </button>
    </>
  );
};

export default Header;
