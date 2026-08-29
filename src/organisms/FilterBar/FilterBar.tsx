import { useState, useMemo } from "react";
import type { ChangeEvent, ReactNode } from "react";

import Input from "../../atoms/Input/Input/Input";
import Select from "../../atoms/SelectBox/Select/Select";
import Button from "../../atoms/Button/Button";
import Section from "../../primitives/Section/Section";

import styles from "./FilterBar.module.css";

export interface FilterOption {
  value: string;
  label: string;
}

export type FilterValue = string | string[] | boolean;

export type FilterValues = Record<string, FilterValue>;

export type FilterFieldType =
  | "input"
  | "select"
  | "checkbox"
  | "radio";

export interface FilterField {
  name: string;
  label: string;
  type: FilterFieldType;

  placeholder?: string;

  options?: Array<string | FilterOption>;

  /**
   * Disable the field based on current values.
   */
  disabled?: (filters: FilterValues) => boolean;

  /**
   * Completely hide the field.
   */
  hidden?: (
    showMore: boolean,
    filters: FilterValues
  ) => boolean;

  /**
   * Optional field-level UI callback.
   */
  onChange?: (
    value: FilterValue,
    filters: FilterValues
  ) => void;
}

export interface FilterBarProps {
  config?: FilterField[];
  filters?: FilterValues;
  onChange?: (
    filters: FilterValues
  ) => void;
  onApply?: (
    filters: FilterValues
  ) => void;
  onClear?: () => void;
  variant?: string;
  title?: ReactNode;
  showActions?: boolean;
}

const INITIAL_VISIBLE = 4;

