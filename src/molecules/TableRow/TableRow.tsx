import { Checkbox } from "../../atoms/Input";
import TableCell from "../../atoms/TableCell/TableCell";
import RowAction from "../RowAction/RowAction";
import type { ReactNode } from "react";

export interface TableRowProps {
  row: Record<string, ReactNode>;
  selectable?: boolean;
  actions?: boolean;
  serialnumber?: boolean;
  index?: number;
  onEdit?: (row: Record<string, ReactNode>) => void;
  onDelete?: (row: Record<string, ReactNode>) => void;
}

const TableRow = ({
  row,
  selectable= false,
  actions = false,
  serialnumber = false,
  index = 0,
  onEdit,
  onDelete,
}: TableRowProps) => {
  return (

      <tr>
        {selectable && (
          <TableCell>
            <Checkbox/>
          </TableCell>
        )}

        {serialnumber && (
          <TableCell>
            {index + 1}
          </TableCell>
        )}

        {Object.values(row).map((value, index) => (       
        <TableCell key={index}>
          {value}
        </TableCell>
      ))}

       {/* Action column */}
       {actions && (
        <TableCell align="right">
          <RowAction
            onEdit={() => onEdit?.(row)}
            onDelete={() => onDelete?.(row)}
          />
        </TableCell>
       )}
      

      </tr>
  );
} 

export default TableRow;