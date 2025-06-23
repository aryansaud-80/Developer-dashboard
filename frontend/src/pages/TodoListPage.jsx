import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FunnelIcon from '../assets/icons/FunnelIcon';
import TodoCard from '../components/todo/TodoCard';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import PageHeader from '../components/pageHeader/PageHeader';
import { AlignJustify } from 'lucide-react';
import Pagination from '../components/pagination/Pagination';

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
        toast.error(error.message);
      }
    };

    fetchTodos();
  }, []);

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 md:ml-64'>
      <PageHeader
        Icon={AlignJustify}
        title={'Todo List'}
        description={'Manage your development tasks and track your progress'}
      />

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

      <div className='grid place-items-center grid-cols-1 sm:grid-cols-2  gap-6 lg:grid-cols-3'>
        {currentTodos.length > 0 ? (
          currentTodos.map((todo) => <TodoCard key={todo._id} todo={todo} />)
        ) : (
          <p className='text-gray-500 text-center col-span-full'>
            No Todo found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </section>
  );
};

export default TodoListPage;
