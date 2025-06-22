import { useContext, useState, useMemo, useEffect } from 'react';
import SnippetCard from '../components/snippet/SnippetCard';
import { CodeIcon, PlusIcon } from 'lucide-react';
import PageHeader from '../components/pageHeader/PageHeader';
import SnippetSearchFilter from '../components/snippet/SnippetSearchFilter';
import { AppContext } from '../context/AppContext';
import Pagination from '../components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SnippetPage = () => {
  const {
    BACKEND_URL,
    snippets,
    setSnippets,
    accessToken,
    filterSnippet,
    setFilterSnippet,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const maxItem = 4;

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        axios.defaults.withCredentials = true;

        const { data } = await axios.get(`${BACKEND_URL}/snippet`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (data.success) {
          setSnippets(data.data);
          setFilterSnippet(data.data);
          toast.success('Snippet fetched successfully!');
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchSnippets();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filterSnippet]);

  const start = maxItem * (page - 1);
  const end = start + maxItem;
  const currentSnippet = filterSnippet.slice(start, end);

  const totalPages = Math.ceil(filterSnippet.length / maxItem);

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 sm:ml-64'>
      <div>
        <PageHeader
          Icon={CodeIcon}
          title={'Code Snippets'}
          description={'Save and organize your frequently used code snippets.'}
        >
          <button
            className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-md shadow-md transition'
            onClick={() => navigate('/add-snippet')}
          >
            <PlusIcon size={4} />
            Add Snippet
          </button>
        </PageHeader>
      </div>

      <SnippetSearchFilter snippet={snippets} />

      <div
        className={`
          ml-0
          p-4 lg:p-6
          grid grid-cols-1 lg:grid-cols-2
          gap-6 lg:gap-8
          max-w-full
        `}
      >
        {snippets.length === 0 ? (
          <p className='text-center text-gray-400'>Loading snippets...</p>
        ) : currentSnippet.length > 0 ? (
          currentSnippet.map((item) => (
            <SnippetCard key={item._id} snippet={item} />
          ))
        ) : (
          <p className='text-gray-500 text-center col-span-full'>
            No snippets found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
    </div>
  );
};

export default SnippetPage;
