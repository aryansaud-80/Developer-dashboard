import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Eye, EyeClosed } from 'lucide-react';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeContainer = ({ code, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`relative bg-gray-950/80 rounded-md border border-gray-800/50 text-sm 
        ${isExpanded ? '' : 'max-h-56  overflow-hidden'}
      `}
    >
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          maxHeight: isExpanded ? 'none' : '12rem',
          overflow: 'auto',
          borderRadius: '0.375rem',
        }}
      >
        {code}
      </SyntaxHighlighter>

      <div className='absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-950/80 to-transparent flex items-end justify-center pb-2 pointer-events-none'>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='pointer-events-auto px-3 py-1 bg-gray-800/80 rounded-full text-xs text-cyan-400 hover:bg-gray-700/80 transition-colors duration-200 flex items-center gap-1'
        >
          {isExpanded ? (
            <>
              <EyeClosed className='h-3 w-3' />
              View Less
            </>
          ) : (
            <>
              <Eye className='h-3 w-3' />
              View More
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeContainer;
