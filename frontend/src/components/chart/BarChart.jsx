import { ResponsiveBar } from '@nivo/bar';
import getLanguageColorHex from '../../utility/getLanguageColorHex';

const BarChart = () => {
  const data = [
    { _id: '1', language: 'JavaScript', total: 55 },
    { _id: '2', language: 'Python', total: 30 },
    { _id: '3', language: 'Ruby', total: 15 },
    { _id: '4', language: 'C', total: 5 },
    { _id: '5', language: 'C++', total: 10 },
    { _id: '6', language: 'TypeScript', total: 2},
    { _id: '7', language: 'Java', total: 80 },
  ];

  return (
    <div className='w-full h-[400px]'>
      <ResponsiveBar
        data={data}
        indexBy='language'
        keys={['total']}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        // 🎨 Custom color function based on language
        colors={(bar) => {
          return getLanguageColorHex(bar.data.language);
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        axisBottom={{
          legend: 'Language',
          legendOffset: 32,
        }}
        axisLeft={{
          legend: 'Total',
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
