const GithubRecentActivity = ({ recentActivity }) => {
  return (
    <div className='flex bg-white shadow border border-gray-200 rounded-md  p-6 flex-col'>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold'>Recent Activity</h1>
        <span className='text-gray-500'>Latest public activity</span>
      </div>

      {!recentActivity ? <span className="text-gray-500 self-center mt-10">No recent activity available</span> : ''}
    </div>
  );
};
export default GithubRecentActivity;
