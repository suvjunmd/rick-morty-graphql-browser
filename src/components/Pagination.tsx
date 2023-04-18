interface PaginationProps {
  page: number;
  totalPages: number;
  onNavigateToPage: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onNavigateToPage,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button onClick={() => onNavigateToPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <div className="page-number">
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
