import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import BarIcon from '../assets/icons/BarIcon';

const TodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { BACKEND_URL, accessToken, todo, setTodo } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        axios.defaults.withCredentials = true;

        const { data } = await axios.get(`${BACKEND_URL}/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (data.success) {
          setTodo(data.data);
          toast.success('To-Do loaded successfully!');
        } else {
          throw new Error('Failed to load To-Do');
        }
      } catch (error) {
        toast.error('Failed to load To-Do. Please try again later.');
      }
    };

    if (accessToken) {
      fetchTodo();
    } else {
      toast.error('Please log in to view this To-Do.');
    }
  }, [id]);

  const handleStatusToggle = async () => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      const { data } = await axios.patch(
        `${BACKEND_URL}/todos/${id}/status`,
        { completed: !todo.completed },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (data.success) {
        setTodo(updatedTodo);
        toast.success(
          `To-Do marked as ${updatedTodo.completed ? 'completed' : 'pending'}!`
        );
      }
    } catch (error) {
      toast.error('Failed to update To-Do status.');
    }
  };

  const handleEdit = () => {
    navigate(`/todos/edit/${id}`, {
      state: { todo },
    });
  };

  const handleDelete = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.delete(`${BACKEND_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (data.success) {
        toast.success('To-Do deleted successfully!');
        handleBack();
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setPopup(false);
    }
  };

  const handleBack = () => {
    navigate('/todo-list');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePopupConfirm = () => {
    handleDelete();
  };

  const handlePopupCancel = () => {
    setPopup(false);
  };

  const sanitizedDescription = DOMPurify.sanitize(todo.description);

  return (
    <section className='md:ml-64 px-6 py-10 min-h-screen bg-gray-50 relative'>
      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-6'>
        {isSidebarOpen && (
          <aside className='w-full lg:w-80 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 ease-in-out'>
            <h2 className='text-lg font-semibold text-slate-900 mb-4'>
              To-Do Details
            </h2>
            <div className='flex flex-col gap-4'>
              <div>
                <h3 className='text-sm font-semibold text-gray-700'>
                  Created At
                </h3>
                <p className='text-sm text-gray-500'>
                  {new Date(todo.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <h3 className='text-sm font-semibold text-gray-700'>
                  Last Updated
                </h3>
                <p className='text-sm text-gray-500'>
                  {new Date(todo.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <h3 className='text-sm font-semibold text-gray-700'>Tags</h3>
                <div className='flex flex-wrap gap-2 mt-1'>
                  {todo.tags?.length > 0 ? (
                    todo.tags.map((tag, index) => (
                      <span
                        key={index}
                        className='inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-md hover:bg-gray-200 transition duration-200'
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <p className='text-sm text-gray-500'>No tags</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => navigate('/add-todo')}
                className='mt-4 w-full bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition duration-300 ease-in-out transform hover:scale-105'
                aria-label='Create New To-Do'
              >
                Create New To-Do
              </button>
              <button
                onClick={() => setPopup(true)}
                className='w-full bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition duration-300 ease-in-out transform hover:scale-105'
                aria-label='Delete To-Do'
              >
                Delete To-Do
              </button>
            </div>
          </aside>
        )}

        <div className='flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fade-in'>
          <div className='flex items-center justify-between mb-6'>
            <button
              onClick={handleBack}
              className='flex items-center gap-2 text-slate-700 hover:text-slate-900 text-sm font-medium bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out'
              aria-label='Back to Todos'
            >
              Back to Todos
            </button>
            <button
              onClick={toggleSidebar}
              className='lg:hidden text-slate-700 hover:text-slate-900 p-2 rounded-md hover:bg-gray-100 transition duration-300'
              aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              <BarIcon className='w-6 h-6' />
            </button>
          </div>
          <div className='flex flex-col gap-6'>
            <h1 className='text-3xl font-bold text-slate-900'>{todo.title}</h1>
            <div
              className='prose prose-slate max-w-none text-gray-700 leading-relaxed'
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
            <div className='flex flex-wrap items-center gap-6 mt-6'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold text-gray-700'>
                  Due:
                </span>
                <span className='text-sm text-gray-500'>
                  {new Date(todo.dueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <label className='inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  value={todo.completed ?? false}
                  onChange={handleStatusToggle}
                  className='sr-only peer'
                  aria-label={`Mark as ${
                    todo.completed ? 'pending' : 'completed'
                  }`}
                />
                <div className='w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-slate-500 rounded-full peer peer-checked:bg-green-500 transition duration-300 ease-in-out'></div>
                <span
                  className={`ml-3 text-sm font-medium text-gray-700 ${
                    todo.completed ? 'bg-green-300' : 'bg-amber-200'
                  } px-3 py-1 rounded-md`}
                >
                  {todo.completed ? 'Completed' : 'Pending'}
                </span>
              </label>
              <button
                onClick={handleEdit}
                className='ml-auto bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded-md text-sm font-medium shadow-sm transition duration-300 ease-in-out transform hover:scale-105'
                aria-label='Edit To-Do'
              >
                Edit To-Do
              </button>
            </div>
          </div>
        </div>
      </div>

      {popup && (
        <div className='fixed inset-0 flex items-start justify-center z-50 pointer-events-none'>
          <div
            className='mt-24 bg-white border border-gray-200 shadow-2xl rounded-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100 opacity-100 pointer-events-auto'
            role='dialog'
            aria-modal='true'
            aria-labelledby='delete-popup-title'
          >
            <h1
              id='delete-popup-title'
              className='text-lg font-semibold text-slate-900 mb-4'
            >
              Are you sure you want to delete this To-Do?
            </h1>
            <div className='flex justify-end gap-4'>
              <button
                onClick={handlePopupCancel}
                className='bg-gray-100 hover:bg-gray-200 text-slate-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200'
                aria-label='Cancel deletion'
              >
                No
              </button>
              <button
                onClick={handlePopupConfirm}
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200'
                aria-label='Confirm deletion'
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TodoPage;
