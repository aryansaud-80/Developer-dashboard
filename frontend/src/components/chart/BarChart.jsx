import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "../../context/ThemeContext";

const BarChart = ({ data, languageData }) => {
  const { theme } = useTheme();
  const chartData = data || languageData;

  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
        No language data available
      </div>
    );
  }

  const shortLabels = {
    JavaScript: "JS", TypeScript: "TS", Python: "Py", "C++": "C++",
    Ruby: "Rb", Java: "Java", C: "C", Go: "Go", Rust: "Rust",
    PHP: "PHP", CSS: "CSS", HTML: "HTML", Shell: "Shell",
  };

  const formattedData = chartData?.map((d) => ({
    ...d,
    language: shortLabels[d.language] || d.language,
  }));

  const textColor = theme === "dark" ? "#a1a1aa" : "#6b7280";

  return (
    <div className="w-full h-[400px]">
      <ResponsiveBar
        data={formattedData}
        indexBy="language"
        keys={["count"]}
        margin={{ top: 30, right: 20, bottom: 40, left: 30 }}
        padding={0.3}
        colors={() => "#ec4899"}
        labelSkipWidth={12}
        labelSkipHeight={12}
        theme={{
          text: { fill: textColor },
          axis: { ticks: { text: { fill: textColor } }, legend: { text: { fill: textColor } } },
          grid: { line: { stroke: theme === "dark" ? "#2e2e2e" : "#e5e7eb" } },
          tooltip: { container: { background: theme === "dark" ? "#1e1e1e" : "#fff", color: textColor, border: "1px solid " + (theme === "dark" ? "#2e2e2e" : "#e5e7eb") } },
        }}
        axisBottom={{ legend: "Language", legendOffset: 32 }}
        axisLeft={{ legend: "Count", legendOffset: -40 }}
      />
    </div>
  );
};

export default BarChart;
