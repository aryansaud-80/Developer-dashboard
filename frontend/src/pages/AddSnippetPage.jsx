import Editor from '@monaco-editor/react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import languages from '../assets/assets/languages';

const AddSnippetPage = () => {
  const { BACKEND_URL, accessToken } = useContext(AppContext);
  const [snippetData, setSnippetData] = useState({
    title: '',
    description: '',
    code: '',
    language: '',
    tags: [],
    difficulty: 'intermediate',
  });

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your snippet description...',
      });

      quillRef.current.on('text-change', () => {
        setSnippetData((prev) => ({
          ...prev,
          description: quillRef.current.root.innerHTML,
        }));
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(`${BACKEND_URL}/snippet`, snippetData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (data.success) {
        toast.success('Saved snippet successfully');
        setSnippetData({
          title: '',
          description: '',
          code: '',
          language: '',
          tags: [],
          difficulty: 'intermediate',
        });
        quillRef.current.setText('');
      }
    } catch (error) {
      toast.error('Error to save snippet');
    }
  };

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto ml-0 sm:ml-64'>
      <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center sm:text-left'>
        Add Your Snippet
      </h1>

      <form className='flex flex-col gap-6' onSubmit={(e) => handleSubmit(e)}>
        <div className='flex flex-col'>
          <label
            htmlFor='title'
            className='text-sm font-semibold text-gray-700 mb-1'
          >
            Title <span className='text-red-500'>*</span>
          </label>
          <input
            id='title'
            type='text'
            required
            value={snippetData.title}
            onChange={(e) =>
              setSnippetData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder='e.g. Merge Sort Implementation'
            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-sm font-semibold text-gray-700 mb-1'>
            Description
          </label>
          <div
            ref={editorRef}
            className='bg-white border border-gray-300 rounded-md p-3 min-h-[180px] shadow-sm'
          />
        </div>

        <div className='flex flex-col'>
          <label
            htmlFor='language'
            className='text-sm font-semibold text-gray-700 mb-1'
          >
            Language <span className='text-red-500'>*</span>
          </label>
          <select
            id='language'
            required
            value={snippetData.language}
            onChange={(e) =>
              setSnippetData((prev) => ({
                ...prev,
                language: e.target.value,
              }))
            }
            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <label
            htmlFor='tags'
            className='text-sm font-semibold text-gray-700 mb-1'
          >
            Tags <span className='text-gray-400'>(comma-separated)</span>
          </label>
          <input
            id='tags'
            type='text'
            placeholder='e.g. algorithm, array, data-structure'
            value={snippetData.tags.join(', ')}
            onChange={(e) =>
              setSnippetData((prev) => ({
                ...prev,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              }))
            }
            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        </div>

        <div className='flex flex-col'>
          <label
            htmlFor='difficulty'
            className='text-sm font-semibold text-gray-700 mb-1'
          >
            Difficulty
          </label>
          <select
            id='difficulty'
            value={snippetData.difficulty}
            onChange={(e) =>
              setSnippetData((prev) => ({
                ...prev,
                difficulty: e.target.value,
              }))
            }
            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='advanced'>Advanced</option>
          </select>
        </div>

        <div className='flex flex-col'>
          <label className='text-sm font-semibold text-gray-700 mb-1'>
            Code <span className='text-red-500'>*</span>
          </label>
          <div className='border border-gray-300 rounded-md overflow-hidden shadow-sm'>
            <Editor
              height='300px'
              language={snippetData.language.trim() || 'javascript'}
              defaultValue='//Enter your code below'
              value={snippetData.code}
              onChange={(value) =>
                setSnippetData((prev) => ({ ...prev, code: value }))
              }
              theme='vs-dark'
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-md transition'
          >
            Save Snippet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSnippetPage;
