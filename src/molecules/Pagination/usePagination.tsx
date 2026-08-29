import { useMemo } from "react";

export interface UsePaginationOptions {
  currentPage: number;
  totalItems: number;
  rowsPerPage: number;
  maxVisiblePages?: number;
}

export interface PaginationResult {
  totalPages: number;
  pages: number[];
  start: number;
  end: number;
  range: { from: number; to: number; total: number };
}

const usePagination = ({
  currentPage,
  totalItems,
  rowsPerPage,
  maxVisiblePages = 5
}: UsePaginationOptions): PaginationResult => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  /* Page numbers logic */
  const { pages, start, end } = useMemo(() => {
    const pages: number[] = [];

    let start = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );

    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return { pages, start, end };
  }, [currentPage, totalPages, maxVisiblePages]);

  /* Item range (Showing X–Y of Z) */
  const range = useMemo(() => {
    if (totalItems === 0) {
      return { from: 0, to: 0, total: 0 };
    }

    const from = (currentPage - 1) * rowsPerPage + 1;
    const to = Math.min(currentPage * rowsPerPage, totalItems);

    return { from, to, total: totalItems };
  }, [currentPage, rowsPerPage, totalItems]);

  return {
    totalPages,
    pages,
    start,
    end,
    range
  };
};

export default usePagination;
