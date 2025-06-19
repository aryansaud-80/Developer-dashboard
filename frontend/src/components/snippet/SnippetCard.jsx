import { useState } from 'react';
import CopyIcon from '../../assets/icons/CopyIcon';
import TickIcon from '../../assets/icons/TickIcon';
import getDifficultyColor from '../../utility/getDifficultyColor';
import getLanguageColor from '../../utility/getLanguageColor';
import { toast } from 'react-toastify';

const SnippetCard = ({ snippet }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setIsCopied(true);
      toast.success('Code is copied');
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.log('Failed to copy code', error);
    }
  };
  return (
    <div className='border border-gray-500 p-4 rounded-lg w-lg flex flex-col gap-10'>
      <div className='flex items-center justify-between '>
        <div className='flex flex-col gap-2'>
          <h1 className='text-xl font-bold'>{snippet.title}</h1>
          <p className='text-md text-gray-400 font-light'>
            {snippet.description}
          </p>
        </div>

        <button
          className='bg-gray-100 border-gray-200 p-1.5  border rounded-lg'
          onClick={handleCopy}
        >
          {isCopied ? (
            <div className='flex gap-2'>
              <TickIcon />
              <span>Copied</span>
            </div>
          ) : (
            <CopyIcon />
          )}
        </button>
      </div>

      <div className='flex items-center gap-4'>
        <span
          className={`${getLanguageColor(
            snippet.language
          )} px-4 py-1 rounded-full`}
        >
          {snippet.language}
        </span>
        <span
          className={`${getDifficultyColor(
            snippet.difficulty
          )} px-4 py-1 rounded-full`}
        >
          {snippet.difficulty}
        </span>
      </div>
    </div>
  );
};

export default SnippetCard;
