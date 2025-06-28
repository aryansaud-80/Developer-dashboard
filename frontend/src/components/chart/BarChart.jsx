import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ languageData }) => {
  const shortLabels = {
    JavaScript: 'JS',
    TypeScript: 'TS',
    Python: 'Py',
    'C++': 'C++',
    Ruby: 'Rb',
    Java: 'Java',
    C: 'C',
  };

  const formattedData = languageData?.map((d) => ({
    ...d,
    language: shortLabels[d.language] || d.language,
  }));

  return (
    <div className='w-full h-[60vw] max-h-[400px] min-h-[250px]'>
      <ResponsiveBar
        data={formattedData}
        indexBy='language'
        keys={['count']}
        margin={{ top: 30, right: 20, bottom: 40, left: 30 }}
        padding={0.3}
        colors={(bar) => bar.data.fill} 
        labelSkipWidth={12}
        labelSkipHeight={12}
        axisBottom={{
          legend: 'Language',
          legendOffset: 32,
        }}
        axisLeft={{
          legend: 'Count',
          legendOffset: -40,
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 120,
            itemWidth: 100,
            itemHeight: 16,
            itemsSpacing: 3,
            symbolSize: 20,
          },
        ]}
      />
    </div>
  );
};

export default BarChart;
