import { UsersIcon } from 'lucide-react';

const GithubStatCard = ({ title, statNumber }) => {
  return (
    <div className='flex flex-col  justify-between w-full border px-3 py-6 rounded-md border-gray-200 gap-3 hover:shadow-md shadow md:w-auto'>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-sm font-medium'>{title || 'Followers'}</span>
        <UsersIcon className='w-4 h-4 text-gray-500'/>
      </div>

      <div className=''>
        <p className='text-xl font-bold'>{statNumber || '80'}</p>
      </div>
    </div>
  );
};
export default GithubStatCard;
