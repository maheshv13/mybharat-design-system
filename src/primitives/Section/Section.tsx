import Container from "../Container/Container";
import styles from "./Section.module.css";
import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

const spacingMap = {
  none: "var(--space-0)",
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)",
  xxl: "var(--space-2xl)",
  xxxl: "var(--space-3xl)",
};

type SectionOwnProps<T extends ElementType> = {
  children?: ReactNode;
  as?: T;
  contained?: boolean;
  containerSize?: string | number;
  spaceY?: string;
  spaceX?: string;
  spaceTop?: string;
  spaceBottom?: string;
  spaceLeft?: string;
  spaceRight?: string;
  bg?: string;
  className?: string;
  id?: string;
  variant?: string;
};

export type SectionProps<T extends ElementType = "section"> = SectionOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof SectionOwnProps<T>>;

const Section = <T extends ElementType = "section">({
  children,
  as,
  contained = false,
  containerSize,
  spaceY = "md",
  spaceX = "md",
  spaceTop,
  spaceBottom,
  spaceLeft,
  spaceRight,
  bg,
  className = "",
  id,
  ...props
}: SectionProps<T>) => {

  const Component: ElementType = as || "section";

  const paddingTop = spaceTop
    ? spacingMap[spaceTop as keyof typeof spacingMap]
    : spacingMap[spaceY as keyof typeof spacingMap];

  const paddingBottom = spaceBottom
    ? spacingMap[spaceBottom as keyof typeof spacingMap]
    : spacingMap[spaceY as keyof typeof spacingMap];

  const paddingLeft = spaceLeft
    ? spacingMap[spaceLeft as keyof typeof spacingMap]
    : spacingMap[spaceX as keyof typeof spacingMap];

  const paddingRight = spaceRight
    ? spacingMap[spaceRight as keyof typeof spacingMap]
    : spacingMap[spaceX as keyof typeof spacingMap];

  const sectionStyle: CSSProperties = {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  };

  const classes = [styles.section];

  if (bg) {
    classes.push(styles[`bg-${bg}`]);
  }

  if (className) {
    classes.push(className);
  }

  const content = contained ? (
    <Container size={containerSize}>
      {children}
    </Container>
  ) : (
    children
  );

  return (
    <Component
      id={id}
      className={classes.join(" ")}
      style={sectionStyle}
      {...props}
    >
      {content}
    </Component>
  );
};

export default Section;
