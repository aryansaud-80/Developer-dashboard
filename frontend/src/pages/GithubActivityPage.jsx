import { GitBranchPlusIcon } from 'lucide-react';
import PageHeader from '../components/pageHeader/PageHeader';
import ProfileCard from '../components/github/ProfileCard';
import GithubStatCard from '../components/github/GithubStatCard';
import GithubRepoCard from '../components/github/GithubRepoCard';

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

      <div>
        <GithubRepoCard />
      </div>
    </section>
  );
};
export default GithubActivityPage;
