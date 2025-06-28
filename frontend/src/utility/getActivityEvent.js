const getActivityDescription = (activity) => {
  switch (activity.type) {
    case 'PushEvent':
      const commits = activity.payload.commits?.length || 0;
      return `Pushed ${commits} commit${commits !== 1 ? 's' : ''}`;
    case 'CreateEvent':
      return `Created ${activity.payload.ref_type}`;
    case 'WatchEvent':
      return 'Starred repository';
    case 'ForkEvent':
      return 'Forked repository';
    case 'IssuesEvent':
      return `${activity.payload.action} issue`;
    case 'PullRequestEvent':
      return `${activity.payload.action} p                            <p className="text-sm font-medium">{getActivityDescription(activity)}</p>
ull request`;
    default:
      return activity.type.replace('Event', '');
  }
};

export default getActivityDescription;
