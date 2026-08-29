import styles from "./getLayoutClasses.module.css";

export const GRID_COLUMNS = {
  1: styles.gridColumns1,
  2: styles.gridColumns2,
  3: styles.gridColumns3,
  4: styles.gridColumns4,
} as const;

export const GAPS = {
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
} as const;

export type LayoutVariant = "vertical" | "horizontal";

export type Gap = keyof typeof GAPS;

export type Columns = keyof typeof GRID_COLUMNS;

export interface LayoutOptions {
  variant?: LayoutVariant;
  columns?: Columns;
  gap?: Gap;
}

export const getLayoutClasses = ({
  variant = "vertical",
  columns,
  gap = "md",
}: LayoutOptions): string => {
  const gapClass = GAPS[gap] ?? GAPS.md;

  if (variant === "vertical") {
    return [
      styles.vertical,
      gapClass,
    ].join(" ");
  }

  if (variant === "horizontal") {
    if (columns) {
      return [
        styles.grid,
        GRID_COLUMNS[columns],
        gapClass,
      ].join(" ");
    }

    return [
      styles.horizontal,
      gapClass,
    ].join(" ");
  }

  return "";
};