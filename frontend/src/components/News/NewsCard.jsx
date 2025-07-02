import { SquareArrowOutUpRight, Timer, Eye } from 'lucide-react';

const NewsCard = () => {
  return (
    <article className='shadow-sm cursor-pointer hover:shadow-lg border border-gray-200 p-8 rounded-2xl transition-shadow duration-200'>
      <div className='flex justify-between items-start'>
        <a
          href='#'
          className='text-blue-600 hover:underline text-lg font-semibold max-w-[90%] line-clamp-2'
        >
          ICEBlock climbs to the top of the App Store charts after officials slam it
        </a>
        <a
          href='#'
          className='ml-2 hover:bg-blue-100 transition-colors duration-200 p-1 rounded-md text-gray-500 hover:text-blue-600'
        >
          <SquareArrowOutUpRight size={16} />
        </a>
      </div>

      <div className='flex flex-wrap gap-3 text-sm text-gray-600 mt-4 items-center'>
        <span className='flex items-center gap-1'>
          <Eye size={14} />
          engadget.com
        </span>

        <span className='flex items-center gap-1'>
          <Timer size={14} />
          1 min read
        </span>

        <span className='ml-auto text-xs text-gray-400'>16 min ago</span>
      </div>

      <p className='mt-2 text-sm text-gray-500'>
        by <span className='font-medium text-gray-700'>doener</span>
      </p>
    </article>
  );
};

export default NewsCard;
