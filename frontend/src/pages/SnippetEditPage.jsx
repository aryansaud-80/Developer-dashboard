import Editor from '@monaco-editor/react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import languages from '../assets/assets/languages';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';

const SnippetEditPage = () => {
  const location = useLocation();
  const snippet = location.state?.snippet;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // console.log(id);
  const { BACKEND_URL, accessToken } = useContext(AppContext);
  const [snippetData, setSnippetData] = useState(snippet || null);
  const navigate = useNavigate();

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your snippet description...',
      });

      quill.root.innerHTML = snippetData?.description || '';

      quill.on('text-change', () => {
        setSnippetData((prev) => ({
          ...prev,
          description: quill.root.innerHTML,
        }));
      });

      quillRef.current = quill;
    }
  }, [snippetData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        axios.defaults.withCredentials = true;

        const { data } = await axios.get(`${BACKEND_URL}/snippet/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (data.success) {
          setSnippetData(data.data);
          if (quillRef.current) {
            quillRef.current.root.innerHTML = data.data.description || '';
          }
        } else {
          toast.error('Failed to fetch snippet');
          navigate('/code-snippets');
        }
      } catch (error) {
        toast.error('No snippet data');
        navigate('/code-snippets');
      } finally {
        setLoading(false);
      }
    };

    if (!snippetData) {
      fetchData();
      console.log('Baby');
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      const { data } = await axios.put(
        `${BACKEND_URL}/snippet/${id}`,
        snippetData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (data.success) {
        toast.success('Snippet updated successfully');
        setSnippetData({});
        quillRef.current.setText('');
        navigate('/code-snippets');
      }
    } catch (error) {
      toast.error('Error to update snippet');
    }
  };

  if (loading || !snippetData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto ml-0 md:ml-64'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center sm:text-left'>
          Edit Your Snippet
        </h1>
        <button
          className='flex bg-blue-300 px-3 py-2 rounded-md'
          onClick={() => navigate('/code-snippets')}
        >
          <ArrowBigLeft />
          Back
        </button>
      </div>

      <form className='flex flex-col gap-6' onSubmit={(e) => handleSubmit(e)}>
        <div className='flex flex-col'>
          <label
            htmlFor='title'
            className='text-sm font-semibold text-gray-700 mb-1'
          >
            Title
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
            Language
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
            Code
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
            Update Snippet
          </button>
        </div>
      </form>
    </div>
  );
};

export default SnippetEditPage;
