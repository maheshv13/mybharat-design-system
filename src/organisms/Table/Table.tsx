import { useState } from "react";
import TableHeaderRow from "../../molecules/TableHeaderRow/TableHeaderRow";
import TableRow from "../../molecules/TableRow/TableRow";
import Pagination from "../../molecules/Pagination/Pagination";
import type { ReactNode } from "react";
import type { TableColumn } from "../../molecules/TableHeaderRow/TableHeaderRow";
import styles from "./Table.module.css";

export interface TableProps {
  columns: TableColumn[];
  data: Array<Record<string, ReactNode>>;
  selectable?: boolean;
  actions?: boolean;
  serialnumber?: boolean;
  pagination?: boolean;
  rowsPerPage?: number;
}

const Table = ({
  columns,
  data,
  selectable = false,
  actions = false,
  serialnumber=false,
  pagination = false,
  rowsPerPage = 5
}: TableProps) => {

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = pagination
    ? Math.ceil(data.length / rowsPerPage)
    : 1;

  const displayedData = pagination
    ? data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : data;

  return(
    <div className={`${styles.tableResponsive}`}>
      <table>
        <thead>
          <TableHeaderRow 
          selectable={selectable}
          columns={columns}
          actions={actions}
          serialnumber={serialnumber}
          />
        </thead>
        <tbody>
          {displayedData.map((row, index) => {  
          return (
            <TableRow
              row={row}
              index={
                pagination
                  ? (currentPage - 1) * rowsPerPage + index
                  : index
              }
              selectable={selectable}
              actions={actions}
              serialnumber={serialnumber}
            />
          );
        })}

        </tbody>
      </table>

      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage ={rowsPerPage}
          totalItems={data.length}
          onPageChange={setCurrentPage}

        />
      )}
    </div>
  )
}

export default Table;