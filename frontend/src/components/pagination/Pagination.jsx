const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="flex justify-center gap-3 mt-6 items-center">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="btn-secondary"
        style={{ opacity: page === 1 ? 0.5 : 1 }}
      >
        Prev
      </button>
      <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="btn-secondary"
        style={{ opacity: page === totalPages ? 0.5 : 1 }}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
