import { NewspaperIcon, RefreshCcw, Timer, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/pageHeader/PageHeader';
import NewsFilter from '../components/News/NewsFilter';
import NewsCard from '../components/News/NewsCard';

const TechNewsPage = () => {
  const [filter, setFilter] = useState('trending');
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 md:ml-64'>
      <PageHeader
        Icon={NewspaperIcon}
        title='Tech News'
        description='Stay updated with the latest in tech and development'
      >
        <div className='flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between'>
          <div className='flex gap-2 border border-gray-300 py-1 px-2 rounded-md'>
            <button
              onClick={() => setFilter('latest')}
              className={`flex items-center gap-1 px-3 py-1 rounded-md ${
                filter === 'latest' ? 'bg-blue-100 text-blue-400' : ''
              }`}
            >
              <Timer size={16} />
              Latest
            </button>
            <button
              onClick={() => setFilter('trending')}
              className={`flex items-center gap-1 px-3 py-1 rounded-md ${
                filter === 'trending' ? 'bg-orange-100 text-orange-400' : ''
              }`}
            >
              <TrendingUp size={16} />
              Trending
            </button>
          </div>
          <button
            onClick={handleRefresh}
            className='flex items-center gap-1 px-3 py-2 rounded-md text-white bg-blue-400'
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>
      </PageHeader>

      <NewsFilter filter={filter} refresh={refresh} />

      <div className='flex flex-col gap-6'>
        <h1 className='text-3xl font-bold'>{'All News'}</h1>

        <NewsCard />
      </div>
    </section>
  );
};

export default TechNewsPage;
