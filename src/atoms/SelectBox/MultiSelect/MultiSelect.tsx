import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from "react";

import type {
  ReactNode,
  SelectHTMLAttributes,
} from "react";

import styles from "./MultiSelect.module.css";

export interface MultiSelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface MultiSelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "value" | "onChange" | "multiple"
  > {
  id?: string;

  label?: ReactNode;

  description?: ReactNode;

  options?: MultiSelectOption[];

  value?: string[];

  defaultValue?: string[];

  placeholder?: string;

  required?: boolean;

  disabled?: boolean;

  error?: boolean;

  onChange?: (value: string[]) => void;
}

const MultiSelect = ({
  id,
  label,
  description,

  options = [],

  value,
  defaultValue = [],

  placeholder = "Select options",

  required = false,

  disabled = false,

  error = false,

  onChange,
}: MultiSelectProps) => {
  const wrapperRef =
    useRef<HTMLDivElement | null>(null);

  const selectedValuesRef =
    useRef<HTMLDivElement | null>(null);

  const measurementRef =
    useRef<HTMLDivElement | null>(null);

  const moreButtonMeasureRef =
    useRef<HTMLButtonElement | null>(null);

  const [internalValue, setInternalValue] =
    useState<string[]>(defaultValue);

  const [isOpen, setIsOpen] =
    useState(false);

  const [isSelectedPopupOpen, setIsSelectedPopupOpen] =
    useState(false);

  const [visibleTagCount, setVisibleTagCount] =
    useState<number>(0);

  /*
   * Controlled / uncontrolled support
   */
  const selectedValues =
    value ?? internalValue;

  /*
   * Selected option objects
   */
  const selectedOptions = useMemo(() => {
    return options.filter((option) =>
      selectedValues.includes(option.value)
    );
  }, [
    options,
    selectedValues,
  ]);

  /*
   * Visible and hidden options
   */
  const visibleSelectedOptions =
    selectedOptions.slice(
      0,
      visibleTagCount
    );

  const hiddenSelectedOptions =
    selectedOptions.slice(
      visibleTagCount
    );

  const hiddenSelectedCount =
    hiddenSelectedOptions.length;

  /*
   * Close menus when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
        setIsSelectedPopupOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * Update selected values
   */
  const updateValue = (
    nextValue: string[]
  ) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  /*
   * Toggle option
   */
  const handleOptionToggle = (
    optionValue: string
  ) => {
    const isSelected =
      selectedValues.includes(
        optionValue
      );

    const nextValue = isSelected
      ? selectedValues.filter(
          (item) =>
            item !== optionValue
        )
      : [
          ...selectedValues,
          optionValue,
        ];

    updateValue(nextValue);
  };

  /*
   * Remove selected option
   */
 const handleRemove = (
  event: React.MouseEvent,
  optionValue: string
) => {
  event.stopPropagation();

  const nextValue =
    selectedValues.filter(
      (item) =>
        item !== optionValue
    );

  updateValue(nextValue);
};

  /*
   * Toggle main dropdown
   */
  const handleTriggerClick = () => {
    if (disabled) return;

    setIsOpen((current) =>
      !current
    );

    setIsSelectedPopupOpen(false);
  };

  /*
   * Calculate how many tags fit
   *
   * Hidden measurement elements are used so
   * the calculation is based on actual widths.
   */
  const calculateVisibleTags = useCallback(() => {
  const container =
    selectedValuesRef.current;

  const measurementContainer =
    measurementRef.current;

  if (
    !container ||
    !measurementContainer
  ) {
    return;
  }

  if (selectedOptions.length === 0) {
    setVisibleTagCount(0);
    return;
  }

  const availableWidth =
    container.clientWidth;

  if (availableWidth <= 0) {
    return;
  }

  const tagElements =
    measurementContainer.querySelectorAll(
      '[data-measure-tag="true"]'
    );

  const moreButton =
    moreButtonMeasureRef.current;

  if (!moreButton) {
    return;
  }

  const moreButtonWidth =
    moreButton.offsetWidth;

  let usedWidth = 0;
  let count = 0;

  tagElements.forEach(
    (element, index) => {
      const tagWidth =
        (element as HTMLElement)
          .offsetWidth;

      const remainingCount =
        selectedOptions.length -
        index -
        1;

      const requiredWidth =
        tagWidth +
        (count > 0 ? 6 : 0) +
        (remainingCount > 0
          ? moreButtonWidth + 6
          : 0);

      if (
        usedWidth + requiredWidth <=
        availableWidth
      ) {
        usedWidth +=
          tagWidth +
          (count > 0 ? 6 : 0);

        count += 1;
      }
    }
  );

  if (
    count === 0 &&
    selectedOptions.length > 0
  ) {
    count = 1;
  }

  setVisibleTagCount(count);
}, [selectedOptions]);

  /*
   * Recalculate after selection changes
   */
useLayoutEffect(() => {
   const frame = requestAnimationFrame(() => {
    calculateVisibleTags();
  });

  return () => {
    cancelAnimationFrame(frame);
  };
}, [calculateVisibleTags]);

  /*
   * Recalculate when width changes
   */
  useEffect(() => {
    const container =
      selectedValuesRef.current;

    if (!container) {
      return;
    }

    const resizeObserver =
      new ResizeObserver(() => {
        calculateVisibleTags();
      });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateVisibleTags]);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
    >
      {/* ================= LABEL ================= */}

      {label && (
        <label
          htmlFor={id}
          className={styles.label}
        >
          {label}

          {required && (
            <span
              className={styles.required}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      {/* ================= SELECT ================= */}

      <div
        className={[
          styles.selectWrapper,

          isOpen
            ? styles.open
            : "",

          disabled
            ? styles.disabled
            : "",

          error
            ? styles.error
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* ================= TRIGGER ================= */}

        <button
          id={id}
          type="button"
          className={styles.trigger}
          onClick={handleTriggerClick}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div
            ref={selectedValuesRef}
            className={styles.selectedValues}
          >
            {selectedOptions.length === 0 ? (
              <span
                className={
                  styles.placeholder
                }
              >
                {placeholder}
              </span>
            ) : (
              <>
                {visibleSelectedOptions.map(
                  (option) => (
                    <span
                      key={option.value}
                      className={styles.tag}
                    >
                      <span
                        className={
                          styles.tagLabel
                        }
                      >
                        {option.label}
                      </span>

                      <button
                        type="button"
                        className={
                          styles.removeTag
                        }
                        onClick={(event) =>
                          handleRemove(
                            event,
                            option.value
                          )
                        }
                        aria-label={`Remove ${String(
                          option.label
                        )}`}
                      >
                        ×
                      </button>
                    </span>
                  )
                )}

                {/* +N BUTTON */}

                {hiddenSelectedCount > 0 && (
                  <button
                    type="button"
                    className={
                      styles.moreCount
                    }
                    onClick={(event) => {
                      event.stopPropagation();

                      setIsSelectedPopupOpen(
                        (current) =>
                          !current
                      );

                      setIsOpen(false);
                    }}
                    aria-expanded={
                      isSelectedPopupOpen
                    }
                  >
                    +{hiddenSelectedCount}
                  </button>
                )}
              </>
            )}
          </div>

          {/* ARROW */}

          <span
            className={[
              styles.arrow,

              isOpen
                ? styles.arrowOpen
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          />
        </button>

        {/* ================= SELECTED OPTIONS POPUP ================= */}

        {isSelectedPopupOpen &&
          hiddenSelectedCount > 0 && (
            <div
              className={
                styles.selectedPopup
              }
              role="dialog"
              aria-label="Hidden selected options"
            >
              <div
                className={
                  styles.selectedPopupContent
                }
              >
                {hiddenSelectedOptions.map(
                  (option) => (
                    <div
                      key={option.value}
                      className={
                        styles.selectedPopupItem
                      }
                    >
                      <span
                        className={
                          styles.tagLabel
                        }
                      >
                        {option.label}
                      </span>

                      <button
                        type="button"
                        className={
                          styles.popupRemove
                        }
                        onClick={(event) =>
                          handleRemove(
                            event,
                            option.value
                          )
                        }
                        aria-label={`Remove ${String(
                          option.label
                        )}`}
                      >
                        ×
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

        {/* ================= MAIN DROPDOWN ================= */}

        {isOpen && (
          <div
            className={
              styles.dropdown
            }
            role="listbox"
            aria-multiselectable="true"
          >
            {options.map(
              (option) => {
                const isSelected =
                  selectedValues.includes(
                    option.value
                  );

                return (
                  <label
                    key={option.value}
                    className={[
                      styles.option,

                      isSelected
                        ? styles.optionSelected
                        : "",

                      option.disabled
                        ? styles.optionDisabled
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={
                        option.disabled
                      }
                      onChange={() =>
                        handleOptionToggle(
                          option.value
                        )
                      }
                    />

                    <span>
                      {option.label}
                    </span>
                  </label>
                );
              }
            )}
          </div>
        )}

        {/* ================= HIDDEN MEASUREMENT AREA ================= */}

        <div
          ref={measurementRef}
          className={
            styles.measurement
          }
          aria-hidden="true"
        >
          {selectedOptions.map(
            (option) => (
              <span
                key={option.value}
                data-measure-tag="true"
                className={styles.tag}
              >
                <span
                  className={
                    styles.tagLabel
                  }
                >
                  {option.label}
                </span>

                <span
                  className={
                    styles.removeTag
                  }
                >
                  ×
                </span>
              </span>
            )
          )}

          <button
            ref={moreButtonMeasureRef}
            type="button"
            className={
              styles.moreCount
            }
          >
            +99
          </button>
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}

      {description && (
        <div
          className={
            styles.description
          }
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;