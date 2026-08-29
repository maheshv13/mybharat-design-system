import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

const GAP_MAP = {
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)"
};

const WIDTH_MAP = {
  sm: "var(--size-card-sm)",
  md: "var(--size-card-md)",
  lg: "var(--size-card-lg)"
};

type SwitcherOwnProps<T extends ElementType> = {
  as?: T;
  gap?: string;
  minWidth?: string;
  className?: string;
  children?: ReactNode;
};

export type SwitcherProps<T extends ElementType = "div"> = SwitcherOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof SwitcherOwnProps<T>>;

const Switcher = <T extends ElementType = "div">({
  as,
  gap = "md",
  minWidth = "md",
  className = "",
  children,
  ...props
}: SwitcherProps<T>) => {
  const Component: ElementType = as || "div";

  const style: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: GAP_MAP[gap as keyof typeof GAP_MAP] || GAP_MAP.md
  };

  const childStyle: CSSProperties = {
    flexBasis: WIDTH_MAP[minWidth as keyof typeof WIDTH_MAP] || WIDTH_MAP.md,
    flexGrow: 1
  };

  const classes = [className].join(" ");

  return (
    <Component style={style} className={classes} {...props}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} style={childStyle}>
              {child}
            </div>
          ))
        : children}
    </Component>
  );
};

export default Switcher;
