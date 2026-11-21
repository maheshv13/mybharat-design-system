import { useMemo, useState } from "react";
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
   * Dynamically disable the field based on current filter values.
   */
  disabled?: (filters: FilterValues) => boolean;

  /**
   * Dynamically hide the field based on current filter values.
   */
  hidden?: (
    showMore: boolean,
    filters: FilterValues
  ) => boolean;

  /**
   * Field-level change callback.
   */
  onChange?: (
    value: FilterValue,
    filters: FilterValues
  ) => void;
}

export interface FilterBarProps {
  config?: FilterField[];

  /**
   * Controlled filter values.
   */
  filters?: FilterValues;

  /**
   * Called whenever any filter changes.
   */
  onChange?: (filters: FilterValues) => void;

  /**
   * Called when Apply is clicked.
   */
  onApply?: (filters: FilterValues) => void;

  /**
   * Called when Clear is clicked.
   *
   * The parent component should reset `filters`.
   */
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
  const [showMore, setShowMore] = useState(false);

  /**
   * Normalize all filter options into:
   *
   * {
   *   value: string;
   *   label: string;
   * }
   */
  const normalizeOptions = (
    options: Array<string | FilterOption> = []
  ): FilterOption[] => {
    return options.map((option) =>
      typeof option === "string"
        ? {
            value: option,
            label: option,
          }
        : option
    );
  };

  /**
   * Fields that are allowed to participate in the filter UI.
   *
   * Important:
   *
   * We calculate hidden fields before applying INITIAL_VISIBLE.
   * This prevents a hidden field from consuming one of the
   * first four visible slots.
   */
  const eligibleFields = useMemo(() => {
    return config.filter(
      (field) =>
        !(field.hidden?.(showMore, filters) ?? false)
    );
  }, [config, filters, showMore]);

  /**
   * Fields displayed in the current state.
   */
  const visibleFields = useMemo(() => {
    if (showMore) {
      return eligibleFields;
    }

    return eligibleFields.slice(0, INITIAL_VISIBLE);
  }, [eligibleFields, showMore]);

  /**
   * Whether there are additional fields that can be shown.
   */
  const hasMoreFields =
    eligibleFields.length > INITIAL_VISIBLE;

  /**
   * Determines whether a filter has an active value.
   *
   * Empty strings and "All" are treated as default values.
   */
  const hasFilters = useMemo(() => {
    return Object.values(filters).some((value) => {
      if (value === undefined || value === null) {
        return false;
      }

      if (typeof value === "string") {
        return value.trim() !== "" && value !== "All";
      }

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      if (typeof value === "boolean") {
        return value;
      }

      return false;
    });
  }, [filters]);

  /**
   * Update one filter value.
   */
  const handleChange = (
    name: string,
    value: FilterValue,
    field: FilterField
  ) => {
    const updatedFilters: FilterValues = {
      ...filters,
      [name]: value,
    };

    field.onChange?.(value, updatedFilters);

    onChange?.(updatedFilters);
  };

  /**
   * Input change handler.
   */
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: FilterField
  ) => {
    handleChange(
      field.name,
      event.target.value,
      field
    );
  };

  /**
   * Toggle Show More / Show Less.
   */
  const handleToggle = () => {
    setShowMore((previous) => !previous);
  };

  /**
   * Clear filters.
   *
   * FilterBar remains controlled, therefore the parent
   * must reset the filters inside onClear.
   */
  const handleClear = () => {
    if (!hasFilters) {
      return;
    }

    onClear?.();
  };

  /**
   * Apply current filters.
   */
  const handleApply = () => {
    if (!hasFilters) {
      return;
    }

    onApply?.(filters);
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

        <div className={styles.fields}>
          {visibleFields.map((field) => {
            const value = filters[field.name];

            const disabled =
              field.disabled?.(filters) ?? false;

            const normalizedOptions =
              normalizeOptions(field.options);

            /**
             * INPUT / SEARCH
             */
            if (field.type === "input") {
              return (
                <div
                  key={field.name}
                  className={styles.field}
                >
                  <Input
                    label={field.label}
                    variant="filter"
                    placeholder={field.placeholder}
                    value={
                      typeof value === "string"
                        ? value
                        : ""
                    }
                    disabled={disabled}
                    onChange={(event) =>
                      handleInputChange(
                        event,
                        field
                      )
                    }
                  />
                </div>
              );
            }

            /**
             * SELECT
             */
            if (field.type === "select") {
              return (
                <div
                  key={field.name}
                  className={styles.field}
                >
                  <Select
                    label={field.label}
                    variant="filter"
                    options={normalizedOptions}
                    value={
                      typeof value === "string"
                        ? value
                        : ""
                    }
                    disabled={disabled}
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

            /**
             * CHECKBOX
             */
            if (field.type === "checkbox") {
              const currentValue = Array.isArray(value)
                ? value
                : [];

              return (
                <fieldset
                  key={field.name}
                  className={styles.field}
                  disabled={disabled}
                >
                  <legend
                    className={styles.fieldLabel}
                  >
                    {field.label}
                  </legend>

                  <div
                    className={styles.optionGroup}
                  >
                    {normalizedOptions.map(
                      (option) => {
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
                              checked={isChecked}
                              disabled={disabled}
                              onChange={(
                                event
                              ) => {
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
                </fieldset>
              );
            }

            /**
             * RADIO
             */
            if (field.type === "radio") {
              return (
                <fieldset
                  key={field.name}
                  className={styles.field}
                  disabled={disabled}
                >
                  <legend
                    className={styles.fieldLabel}
                  >
                    {field.label}
                  </legend>

                  <div
                    className={styles.optionGroup}
                  >
                    {normalizedOptions.map(
                      (option) => {
                        const isChecked =
                          value ===
                          option.value;

                        return (
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
                              checked={isChecked}
                              disabled={disabled}
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
                        );
                      }
                    )}
                  </div>
                </fieldset>
              );
            }

            return null;
          })}
        </div>

        {(hasMoreFields || showActions) && (
          <div className={styles.actions}>
            {hasMoreFields && (
              <button
                type="button"
                className={styles.toggle}
                onClick={handleToggle}
                aria-expanded={showMore}
              >
                {showMore
                  ? "Show Less"
                  : "Show More"}
              </button>
            )}

            {showActions && (
              <div className={styles.buttons}>
                <Button
                  label="Clear"
                  variant="primary-outlined"
                  disabled={!hasFilters}
                  onClick={handleClear}
                />

                <Button
                  label="Apply"
                  variant="primary"
                  disabled={!hasFilters}
                  onClick={handleApply}
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