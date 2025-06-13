import CodeBracketIcon from '../../assets/icons/CodeBracketIcon';
import nav from '../../assets/assets/NavData';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <section className='p-4 border-r-1 w-full h-full bg-slate-100 shadow-sm'>
      <div className='pt-6 flex flex-col gap-10'>
        <div className='flex gap-4  items-center'>
          <div className='flex bg-gray-500 p-3 rounded-md justify-center items-center h-10 w-10 text-xl text-white'>
            <CodeBracketIcon />
          </div>
          <div className='flex flex-col '>
            <h1 className='text-2xl font-bold'>DevBoard</h1>
            <span className='font-light text-gray-400'>Developer Hub</span>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='font-light'>Navigation</p>

          <div>
            {nav.map((data, index) => {
              const Icon = data.icon;
              return (
                <NavLink
                  key={index}
                  to={data.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded-md hover:bg-slate-200 transition ${
                      isActive ? 'bg-slate-300 font-semibold' : 'text-gray-700'
                    }`
                  }
                >
                  <Icon />
                  {data.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Nav;
