import styles from "./Stack.module.css";
import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

const GAPS = {
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)",
  xxl: "var(--space-2xl)",
  xxxl: "var(--space-3xl)",
  xxxxl: "var(--space-4xl)",
};

type StackOwnProps<T extends ElementType> = {
  as?: T;
  gap?: string;
  mobileGap?: string;
  className?: string;
  children?: ReactNode;
};

export type StackProps<T extends ElementType = "div"> = StackOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof StackOwnProps<T>>;

const Stack = <T extends ElementType = "div">({
  as,
  gap = "md",
  mobileGap = "md",
  className = "",
  children,
  ...props
}: StackProps<T>) => {
  const Component: ElementType = as || "div";
  const desktopGap = GAPS[gap as keyof typeof GAPS] || GAPS.md;
  const mobileGapValue = GAPS[mobileGap as keyof typeof GAPS] || desktopGap;

  const style: CSSProperties & Record<"--stack-gap" | "--stack-gap-mobile", string> = {
    "--stack-gap": desktopGap,
    "--stack-gap-mobile": mobileGapValue,
  };

  const classes = [
    styles.stack,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={classes}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Stack;
