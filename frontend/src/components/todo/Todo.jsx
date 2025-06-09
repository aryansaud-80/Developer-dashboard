import BarIcon from '../../assets/icons/BarIcon';
import FunnelIcon from '../../assets/icons/FunnelIcon';

const Todo = () => {
  return (
    <section className='flex flex-col gap-10 ml-10 mt-10'>
      <div className='flex flex-col gap-5 max-w-xl '>
        <div className='flex gap-10 items-center justify-center self-start'>
          <div className='min-w-10 min-h-10 rounded-md bg-slate-400 flex items-center justify-center'>
            <BarIcon />
          </div>
          <div className='flex flex-col '>
            <h2 className='text-3xl font-bold'>Todo List</h2>
            <p className='text-gray-500 font-semibold'>
              Manage your development tasks and track your progress
            </p>
          </div>
        </div>

        <div className='w-full h-0.5 bg-black '></div>
      </div>

      <div className='flex items-center gap-56'>
        <h3 className='text-2xl font-bold'>Your Tasks</h3>

        <div className='relative cursor-pointer'>
          <div className=' absolute inset-y-0 left-0 flex items-center pl-2'>
            <FunnelIcon className='h-4 w-4 text-gray-500' />
          </div>
          <select
            id='task-category'
            className='appearance-none border border-gray-300 rounded-md px-3 py-2 w-full pl-10 bg-white cursor-pointer'
          >
            <option value='all'>All Categories</option>
            <option value='work'>Work</option>
            <option value='learning'>Learning</option>
            <option value='personal'>Personal</option>
          </select>
        </div>
      </div>

      <div className=''>

      </div>
    </section>
  );
};
export default Todo;
