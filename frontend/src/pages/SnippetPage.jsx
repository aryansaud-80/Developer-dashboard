import React from 'react';
import SnippetCard from '../components/snippet/SnippetCard';
import snippet from '../assets/assets/SnippetData';
import { CodeIcon } from 'lucide-react';
import PageHeader from '../components/pageHeader/PageHeader';

const SnippetPage = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 sm:ml-64'>
      <PageHeader
        Icon={CodeIcon}
        title={'Code Snippets'}
        description={'Save and organize your frequently used code snippets.'}
      />
      <div
        className={`
        ml-0
        p-4 lg:p-6
        grid grid-cols-1 lg:grid-cols-2 
        gap-6 lg:gap-8
        max-w-full
      `}
      >
        {snippet.map((item) => (
          <SnippetCard key={item.id} snippet={item} />
        ))}
      </div>
    </div>
  );
};

export default SnippetPage;
