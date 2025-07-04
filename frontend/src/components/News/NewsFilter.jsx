import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import newsCategory from '../../assets/assets/newsCategory';

const NewsFilter = () => {
  const [selected, setSelected] = useState(newsCategory[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex gap-4 flex-col sm:flex-row items-center w-full'>
      <form className='flex gap-2 items-center border border-gray-300 px-2 py-2 rounded-md w-full '>
        <Search size={16} />
        <input
          type='text'
          name='search'
          placeholder='Search tech news...'
          className='w-full outline-none text-sm'
        />
      </form>

      <div className='relative'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-md text-sm min-w-[160px]'
        >
          {selected.icon}
          {selected.name}
          <ChevronDown size={16} className='ml-auto' />
        </button>

        {isOpen && (
          <ul className='absolute mt-2 z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg'>
            {newsCategory.map((cat) => (
              <li
                key={cat.id}
                className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer'
                onClick={() => {
                  setSelected(cat);
                  setIsOpen(false);
                }}
              >
                {cat.icon}
                {cat.name}
              </li>
            ))}
          </ul>
        )}
      </div>  
    </div>
  );
};

export default NewsFilter;
