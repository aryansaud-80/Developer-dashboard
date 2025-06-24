const chartColors = [
  '#3b82f6',
  '#8b5cf6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#6366f1',
  '#14b8a6',
  '#f43f5e',
  '#22c55e',
  '#eab308',
];


export const computeLanguageData = (repos) => {
  const languageCount = {};

  repos.map((repo) => {
    if (repo.language) {
      const lang = repo.language;
      languageCount[lang] = (languageCount[lang] || 0) + 1;
    }
  });

  const languageStats = Object.entries(languageCount).map(
    ([language, count], index) => ({
      language,
      count,
      fill: chartColors[index % chartColors.length],
    })
  );

  return languageStats;
};

