import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type ActionDispatch, type RootState } from "../../store/store";
import {
  fetchGraphData,
  setSelectedRange,
} from "../../store/timeRangeGraphSlice";
import SkeletonGraph from "../SkeletonGraph";
import { BarChart2 } from "lucide-react";
import {
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TimeRangeGraph = () => {
  const dispatch = useDispatch<ActionDispatch>();
  const selectedRange = useSelector(
    (state: RootState) => state.timeRangegraph.selectedRange
  );
  const timeRangegraph = useSelector(
    (state: RootState) => state.timeRangegraph
  );

  const data = timeRangegraph.data;
  const status = timeRangegraph.status;

  useEffect(() => {
    dispatch(fetchGraphData(selectedRange));

    const interval = setInterval(() => {
      dispatch(fetchGraphData(selectedRange));
    }, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(interval);
  }, [dispatch, selectedRange]);

  const handleRangeChange = (range: "week" | "month" | "year") => {
    dispatch(setSelectedRange(range));
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 my-4 md:w-1/2 ">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-700 flex items-center justify-center gap-2">
          <BarChart2 className="w-8 h-8 text-orange-500" />
          Time based delay trends
        </h2>
        <div className="inline-flex gap-2 flex-wrap justify-center">
          {["week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() =>
                handleRangeChange(range as "week" | "month" | "year")
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedRange === range
                  ? "bg-yellow-400 text-neutral-900 shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {range.toUpperCase()}LY
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-[300px]">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            status === "loading" || status === "failed"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {(status === "loading" || status === "failed") && <SkeletonGraph />}
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            status === "succeeded"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {status === "succeeded" && <GraphComponent data={data} />}
        </div>

        {status === "failed" && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-white bg-opacity-80 rounded-lg z-10">
            Failed to load graph data. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

interface GraphComponentProps {
  data: Record<string, string | number>;
}

const GraphComponent = ({ data }: GraphComponentProps) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value: Number(value),
  }));

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 bg-white rounded-lg">
        No data available for the selected period.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="value"
          fill="#ffaa0b"
          name="Effective Duration in Hrs"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TimeRangeGraph;
