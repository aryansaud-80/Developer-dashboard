const getLanguageColor = (language) => {
  const colors = {
    javascript: 'text-yellow-400 bg-yellow-400/10',
    typescript: 'text-blue-500 bg-blue-500/10',
    react: 'text-blue-400 bg-blue-400/10',
    css: 'text-pink-400 bg-pink-400/10',
    html: 'text-orange-400 bg-orange-400/10',
    python: 'text-green-400 bg-green-400/10',
    java: 'text-red-500 bg-red-500/10',
    c: 'text-sky-400 bg-sky-400/10',
    'c++': 'text-sky-500 bg-sky-500/10',
    csharp: 'text-purple-500 bg-purple-500/10',
    php: 'text-indigo-400 bg-indigo-400/10',
    ruby: 'text-rose-500 bg-rose-500/10',
    go: 'text-cyan-400 bg-cyan-400/10',
    rust: 'text-orange-600 bg-orange-600/10',
    shell: 'text-gray-500 bg-gray-500/10',
    bash: 'text-gray-600 bg-gray-600/10',
    json: 'text-lime-500 bg-lime-500/10',
    yaml: 'text-amber-400 bg-amber-400/10',
    sql: 'text-emerald-500 bg-emerald-500/10',
    swift: 'text-orange-500 bg-orange-500/10',
    kotlin: 'text-violet-500 bg-violet-500/10',
    dart: 'text-teal-500 bg-teal-500/10',
    markdown: 'text-zinc-400 bg-zinc-400/10',
    dockerfile: 'text-blue-300 bg-blue-300/10',
    vue: 'text-emerald-400 bg-emerald-400/10',
    svelte: 'text-red-400 bg-red-400/10',
    scss: 'text-pink-500 bg-pink-500/10',
    less: 'text-indigo-500 bg-indigo-500/10',
    xml: 'text-fuchsia-500 bg-fuchsia-500/10',
  };

  return colors[language] || 'text-gray-400 bg-gray-400/10';
};

export default getLanguageColor;
