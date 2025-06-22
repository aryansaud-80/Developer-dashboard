import { FunnelIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import filters from '../../assets/assets/Filter';

const SnippetSearchFilter = ({ snippet }) => {
  const [searchFilter, setSearchFilter] = useState('All');
  const { setFilterSnippet, filterSnippet } = useContext(AppContext);

  const handleSearchFilter = (filter) => {
    setSearchFilter(filter);
  };

  useEffect(() => {
    const searchedSnippet = snippet.filter((snippet) => {
      if (searchFilter === 'All') return snippet;
      return snippet.language.toLowerCase() === searchFilter.toLowerCase();
    });

    setFilterSnippet(searchedSnippet);
  }, [searchFilter]);

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex-wrap'>
      <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
        <div className='flex items-center gap-2 text-md font-bold'>
          <FunnelIcon className='h-4 w-4' />
          <span>Language:</span>
        </div>

        <div className='flex flex-wrap gap-2 sm:gap-3'>
          {filters.map((filter, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                searchFilter.trim() === filter.trim()
                  ? 'bg-blue-400 text-white'
                  : 'bg-slate-300 text-gray-800'
              } transition-all`}
              onClick={() => handleSearchFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <span className='bg-amber-200 px-3 py-1 text-sm rounded-lg self-start sm:self-auto'>
        {filterSnippet.length} found
      </span>
    </div>
  );
};
export default SnippetSearchFilter;
