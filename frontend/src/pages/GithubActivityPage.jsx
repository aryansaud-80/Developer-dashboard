import {
  GitBranchPlusIcon,
  GithubIcon,
  StarIcon,
  UserRoundIcon,
} from 'lucide-react';
import PageHeader from '../components/pageHeader/PageHeader';
import ProfileCard from '../components/github/ProfileCard';
import GithubStatCard from '../components/github/GithubStatCard';
import GithubRepoCard from '../components/github/GithubRepoCard';
import GithubRecentActivity from '../components/github/GithubRecentActivity';
import BarChart from '../components/chart/BarChart';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const GithubActivityPage = () => {
  const [githubActivity, setGithubActivity] = useState({});
  const { BACKEND_URL, accessToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGithubActivity = async () => {
      try {
        axios.defaults.withCredentials = true;
        setLoading(true);

        const { data } = await axios.get(`${BACKEND_URL}/github`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(data.data);

        if (data.success) {
          setGithubActivity(data.data);
          toast.success('To-Dos fetched successfully!');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchGithubActivity();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 md:ml-64'>
      <PageHeader
        Icon={GitBranchPlusIcon}
        title={'GitHub Dashboard'}
        description={`Welcome back, ${githubActivity.username} Here's your GitHub activity.`}
      />

      <ProfileCard
        name={githubActivity.name}
        avatar_url={githubActivity.avatar_url}
        html_url={githubActivity.html_url}
        created_at={githubActivity.created_at}
        username={githubActivity.username}
      />

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <GithubStatCard
          title='Followers'
          statNumber={githubActivity.followers}
          Icon={UserRoundIcon}
        />
        <GithubStatCard
          title='Following'
          statNumber={githubActivity.following}
          Icon={UserRoundIcon}
        />
        <GithubStatCard
          title='Total Stars'
          statNumber={githubActivity.totalStars}
          Icon={StarIcon}
        />
        <GithubStatCard
          title='Repositories'
          statNumber={githubActivity.repositories?.length}
          Icon={GithubIcon}
        />
      </div>

      <div className='grid lg:grid-cols-2 gap-3 grid-cols-1'>
        <div className='flex bg-white shadow border border-gray-200 rounded-md flex-col items-center p-3'>
          <div className='flex flex-col '>
            <h1 className='text-2xl font-bold'>Language Distribution</h1>
            <span className='text-sm text-gray-500'>
              Programming languages used across repositories
            </span>
          </div>
          <BarChart languageData={githubActivity.languages} />
        </div>

        <GithubRecentActivity
          recentActivities={githubActivity.recentActivities}
        />
      </div>

      <div className='bg-white border border-gray-200 p-5 shadow rounded-md flex flex-col gap-10 items-start '>
        <div className='flex flex-col gap-2 '>
          <h1 className='text-2xl font-bold'>
            Repositories ({githubActivity.repositories?.length})
          </h1>
          <span className='text-gray-500'>All public repositories</span>
        </div>
        <div className='grid lg:grid-cols-2 gap-4 grid-cols-1 w-full place-items-center'>
          {githubActivity.repositories?.map((repo) => {
            return <GithubRepoCard repo={repo} key={repo.id} />;
          })}
        </div>
      </div>
    </section>
  );
};
export default GithubActivityPage;
