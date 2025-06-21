import { useState } from 'react';
import CopyIcon from '../../assets/icons/CopyIcon';
import TickIcon from '../../assets/icons/TickIcon';
import getDifficultyColor from '../../utility/getDifficultyColor';
import getLanguageColor from '../../utility/getLanguageColor';
import { toast } from 'react-toastify';
import CodeContainer from './CodeContainer';
import { PenLineIcon, TagIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SnippetCard = ({ snippet }) => {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setIsCopied(true);
      toast.success('Code is copied');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.log('Failed to copy code', error);
    }
  };

  const handleEdit = () => {
    navigate(`snippet/edit/${snippet.id}`, { state: { snippet } });
  };

  return (
    <div className='border border-gray-500 p-4 rounded-lg w-full max-w-full sm:max-w-xl md:max-w-3xl mx-auto flex flex-col gap-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0'>
        <div>
          <h1 className='text-lg sm:text-xl font-bold break-words'>
            {snippet.title}
          </h1>
          <p className='text-sm sm:text-md text-gray-400 font-light mt-1 break-words'>
            {snippet.description}
          </p>
        </div>

        <button
          className='bg-gray-100 border border-gray-200 p-2 rounded-lg flex items-center justify-center self-start sm:self-auto'
          onClick={handleCopy}
          aria-label='Copy code'
        >
          {isCopied ? (
            <div className='flex gap-2 items-center text-sm'>
              <TickIcon className='h-4 w-4' />
              <span>Copied</span>
            </div>
          ) : (
            <CopyIcon className='h-5 w-5' />
          )}
        </button>
      </div>

      {/* Labels */}
      <div className='flex flex-wrap gap-3 text-sm'>
        <span
          className={`${getLanguageColor(
            snippet.language
          )} px-3 py-1 rounded-full whitespace-nowrap`}
        >
          {snippet.language}
        </span>
        <span
          className={`${getDifficultyColor(
            snippet.difficulty
          )} px-3 py-1 rounded-full whitespace-nowrap`}
        >
          {snippet.difficulty}
        </span>
      </div>

      {/* Code Container */}
      <div className='relative w-full overflow-x-auto'>
        <CodeContainer language={snippet.language} code={snippet.code} />
      </div>

      {/* Tags */}
      <div className='flex flex-wrap gap-2'>
        {snippet.tags.map((tag, index) => (
          <div
            key={index}
            className='flex gap-1 items-center text-xs sm:text-sm bg-gray-300 py-0.5 px-2 rounded-sm border border-gray-600 hover:bg-gray-500 transition-all duration-200 cursor-pointer whitespace-nowrap'
          >
            <TagIcon className='h-4 w-4' />
            {tag}
          </div>
        ))}
      </div>

      {/* Edit Button */}
      <button
        className='flex items-center gap-2 bg-slate-400 self-start px-4 py-2 rounded-sm hover:bg-slate-600 transition-all duration-200 text-sm sm:text-base'
        onClick={handleEdit}
        aria-label='Edit snippet'
      >
        <PenLineIcon className='h-5 w-5' />
        EDIT
      </button>
    </div>
  );
};

export default SnippetCard;
