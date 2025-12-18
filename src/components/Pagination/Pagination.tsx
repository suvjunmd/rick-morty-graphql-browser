import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onNavigateToPage: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onNavigateToPage,
}: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button onClick={() => onNavigateToPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <div className={styles.pageNumber}>
        page {page} of {totalPages}
      </div>
      <button
        onClick={() => onNavigateToPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
