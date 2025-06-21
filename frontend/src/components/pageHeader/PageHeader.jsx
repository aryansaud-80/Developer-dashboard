import React from 'react';

const PageHeader = ({ Icon, title, description }) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10'>
        <div className='hidden sm:flex flex-shrink-0 bg-indigo-100 rounded-md p-3 items-center justify-center w-14 h-14'>
          <Icon />
        </div>

        <div className='text-center sm:text-left'>
          <h2 className='text-3xl sm:text-4xl font-extrabold leading-tight text-gray-800'>
            {title}
          </h2>
          <p className='text-gray-500 font-medium mt-1 sm:mt-2 max-w-md mx-auto sm:mx-0'>
            {description}
          </p>
        </div>
      </div>

      <div className='w-full h-px bg-gray-200'></div>
    </div>
  );
};

export default PageHeader;
