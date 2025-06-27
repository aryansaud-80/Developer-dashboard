import {
  GitBranchIcon,
  SquareArrowOutUpRight,
  StarIcon,
  Timer,
} from 'lucide-react';

const GithubRepoCard = () => {
  return (
    <div className='w-full border border-gray-200 px-3 py-6 rounded-lg hover:shadow-lg shadow xl:w-md'>
      <div className='flex gap-3 flex-col'>
        <div className='flex items-center justify-between'>
          <h1 className='font-bold'>Spoon-Knife</h1>
          <SquareArrowOutUpRight className='w-4 h-4 text-gray-500' />
        </div>

        <p className='text-sm text-gray-500'>
          This repo is for demonstration purposes only.
        </p>

        <div className=' text-gray-500 flex gap-5'>
          <div className='flex gap-2 items-center'>
            <StarIcon className='w-4 h-4' />
            <span>12727</span>
          </div>

          <div className='flex gap-2 items-center'>
            <GitBranchIcon className='w-4 h-4' />
            <span>12727</span>
          </div>
        </div>

        <div className='flex items-center justify-between max-sm:flex-col max-sm:items-start gap-2'>
          <div className='flex bg-pink-200 border border-pink-300 px-4 rounded'>HTML</div>

          <div className='text-gray-500 flex gap-2 items-center'>
            <Timer className='h-4 w-4'/>
            Jun 25, 2025
          </div>
        </div>
      </div>
    </div>
  );
};
export default GithubRepoCard;
