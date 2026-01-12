const PageHeader = ({ Icon, title, description, children }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full">
          <div className="flex sm:flex-shrink-0 bg-indigo-100 rounded-md p-3 items-center justify-center w-14 h-14 mx-auto sm:mx-0">
            <Icon className="w-6 h-6 text-indigo-600" />
          </div>

          <div className="text-center sm:text-left w-full">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
              {title}
            </h2>
            <p className="text-gray-500 font-medium mt-1 sm:mt-2 max-w-md mx-auto sm:mx-0">
              {description}
            </p>
          </div>
        </div>

        {children && (
          <div className="flex justify-center lg:justify-end w-full">
            {children}
          </div>
        )}
      </div>

      <div className="w-full h-px bg-gray-200" />
    </div>
  );
};

export default PageHeader;
