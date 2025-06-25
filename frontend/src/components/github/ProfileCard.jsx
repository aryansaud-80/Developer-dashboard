import { Calendar, SquareArrowOutUpRight } from 'lucide-react';

const ProfileCard = () => {
  return (
    <div className='flex flex-col bg-white shadow border border-gray-200 py-8 px-6 justify-between items-center rounded-md lg:flex-row gap-2'>
      <div className='flex flex-col items-center gap-4 md:flex-row'>
        <div className='flex items-center justify-center size-28 rounded-full bg-gray-100'>
          <img src='https://imgs.search.brave.com/DX_wldWWiJSIPvT_VyfBeHcd_b7rr6rRQNUVQz3k29E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbXMu/amliZWNkbi5jb20v/cHJvZC9naXRodWJp/bmMtY2FyZWVycy9h/c3NldHMvTFAtU0tV/LUQ0LUlNRy1lbi11/cy0xNzAxODU2ODgz/NjA2LnBuZw' alt='' className='w-24 h-24 rounded-full'/>
        </div>

        <div className='flex flex-col justify-center gap-3 max-md:items-center '>
          <div className='flex gap-3 items-center max-sm:flex-col'>
            <h1 className='text-2xl font-bold'>Aryan Saud</h1>
            <span className='bg-pink-200 border border-pink-300 px-3 py-0.5 rounded-full text-sm font-light'>
              Your Profile
            </span>
          </div>

          <div className='flex flex-col gap-2 max-md:items-center '>
            <span className='text-gray-500'>@aryansaud-80</span>
            <div className='flex items-center  gap-2'>
              <Calendar className='w-4 h-4' />
              <span className='text-gray-500'>Joined Jan 26, 2011</span>
            </div>
          </div>
        </div>
      </div>  
      <button className='flex gap-3 items-center border border-gray-300 px-3 py-2 rounded hover:bg-gray-100 duration-200 transition-all'>
        <SquareArrowOutUpRight className='w-4 h-4 ' />
        View Profile
      </button>
    </div>
  );
};
export default ProfileCard;
