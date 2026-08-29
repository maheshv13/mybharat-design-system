import styles from "./Grid.module.css";
import type { CSSProperties, ReactNode } from "react";

export interface GridProps {
  children?: ReactNode;
  cols?: string;
  gap?: string;
  className?: string;
}

const Grid = ({
  children,
  cols = "1 1 1",
  gap = "md",
  className = "",
}: GridProps) => {

  const [mobile, tablet, desktop] = cols.split(" ");

  const gridStyle: CSSProperties & Record<"--cols-mobile" | "--cols-tablet" | "--cols-desktop", string> = {
    "--cols-mobile": mobile,
    "--cols-tablet": tablet || mobile,
    "--cols-desktop": desktop || tablet || mobile,
  };

  const classes = [
    styles.grid,
    styles[`gap-${gap}`]
  ];

  if (className) classes.push(className);

  return (
    <div
      className={classes.join(" ")}
      style={gridStyle}
    >
      {children}
    </div>
  );
};

export default Grid;
