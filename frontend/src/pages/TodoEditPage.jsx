import { useEffect, useRef, useState, useContext } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import PlusIcon from '../assets/icons/PlusIcon';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';

const TodoEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const todoFromState = location.state?.todo;
  const { BACKEND_URL, accessToken } = useContext(AppContext);

  const [loading, setLoading] = useState(!todoFromState);
  const [title, setTitle] = useState(todoFromState?.title || '');
  const [date, setDate] = useState(todoFromState?.dueDate?.slice(0, 10) || '');

  const [description, setDescription] = useState(
    todoFromState?.description || ''
  );

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Enter description...',
      });

      quill.clipboard.dangerouslyPasteHTML(description);

      quill.on('text-change', () => {
        setDescription(quill.root.innerHTML);
      });

      quillRef.current = quill;
    } else if (quillRef.current) {
      quillRef.current.root.innerHTML = description;
    }
  }, [description]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        axios.defaults.withCredentials = true;

        const { data } = await axios.get(`${BACKEND_URL}/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (data.success) {
          const todo = data.data;
          setTitle(todo.title || '');
          setDate(todo.dueDate?.slice(0, 10) || '');
          setDescription(todo.description || '');
        } else {
          toast.error('Failed to fetch todo');
          navigate('/todos');
        }
      } catch (error) {
        toast.error('Something went wrong while fetching todo');
        navigate('/todos');
      } finally {
        setLoading(false);
      }
    };

    if (!todoFromState) {
      fetchData();
    }
  }, [id]);

  const handleEditTodo = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.put(
        `${BACKEND_URL}/todos/${id}`,
        {
          title,
          dueDate: date,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (data.success) {
        toast.success('To-Do updated successfully!');
        navigate('/todos');
      }
    } catch (error) {
      toast.error('Failed to update To-Do. Please try again.');
    }
  };

  if (loading) return <div className='text-center py-10'>Loading...</div>;

  return (
    <section className='max-w-4xl mx-auto p-6 sm:p-10 ml-0 md:ml-64'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold mb-8 ml-10'>Update To-Do</h1>
        <button
          className='flex bg-blue-300 px-3 py-2 rounded-md'
          onClick={() => navigate('/todo-list')}
        >
          <ArrowBigLeft />
          Back
        </button>
      </div>

      <form
        onSubmit={handleEditTodo}
        className='flex flex-col gap-8 bg-white p-8 rounded-md shadow-lg'
        noValidate
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='title' className='font-semibold text-gray-700'>
            Title <span className='text-red-600 ml-1'>*</span>
          </label>
          <input
            type='text'
            id='title'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter todo title'
            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold text-gray-700'>
            Description <span className='text-red-600 ml-1'>*</span>
          </label>
          <div
            ref={editorRef}
            className='bg-white border border-gray-300 rounded-md p-3 min-h-[180px] shadow-sm'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='date' className='font-semibold text-gray-700'>
            Date <span className='text-red-600 ml-1'>*</span>
          </label>
          <input
            type='date'
            id='date'
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        </div>

        <button
          type='submit'
          className='self-start bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition flex items-center gap-3'
        >
          <PlusIcon /> Update Todo
        </button>
      </form>
    </section>
  );
};

export default TodoEditPage;
