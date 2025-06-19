import React from 'react';
import SnippetCard from '../components/snippet/SnippetCard';
import snippet from '../assets/assets/SnippetData';

const SnippetPage = () => {
  return (
    <div className='ml-64 p-10'>
      {snippet.map((snippet) => {
        return <SnippetCard key={snippet.id} snippet={snippet} />;
      })}
    </div>
  );
};

export default SnippetPage;
