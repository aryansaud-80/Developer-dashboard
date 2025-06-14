const TodoCard = () => {
  const html = `<div class="todo-description">Buy milk, eggs, bread, and fruits from the supermarket.</div>`;

  return (
    <section
      className='flex flex-col gap-5 p-5 max-w-md border border-gray-300 rounded-md
        bg-white shadow-sm cursor-pointer
        hover:shadow-md transition-shadow duration-200'
    >
      <div className='flex flex-col gap-2'>
        <h3 className='text-2xl font-semibold text-slate-900'>Title</h3>

        <p
          className='text-gray-600 leading-relaxed'
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <span className='text-sm text-gray-400'>Due: 2025-06-20</span>

        <span className='inline-block bg-slate-200 text-slate-600 text-xs font-medium px-3 py-1 rounded-md w-max'>
          Pending
        </span>
      </div>

      <button
        className='mt-auto bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-md py-3 text-lg
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-1'
      >
        View Details
      </button>
    </section>
  );
};

export default TodoCard;
