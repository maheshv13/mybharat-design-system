import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

import styles from "./Text.module.css";

const COLOR_TOKENS = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",

  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
  info: "var(--color-info)",

  white: "var(--color-white)",
  black: "var(--color-black)",

  inherit: "inherit",
  current: "currentColor",
} as const;

export type TextColor = keyof typeof COLOR_TOKENS;

export type TextVariant =
  | "base"
  | "title1"
  | "title2"
  | "title3"
  | "label1"
  | "label2"
  | "label3"
  | "helper"
  | "withBorder"
  | "success"
  | "error"
  | "warning"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | (string & {});

type TextOwnProps<T extends ElementType> = {
  children?: ReactNode;
  className?: string;

  /**
   * HTML element to render.
   *
   * Examples:
   * as="p"
   * as="div"
   * as="h1"
   */
  as?: T;

  /**
   * Design-system text style.
   */
  variant?: TextVariant;

  /**
   * Design-system color token or CSS color value.
   */
  color?: TextColor | (string & {});

  style?: CSSProperties;
};

export type TextProps<T extends ElementType = "span"> =
  TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;

const HEADING_VARIANTS = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
} as const;

const Text = <T extends ElementType>({
  children,
  className = "",
  as,
  variant = "base",
  color = "",
  style,
  ...props
}: TextProps<T>) => {
  const isHeading = variant in HEADING_VARIANTS;

  const defaultTag: ElementType = isHeading
    ? (variant as ElementType)
    : "span";

  const Component: ElementType = as ?? defaultTag;

  const variantClass = styles[variant];

  const headingClass = isHeading
    ? styles.heading
    : "";

  const classes = [
    styles.text,
    headingClass,
    variantClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textStyle: CSSProperties = {
    ...(color
      ? {
          color:
            COLOR_TOKENS[color as TextColor] ?? color,
        }
      : {}),
    ...style,
  };

  return (
    <Component
      className={classes}
      style={textStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
