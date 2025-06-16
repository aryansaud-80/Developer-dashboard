import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import PlusIcon from '../assets/icons/PlusIcon';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const TodoEditPage = () => {
  const location = useLocation();
  const todo = location.state?.todo;
  const { BACKEND_URL, accessToken } = useContext(AppContext);
  const [title, setTitle] = useState(todo.title);
  const [date, setDate] = useState(todo.dueDate.slice(0, 10));
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Enter description...',
      });

      // Load actual content
      if (todo.description) {
        quillRef.current.clipboard.dangerouslyPasteHTML(todo.description);
      }
    }
  }, [todo.description]);

  const handleEditTodo = async (e) => {
    try {
      e.preventDefault();
      const description = quillRef.current?.root.innerHTML;
      axios.defaults.withCredentials = true;

      const { data } = await axios.patch(
        `${BACKEND_URL}/todos/${todo._id}`,
        {
          title,
          description,
          dueDate: date,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (data.success) {
        toast.success('To-Do added successfully!');
        setTitle('');
        setDate('');
        quillRef.current.setText('');
      }
    } catch (error) {
      toast.error('Failed to update To-Do. Please try again.');
    }
  };

  return (
    <section className='max-w-4xl mx-auto p-6 sm:p-10 ml-0 sm:ml-64'>
      <h1 className='text-3xl font-bold mb-8 ml-10'>Update To-Do</h1>

      <form
        onSubmit={handleEditTodo}
        className='flex flex-col gap-8 bg-white p-8 rounded-md shadow-lg'
        noValidate
      >
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='title'
            className='font-semibold text-gray-700 flex items-center'
          >
            Title <span className='text-red-600 ml-1'>*</span>
          </label>
          <input
            type='text'
            id='title'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter todo title'
            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='font-semibold text-gray-700 flex items-center'>
            Description <span className='text-red-600 ml-1'>*</span>
          </label>
          <div
            ref={editorRef}
            className='bg-white border border-gray-300 rounded-md p-3 min-h-[180px] shadow-sm'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label
            htmlFor='date'
            className='font-semibold text-gray-700 flex items-center'
          >
            Date <span className='text-red-600 ml-1'>*</span>
          </label>
          <input
            type='date'
            id='date'
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
          />
        </div>

        <button
          type='submit'
          className='self-start bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition flex gap-3'
        >
          <PlusIcon /> Update Todo
        </button>
      </form>
    </section>
  );
};

export default TodoEditPage;
