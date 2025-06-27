const getLanguageColorHex = (language) => {
  const colors = {
    javascript: '#f7df1e',
    typescript: '#3178c6',
    react: '#61dafb',
    css: '#e754c0',
    html: '#f16529',
    python: '#4B8BBE',
    java: '#e51f25',
    c: '#5fa8d3',
    'c++': '#004482',
    csharp: '#68217A',
    php: '#8892be',
    ruby: '#cc342d',
    go: '#00ADD8',
    rust: '#dea584',
    shell: '#474949',
    bash: '#3e474e',
    json: '#90ee90',
    yaml: '#f1c40f',
    sql: '#1abc9c',
    swift: '#fa7343',
    kotlin: '#7f52ff',
    dart: '#00b4ab',
    markdown: '#6c757d',
    dockerfile: '#0db7ed',
    vue: '#42b883',
    svelte: '#ff3e00',
    scss: '#cd6799',
    less: '#2b4c80',
    xml: '#ff00ff',
  };

  return colors[language.toLowerCase()] || '#999';
};

export default getLanguageColorHex;
