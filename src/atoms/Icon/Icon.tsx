import { ICON_REGISTRY } from "./iconRegistry";
import type { CSSProperties, SVGAttributes } from "react";
import styles from "./Icon.module.css";

const ICON_SIZES = {
  xs: "0.75rem",
  sm: "1rem",
  md: "1.25rem",
  lg: "1.75rem",
  xl: "2.25rem",
  xxl: "2.75rem",
  xxxl: "3.25rem",
};

const PADDING_MAP = {
  xs: 6,
  sm: 8,
  md: 8,
  lg: 10,
  xl: 12,
};

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
};

export type IconName = keyof typeof ICON_REGISTRY;
type IconSize = keyof typeof ICON_SIZES | "inherit" | number;
type IconColor = keyof typeof COLOR_TOKENS | (string & {});
type IconRounded = "full" | "lg" | "default";

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "color"> {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  background?: boolean;
  backgroundColor?: string;
  rounded?: IconRounded;
  padding?: number;
}

const Icon = ({
  name,
  size = "inherit",
  color = "current",
  className = "",
  background = false,
  backgroundColor,
  rounded = "full",
  padding,
  ...props
}: IconProps) => {
  const Component = ICON_REGISTRY[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  const iconSize =
    typeof size === "number"
      ? `${size}px`
      : size === "inherit"
      ? "1em"
      : ICON_SIZES[size] || ICON_SIZES.md;

  const computedPadding =
    padding ??
    (size === "inherit"
      ? 6
      : (typeof size === "string" && size in PADDING_MAP
          ? PADDING_MAP[size as keyof typeof PADDING_MAP]
          : undefined) || PADDING_MAP.md);

  const wrapperStyle: CSSProperties = {
    fontSize: iconSize,
    color: COLOR_TOKENS[color as keyof typeof COLOR_TOKENS] || color,

    ...(background && {
      backgroundColor:
        backgroundColor || "var(--color-neutralColor50)",
      padding: `${computedPadding}px`,
    }),
  };

  const wrapperClasses = [
    styles.icon,
    background ? styles.background : "",
    background && rounded === "full" ? styles.roundedFull : "",
    background && rounded === "lg" ? styles.roundedLarge : "",
    background && rounded === "default" ? styles.roundedDefault : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <span style={wrapperStyle} className={wrapperClasses}>
      <Component size="1em" {...props} />
    </span>
  );
};

export default Icon;
