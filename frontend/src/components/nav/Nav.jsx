import { useState } from 'react';
import CodeBracketIcon from '../../assets/icons/CodeBracketIcon';
import nav from '../../assets/assets/NavData';
import { NavLink } from 'react-router-dom';
import BarIcon from '../../assets/icons/BarIcon';

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className='fixed top-4 left-4 z-50 p-2 rounded-md bg-slate-100 shadow-md sm:hidden'
        aria-label='Toggle navigation menu'
        aria-expanded={open}
        aria-controls='sidebar'
      >
        <BarIcon />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className='fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden'
          aria-hidden='true'
        />
      )}

      <aside
        id='sidebar'
        className={`fixed top-0 left-0 h-screen bg-slate-100 shadow-sm border-r border-gray-200 w-64 p-6 pt-10 transform transition-transform duration-300 ease-in-out z-50 sm:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} flex flex-col
        `}
      >
        <div className='flex flex-col gap-10 h-full'>
          <div className='flex items-center gap-4'>
            <div className='flex bg-gray-500 p-3 rounded-md justify-center items-center h-10 w-10 text-xl text-white'>
              <CodeBracketIcon />
            </div>
            <div className='flex flex-col'>
              <h1 className='text-2xl font-bold leading-tight'>DevBoard</h1>
              <span className='font-light text-gray-400 text-sm'>
                Developer Hub
              </span>
            </div>
          </div>

          <nav
            className='flex flex-col gap-3 overflow-y-auto flex-grow'
            aria-label='Primary'
          >
            <p className='font-light text-gray-600 uppercase tracking-wide text-xs mb-2 select-none'>
              Navigation
            </p>

            {nav.map((data, index) => {
              const Icon = data.icon;
              return (
                <NavLink
                  key={index}
                  to={data.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'bg-slate-300 font-semibold text-slate-900'
                        : 'text-gray-700 hover:bg-slate-200 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className='w-5 h-5 flex-shrink-0' />
                  <span className='truncate'>{data.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Nav;
