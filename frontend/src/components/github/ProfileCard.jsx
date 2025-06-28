import { Calendar, SquareArrowOutUpRight } from 'lucide-react';
import formatDate from '../../utility/formatDate';

const ProfileCard = ({ name, username, created_at, avatar_url, html_url }) => {
  return (
    <div className='flex flex-col bg-white shadow border border-gray-200 py-8 px-6 justify-between items-center rounded-md lg:flex-row gap-2'>
      <div className='flex flex-col items-center gap-4 md:flex-row'>
        <div className='flex items-center justify-center size-28 rounded-full bg-gray-100'>
          <img src={avatar_url} alt='' className='w-24 h-24 rounded-full' />
        </div>

        <div className='flex flex-col justify-center gap-3 max-md:items-center '>
          <div className='flex gap-3 items-center max-sm:flex-col'>
            <h1 className='text-2xl font-bold'>{name}</h1>
            <span className='bg-pink-200 border border-pink-300 px-3 py-0.5 rounded-full text-sm font-light'>
              Your Profile
            </span>
          </div>

          <div className='flex flex-col gap-2 max-md:items-center '>
            <span className='text-gray-500'>{username}</span>
            <div className='flex items-center  gap-2'>
              <Calendar className='w-4 h-4' />
              <span className='text-gray-500'>
                Joined {formatDate(created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <a href={html_url} target='_blank'
        className='flex gap-3 items-center border border-gray-300 px-3 py-2 rounded hover:bg-gray-100 duration-200 transition-all'
      >
        <SquareArrowOutUpRight className='w-4 h-4 ' />
        View Profile
      </a>
    </div>
  );
};
export default ProfileCard;
