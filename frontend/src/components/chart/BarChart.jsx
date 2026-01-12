import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ data, languageData }) => {
  const chartData = data || languageData;

  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-500">
        No language data available
      </div>
    );
  }

  const shortLabels = {
    JavaScript: "JS",
    TypeScript: "TS",
    Python: "Py",
    "C++": "C++",
    Ruby: "Rb",
    Java: "Java",
    C: "C",
    Go: "Go",
    Rust: "Rust",
    PHP: "PHP",
    CSS: "CSS",
    HTML: "HTML",
    Shell: "Shell",
  };

  const formattedData = chartData?.map((d) => ({
    ...d,
    language: shortLabels[d.language] || d.language,
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveBar
        data={formattedData}
        indexBy="language"
        keys={["count"]}
        margin={{ top: 30, right: 20, bottom: 40, left: 30 }}
        padding={0.3}
        colors={(bar) => bar.data.fill || "#6366f1"}
        labelSkipWidth={12}
        labelSkipHeight={12}
        axisBottom={{
          legend: "Language",
          legendOffset: 32,
        }}
        axisLeft={{
          legend: "Count",
          legendOffset: -40,
        }}
        tooltip={({ indexValue, value }) => (
          <div className="bg-white p-2 border border-gray-300 rounded shadow">
            <strong>{indexValue}</strong>: {value}
          </div>
        )}
      />
    </div>
  );
};

export default BarChart;
