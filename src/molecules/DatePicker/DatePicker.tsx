import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

import { Input } from "../../atoms/Input/Input";
import { Button } from "../../atoms/Button";

import styles from "./DatePicker.module.css";

interface DatePickerProps {
  id?: string;
  label?: ReactNode;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  onChange?: (value: string) => void;
}

const WEEK_DAYS = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
];

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseDate = (
  value?: string
): Date | null => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value
    .split("-")
    .map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const DatePicker = ({
  id,
  label,
  value,
  placeholder = "Select date",
  required = false,
  disabled = false,
  min,
  max,
  onChange,
}: DatePickerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  /*
   * Internal value is used when DatePicker
   * is used as an uncontrolled component.
   */
  const [internalSelectedDate, setInternalSelectedDate] =
    useState<Date | null>(
      parseDate(value)
    );

  /*
   * Controlled / uncontrolled value.
   */
  const selectedDate =
    value !== undefined
      ? parseDate(value)
      : internalSelectedDate;

  const initialDate =
    selectedDate ||
    parseDate(min) ||
    new Date();

  const [isOpen, setIsOpen] =
    useState(false);

  const [currentMonth, setCurrentMonth] =
    useState(
      initialDate.getMonth()
    );

  const [currentYear, setCurrentYear] =
    useState(
      initialDate.getFullYear()
    );

  /*
   * Close popup when clicking outside.
   */
  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /*
   * Check min/max range.
   */
  const isDateDisabled = (
    date: Date
  ): boolean => {
    const dateValue = formatDate(date);

    if (min && dateValue < min) {
      return true;
    }

    if (max && dateValue > max) {
      return true;
    }

    return false;
  };

  /*
   * Generate calendar days.
   */
  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      currentYear,
      currentMonth,
      1
    );

    const lastDay = new Date(
      currentYear,
      currentMonth + 1,
      0
    );

    const days: (Date | null)[] = [];

    const startDay = firstDay.getDay();

    for (
      let i = 0;
      i < startDay;
      i += 1
    ) {
      days.push(null);
    }

    for (
      let day = 1;
      day <= lastDay.getDate();
      day += 1
    ) {
      days.push(
        new Date(
          currentYear,
          currentMonth,
          day
        )
      );
    }

    return days;
  }, [
    currentMonth,
    currentYear,
  ]);

  const monthName = new Date(
    currentYear,
    currentMonth
  ).toLocaleString("default", {
    month: "long",
  });

  /*
   * Previous month availability.
   */
  const canGoPrevious = useMemo(() => {
    const previousMonth = new Date(
      currentYear,
      currentMonth - 1,
      1
    );

    const lastDay = new Date(
      previousMonth.getFullYear(),
      previousMonth.getMonth() + 1,
      0
    );

    const lastDate = formatDate(lastDay);

    if (min && lastDate < min) {
      return false;
    }

    return true;
  }, [
    currentMonth,
    currentYear,
    min,
  ]);

  /*
   * Next month availability.
   */
  const canGoNext = useMemo(() => {
    const nextMonth = new Date(
      currentYear,
      currentMonth + 1,
      1
    );

    const firstDate = formatDate(nextMonth);

    if (max && firstDate > max) {
      return false;
    }

    return true;
  }, [
    currentMonth,
    currentYear,
    max,
  ]);

  /*
   * Select date.
   */
  const handleSelect = (date: Date) => {
    if (isDateDisabled(date)) {
      return;
    }

    const formattedDate =
      formatDate(date);

    if (value === undefined) {
      setInternalSelectedDate(date);
    }

    onChange?.(formattedDate);

    setIsOpen(false);
  };

  /*
   * Previous month.
   */
  const handlePreviousMonth = () => {
    if (!canGoPrevious) {
      return;
    }

    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(
        currentYear - 1
      );
    } else {
      setCurrentMonth(
        currentMonth - 1
      );
    }
  };

  /*
   * Next month.
   */
  const handleNextMonth = () => {
    if (!canGoNext) {
      return;
    }

    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(
        currentYear + 1
      );
    } else {
      setCurrentMonth(
        currentMonth + 1
      );
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
    >
      {/* Input */}
      <div
        className={styles.inputWrapper}
        onClick={() => {
          if (!disabled) {
            setIsOpen(
              (previous) => !previous
            );
          }
        }}
      >
        <Input
          id={id}
          label={label}
          value={
            selectedDate
              ? formatDate(selectedDate)
              : ""
          }
          placeholder={placeholder}
          icon="calendar"
          readOnly
          required={required}
          disabled={disabled}
          min={min}
          max={max}
        />
      </div>

      {/* Calendar popup */}
      {isOpen && !disabled && (
        <div
          className={styles.popup}
          role="dialog"
          aria-label="Date picker"
        >
          {/* Header */}
          <div className={styles.header}>
            <Button
              label=""
              variant="link"
              icon="arrowLeft"
              iconPosition="left"
              disabled={!canGoPrevious}
              onClick={handlePreviousMonth}
              aria-label="Previous month"
            />

            <span className={styles.monthTitle}>
              {monthName} {currentYear}
            </span>

            <Button
              label=""
              variant="link"
              icon="arrowRight"
              iconPosition="right"
              disabled={!canGoNext}
              onClick={handleNextMonth}
              aria-label="Next month"
            />
          </div>

          {/* Weekdays */}
          <div
            className={styles.weekdays}
            aria-hidden="true"
          >
            {WEEK_DAYS.map((day) => (
              <div key={day}>
                {day}
              </div>
            ))}
          </div>

          {/* Dates */}
          <div
            className={styles.days}
            role="grid"
            aria-label={`${monthName} ${currentYear}`}
          >
            {calendarDays.map(
              (date, index) => {
                if (!date) {
                  return (
                    <div
                      key={`empty-${index}`}
                      aria-hidden="true"
                    />
                  );
                }

                const dateValue =
                  formatDate(date);

                const selected =
                  selectedDate !== null &&
                  dateValue ===
                    formatDate(selectedDate);

                const dateDisabled =
                  isDateDisabled(date);

                return (
                  <button
                    key={dateValue}
                    type="button"
                    role="gridcell"
                    disabled={dateDisabled}
                    aria-selected={selected}
                    aria-disabled={dateDisabled}
                    aria-label={date.toLocaleDateString(
                      "en-IN",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                    className={
                      dateDisabled
                        ? styles.disabled
                        : selected
                        ? styles.selected
                        : styles.day
                    }
                    onClick={() =>
                      handleSelect(date)
                    }
                  >
                    {date.getDate()}
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;