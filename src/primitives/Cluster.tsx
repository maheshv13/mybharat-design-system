import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styles from "./Cluster.module.css";

const GAPS = {
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl
};

const ALIGN = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd
};

const JUSTIFY = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
  around: styles.justifyAround,
  evenly: styles.justifyEvenly
};

type ClusterOwnProps<T extends ElementType> = {
  as?: T;
  gap?: string;
  align?: string;
  justify?: string;
  wrap?: boolean;
  className?: string;
  children?: ReactNode;
};

export type ClusterProps<T extends ElementType = "div"> = ClusterOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ClusterOwnProps<T>>;

const Cluster = <T extends ElementType = "div">({
  as,
  gap = "md",
  align = "center",
  justify = "start",
  wrap = true,
  className = "",
  children,
  ...props
}: ClusterProps<T>) => {
  const Component: ElementType = as || "div";

  const gapClass = GAPS[gap as keyof typeof GAPS] || GAPS.md;
  const alignClass = ALIGN[align as keyof typeof ALIGN] || ALIGN.center;
  const justifyClass = JUSTIFY[justify as keyof typeof JUSTIFY] || JUSTIFY.start;
  const wrapClass = wrap ? styles.wrap : styles.noWrap;

  const classes = [
    styles.cluster,
    wrapClass,
    gapClass,
    alignClass,
    justifyClass,
    className
  ].join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Cluster;
