import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarIcon from '../assets/icons/BarIcon';
import FunnelIcon from '../assets/icons/FunnelIcon';
import TodoCard from '../components/todo/TodoCard';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const TodoListPage = () => {
  const { todos, setTodos, BACKEND_URL, accessToken } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const todosPerPage = 6;
  const navigate = useNavigate();
  const totalPages = Math.ceil(todos.length / todosPerPage);
  const startIndex = (page - 1) * todosPerPage;
  const currentTodos = todos.slice(startIndex, startIndex + todosPerPage);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        axios.defaults.withCredentials = true;

        const { data } = await axios.get(`${BACKEND_URL}/todos`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (data.success) {
          setTodos(data.data);
          toast.success('To-Dos fetched successfully!');
        }
      } catch (error) {
        toast.error(
          'Failed to fetch To-Dos. Please check your connection or try again later.'
        );
      }
    };

    fetchTodos();
  }, []);

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 sm:ml-64'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10'>
          <div className='hidden sm:flex flex-shrink-0 bg-indigo-100 rounded-md p-3 items-center justify-center w-14 h-14'>
            <BarIcon className='w-7 h-7 text-indigo-600' />
          </div>

          <div className='text-center sm:text-left'>
            <h2 className='text-3xl sm:text-4xl font-extrabold leading-tight text-gray-800'>
              Todo List
            </h2>
            <p className='text-gray-500 font-medium mt-1 sm:mt-2 max-w-md mx-auto sm:mx-0'>
              Manage your development tasks and track your progress
            </p>
          </div>
        </div>

        <div className='w-full h-px bg-gray-200'></div>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0'>
        <h3 className='text-2xl font-semibold text-gray-800'>Your Tasks</h3>

        <div className='flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto'>
          <div className='relative w-full sm:w-48'>
            <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
              <FunnelIcon className='h-5 w-5 text-gray-400' />
            </div>
            <select
              id='task-category'
              className='appearance-none border border-gray-300 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
            >
              <option value='all'>All Categories</option>
              <option value='work'>Work</option>
              <option value='learning'>Learning</option>
              <option value='personal'>Personal</option>
            </select>
          </div>

          <button
            onClick={() => navigate('/add-todo')}
            className='w-full sm:w-auto bg-slate-600 text-white font-medium py-2 px-6 rounded-md hover:bg-slate-700 transition duration-200'
          >
            Add Todo
          </button>
        </div>
      </div>

      <div className='grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {currentTodos.map((todo) => (
          <TodoCard key={todo} todo={todo} />
        ))}
      </div>

      {page > 1 && (
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
      )}
    </section>
  );
};

export default TodoListPage;
