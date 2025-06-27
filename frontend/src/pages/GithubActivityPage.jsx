import { GitBranchPlusIcon } from 'lucide-react';
import PageHeader from '../components/pageHeader/PageHeader';
import ProfileCard from '../components/github/ProfileCard';
import GithubStatCard from '../components/github/GithubStatCard';
import GithubRepoCard from '../components/github/GithubRepoCard';
import GithubRecentActivity from '../components/github/GithubRecentActivity';

const GithubActivityPage = () => {
  const username = 'aryansaud-80';
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 md:ml-64'>
      <PageHeader
        Icon={GitBranchPlusIcon}
        title={'GitHub Dashboard'}
        description={`Welcome back, ${username} Here's your GitHub activity.`}
      />

      <ProfileCard />

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <GithubStatCard />
        <GithubStatCard />
        <GithubStatCard />
        <GithubStatCard />
      </div>

      <div className='grid md:grid-cols-2 gap-3 grid-cols-1'>
        <div className='flex bg-white shadow border border-gray-200 rounded-md '></div>

        <GithubRecentActivity />
      </div>

      <div className='bg-white border border-gray-200 p-5 shadow rounded-md flex flex-col gap-10 items-start '>
        <div className='flex flex-col gap-2 '>
          <h1 className='text-2xl font-bold'>Repositories (9)</h1>
          <span className='text-gray-500'>All public repositories</span>
        </div>
        <div className='grid lg:grid-cols-2 gap-4 grid-cols-1 w-full place-items-center'>
          <GithubRepoCard />
          <GithubRepoCard />
          <GithubRepoCard />
          <GithubRepoCard />
          <GithubRepoCard />
          <GithubRepoCard />
          <GithubRepoCard />
          <GithubRepoCard />
          <GithubRepoCard />
        </div>
      </div>
    </section>
  );
};
export default GithubActivityPage;
