const getDifficultyColor = (level) => {
  const difficultyColors = {
    beginner: 'text-green-500 bg-green-500/10',
    intermediate: 'text-yellow-500 bg-yellow-500/10',
    advanced: 'text-red-500 bg-red-500/10',
  };

  return difficultyColors[level];
};

export default getDifficultyColor;
