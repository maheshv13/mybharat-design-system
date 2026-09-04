import { Checkbox } from "../../atoms/Input";
import TableCell from "../../atoms/TableCell/TableCell";

export interface TableColumn {
  key: string;
  label: React.ReactNode;
}

export interface TableHeaderRowProps {
  columns: TableColumn[];
  selectable?: boolean;
  actions?: boolean;
  serialnumber?: boolean;
}

const TableHeaderRow = ({
  columns,
  selectable=false,
  actions = false,
  serialnumber = false
}: TableHeaderRowProps) => {
  return (
      <tr>
        {selectable && (
          <TableCell as="th">
            <Checkbox/>
          </TableCell>
        )}

        {serialnumber && (
          <TableCell as="th">
            Sr. No.
          </TableCell>
        )}

        {
          columns.map((col) =>{
            return(
            <TableCell as="th" key={col.key}>
              {col.label}
            </TableCell>
          )})
        }
        {actions && (
        <th scope="col" aria-label="Actions">
          Actions
        </th>
        )}
      </tr>
  );
} 

export default TableHeaderRow;