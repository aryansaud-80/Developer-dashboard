const Pagination = ({page, setPage, totalPages}) => {
  return (
    <div className='flex justify-center gap-4 mt-6'>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className='px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-md disabled:opacity-50 hover:bg-indigo-200 transition'
      >
        Prev
      </button>
      <span className='flex items-center text-gray-700 font-medium'>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className='px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-md disabled:opacity-50 hover:bg-indigo-200 transition'
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
