import getActivityDescription from '../../utility/getActivityEvent';
import formatDate from '../../utility/formatDate';

const GithubRecentActivity = ({ recentActivities }) => {
  return (
    <div className='flex bg-white shadow border border-gray-200 rounded-md  p-6 flex-col'>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold'>Recent Activity</h1>
        <span className='text-gray-500'>Latest public activity</span>
      </div>

      {!recentActivities ? (
        <span className='text-gray-500 self-center mt-10'>
          No recent activity available
        </span>
      ) : (
        <div className='flex flex-col gap-3 h-[400px] mt-10 overflow-auto px-3'>
          {recentActivities.map((activity, index) => {
            return (
              <div
                className='bg-blue-50 p-4 rounded-md flex flex-col gap-1 '
                key={activity.id}
              >
                <div className='flex gap-2 items-center'>
                  <div className='h-2 w-2 bg-blue-200 rounded-full'></div>
                  <h1 className='text-lg'>
                    {getActivityDescription(activity)}
                  </h1>
                </div>

                <span className='text-sm text-gray-500 pl-3'>
                  {activity.repo.name}
                </span>

                <span className='text-sm text-gray-500 pl-3'>
                  {formatDate(activity.created_at)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default GithubRecentActivity;
