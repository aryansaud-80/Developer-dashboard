import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import truncate from 'truncate-html';

const TodoCard = ({ todo }) => {
  const cleanHtml = DOMPurify.sanitize(todo.description);
  const maxLength = cleanHtml.length > 100 ? 40 : cleanHtml.length;
  const truncatedHtml = truncate(cleanHtml, maxLength, { ellipsis: '...' });
  const navigateToDetails = useNavigate();

  return (
    <section
      className='flex flex-col gap-5 p-5 max-w-md border border-gray-300 rounded-md
        bg-white shadow-sm cursor-pointer
        hover:shadow-md transition-shadow duration-200'
    >
      <div className='flex flex-col gap-2'>
        <h3 className='text-2xl font-semibold text-slate-900'>{todo.title}</h3>

        <div
          className='text-gray-600 leading-relaxed desc'
          dangerouslySetInnerHTML={{ __html: truncatedHtml }}
        />

        <span className='text-sm text-gray-600'>
          Due Date:{' '}
          {new Date(todo.dueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>

        <span className={`inline-block text-slate-600 text-xs font-medium px-3 py-1 rounded-md w-max ${todo.completed ? 'bg-green-300' : 'bg-amber-300'}`}>
          {todo.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      <button
        className='mt-auto bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-md py-3 text-lg
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-1'
        onClick={() => navigateToDetails(`/todo-list/${todo._id}`)}
      >
        View Details
      </button>
    </section>
  );
};

export default TodoCard;