const FilterBar = ({
  config = [],
  filters = {},
  onChange,
  onApply,
  onClear,
  variant = "overlay",
  title = "Filter By:",
  showActions = true,
}: FilterBarProps) => {
  const [showMore, setShowMore] =
    useState(false);

  /*
   * Update a field.
   *
   * The actual filter state belongs
   * to the parent/page.
   */
  const handleChange = (
    name: string,
    value: FilterValue,
    field: FilterField
  ) => {
    const updatedFilters = {
      ...filters,
      [name]: value,
    };

    field.onChange?.(
      value,
      updatedFilters
    );

    onChange?.(updatedFilters);
  };

  /*
   * Check whether any filter
   * currently contains a value.
   */
  const hasFilters = useMemo(() => {
    return Object.values(filters).some(
      (value) => {
        if (
          value === undefined ||
          value === null
        ) {
          return false;
        }

        if (typeof value === "string") {
          return (
            value !== "" &&
            value !== "All"
          );
        }

        if (Array.isArray(value)) {
          return value.length > 0;
        }

        if (typeof value === "boolean") {
          return value;
        }

        return false;
      }
    );
  }, [filters]);

  /*
   * Fields visible according to
   * Show More state.
   */
  const visibleFields = config.filter(
    (field, index) => {
      if (
        field.hidden?.(
          showMore,
          filters
        )
      ) {
        return false;
      }

      return (
        showMore ||
        index < INITIAL_VISIBLE
      );
    }
  );

  /*
   * Clear button.
   *
   * Parent owns the actual values.
   */
  const handleClear = () => {
    onClear?.();
  };

  return (
    <Section
      contained
      spaceY="none"
      spaceX="none"
      variant={variant}
    >
      <div className={styles.wrapper}>
        {title && (
          <h6 className={styles.title}>
            {title}
          </h6>
        )}

        {/* ================= FIELDS ================= */}

        <div className={styles.fields}>
          {visibleFields.map((field) => {
            const value =
              filters[field.name];

            const normalizedOptions =
              (field.options || []).map(
                (option) =>
                  typeof option === "string"
                    ? {
                        value: option,
                        label: option,
                      }
                    : option
              );

            /* ================= INPUT ================= */

            if (field.type === "input") {
              return (
                <div
                  key={field.name}
                  className={styles.field}
                >
                  <Input
                    label={field.label}
                    variant="filter"
                    placeholder={
                      field.placeholder
                    }
                    value={
                      typeof value === "string"
                        ? value
                        : ""
                    }
                    disabled={
                      field.disabled?.(
                        filters
                      )
                    }
                    onChange={(
                      event: ChangeEvent<HTMLInputElement>
                    ) =>
                      handleChange(
                        field.name,
                        event.target.value,
                        field
                      )
                    }
                  />
                </div>
              );
            }

            /* ================= SELECT ================= */

            if (field.type === "select") {
              return (
                <div
                  key={field.name}
                  className={styles.field}
                >
                  <Select
                    label={field.label}
                    variant="filter"
                    options={
                      normalizedOptions
                    }
                    value={
                      typeof value === "string"
                        ? value
                        : ""
                    }
                    disabled={
                      field.disabled?.(
                        filters
                      )
                    }
                    onChange={(newValue) =>
                      handleChange(
                        field.name,
                        newValue,
                        field
                      )
                    }
                  />
                </div>
              );
            }

            /*
             * Checkbox and Radio rendering
             * should use your existing atoms.
             *
             * These sections are intentionally
             * prepared for integration.
             */

            if (
              field.type === "checkbox"
            ) {
              return (
                <div
                  key={field.name}
                  className={styles.field}
                >
                  <span
                    className={
                      styles.fieldLabel
                    }
                  >
                    {field.label}
                  </span>

                  <div
                    className={
                      styles.optionGroup
                    }
                  >
                    {normalizedOptions.map(
                      (option) => {
                        const currentValue =
                          Array.isArray(value)
                            ? value
                            : [];

                        const isChecked =
                          currentValue.includes(
                            option.value
                          );

                        return (
                          <label
                            key={option.value}
                            className={
                              styles.option
                            }
                          >
                            <input
                              type="checkbox"
                              value={
                                option.value
                              }
                              checked={
                                isChecked
                              }
                              disabled={
                                field.disabled?.(
                                  filters
                                )
                              }
                              onChange={(event) => {
                                const updatedValue =
                                  event.target
                                    .checked
                                    ? [
                                        ...currentValue,
                                        option.value,
                                      ]
                                    : currentValue.filter(
                                        (item) =>
                                          item !==
                                          option.value
                                      );

                                handleChange(
                                  field.name,
                                  updatedValue,
                                  field
                                );
                              }}
                            />

                            <span>
                              {option.label}
                            </span>
                          </label>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            }

            /* ================= RADIO ================= */

            if (
              field.type === "radio"
            ) {
              return (
                <div
                  key={field.name}
                  className={styles.field}
                >
                  <span
                    className={
                      styles.fieldLabel
                    }
                  >
                    {field.label}
                  </span>

                  <div
                    className={
                      styles.optionGroup
                    }
                  >
                    {normalizedOptions.map(
                      (option) => (
                        <label
                          key={option.value}
                          className={
                            styles.option
                          }
                        >
                          <input
                            type="radio"
                            name={field.name}
                            value={
                              option.value
                            }
                            checked={
                              value ===
                              option.value
                            }
                            disabled={
                              field.disabled?.(
                                filters
                              )
                            }
                            onChange={() =>
                              handleChange(
                                field.name,
                                option.value,
                                field
                              )
                            }
                          />

                          <span>
                            {option.label}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* ================= ACTIONS ================= */}

        {(config.length >
          INITIAL_VISIBLE ||
          showActions) && (
          <div className={styles.actions}>
            {/* Show More */}

            {config.length >
              INITIAL_VISIBLE && (
              <button
                type="button"
                className={styles.toggle}
                onClick={() =>
                  setShowMore(
                    (previous) =>
                      !previous
                  )
                }
              >
                {showMore
                  ? "Show Less"
                  : "Show More"}
              </button>
            )}

            {/* Buttons */}

            {showActions && (
              <div
                className={
                  styles.buttons
                }
              >
                <Button
                  label="Clear"
                  variant="primary-outlined"
                  disabled={!hasFilters}
                  onClick={
                    handleClear
                  }
                />

                <Button
                  label="Apply"
                  variant="primary"
                  disabled={!hasFilters}
                  onClick={() =>
                    onApply?.(
                      filters
                    )
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
};

export default FilterBar;