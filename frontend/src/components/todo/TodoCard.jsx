import { useNavigate } from 'react-router-dom';

const TodoCard = ({ todo }) => {
  const navigateToDetails = useNavigate();

  return (
    <section className='flex flex-col justify-between p-5 w-full max-w-md h-full border border-gray-300 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow duration-200'>
      <div className='flex flex-col gap-2 flex-grow'>
        <h3 className='text-2xl font-semibold text-slate-900'>{todo.title}</h3>

        <span className='text-sm text-gray-600 mt-2'>
          Due Date:{' '}
          {new Date(todo.dueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>

        <span
          className={`inline-block text-slate-600 text-xs font-medium px-3 py-1 rounded-md w-max ${
            todo.completed ? 'bg-green-300' : 'bg-amber-300'
          }`}
        >
          {todo.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      <div className='mt-6'>
        <button
          className='w-full bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-md py-2 text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-1'
          onClick={() => navigateToDetails(`/todo-list/${todo._id}`)}
        >
          View Details
        </button>
      </div>
    </section>
  );
};

export default TodoCard;
