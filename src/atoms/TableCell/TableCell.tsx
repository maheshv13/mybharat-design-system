import styles from "./TableCell.module.css";
import type { HTMLAttributes, ReactNode } from "react";

type TableCellTag = "td" | "th";
type TableCellAlign = "left" | "right" | "center";

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  as?: TableCellTag;
  children?: ReactNode;
  align?: TableCellAlign;
}

const TableCell = ({
  as:Component = "td",
  children,
  align = "left" // left | right | center
}: TableCellProps) => {
  return (
      <Component
        className={`${styles.cell} ${styles[align]}`}
      >
      {children}
      </Component>
  );    
}

export default TableCell;
