import { Timer } from 'lucide-react';
import { format } from 'date-fns';

const NewsCard = ({ article }) => {
  const {
    title,
    description,
    image_url,
    pubDate,
    category,
    source_id,
    link,
  } = article;


  return (
    <div className='rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden'>
      <div className='relative h-44 w-full overflow-hidden'>
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className='object-cover w-full h-full transition-transform hover:scale-105'
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg?height=180&width=320';
            }}
          />
        ) : (
          <div className='w-full h-full bg-gray-200  animate-pulse' />
        )}
      </div>

      <div className='p-4 flex flex-col gap-2'>
        <div className='flex justify-between items-center text-sm text-gray-500 '>
          <span className='bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium'>
            {category?.[0] || 'General'}
          </span>
          <span>{format(new Date(pubDate), 'LLL d, yyyy')}</span>
        </div>

        <h3 className='font-semibold text-lg leading-tight line-clamp-2'>
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:underline'
          >
            {title}
          </a>
        </h3>

        <p className='text-sm text-gray-600  line-clamp-2'>
          {description || 'No description available.'}
        </p>

        <div className='flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400'>
          <span className='bg-gray-100 px-2 py-0.5 rounded text-xs'>
            {source_id || 'Unknown'}
          </span>

          <div className='flex items-center gap-1'>
            <Timer size={14} className='text-gray-400' />
            <span>1 min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
