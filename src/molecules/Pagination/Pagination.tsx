import { Button } from "../../atoms/Button";
import styles from "./Pagination.module.css";
import usePagination from "./usePagination";

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  totalPages?: number;
}

const Pagination = ({
  currentPage,
  totalItems,
  rowsPerPage,
  onPageChange,
  maxVisiblePages
}: PaginationProps) => {
  const {
    totalPages,
    pages,
    end,
    range
  } = usePagination({
    currentPage,
    totalItems,
    rowsPerPage,
    maxVisiblePages
  });

  if (totalPages <= 1) return null;

  return (
    <div className={styles.paginationWrap}>
      {/* Info */}
      <div className={styles.info}>
        Showing <strong>{range.from}</strong>–
        <strong>{range.to}</strong> of{" "}
        <strong>{range.total}</strong> items
      </div>

      <nav className={styles.pagination} aria-label="Pagination" tabIndex={0}>
        {/* Prev */}
        <Button
          label="Prev"
          variant="primary-outlined"
          iconPosition="left"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />

        {/* Page numbers */}
        {pages.map(page => (
          <Button
            key={page}
            label={page}
            variant={
              page === currentPage
                ? "primary"
                : "primary-outlined"
            }
            onClick={() => onPageChange(page)}
          />
        ))}

        {/* Ellipsis */}
        {end < totalPages && (
          <span className={styles.dots}>...</span>
        )}

        {/* Next */}
        <Button
          label="Next"
          variant="primary-outlined"
          iconPosition="right"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </nav>
    </div>
  );
};

export default Pagination;
