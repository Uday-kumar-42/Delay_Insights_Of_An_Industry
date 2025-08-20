import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type ActionDispatch, type RootState } from "../../store/store";
import { fetchShopGraphData } from "../../store/shopGraphSlice";
import { Wrench } from "lucide-react";
import SkeletonGraph from "../SkeletonGraph";
import {
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ShopGraph2 = () => {
  const shopGraph = useSelector((state: RootState) => state.shopGraph);
  const dispatch = useDispatch<ActionDispatch>();

  const data = shopGraph.data;
  const status = shopGraph.status;

  console.log(data);

  useEffect(() => {
    dispatch(fetchShopGraphData());

    const interval = setInterval(() => {
      dispatch(fetchShopGraphData());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:w-[60%] p-4 my-4">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-700 flex items-center justify-center gap-2">
          <Wrench className="text-orange-600 w-8 h-8" />
          Downtime of all Equipments
        </h2>
      </div>

      <div className="relative w-full h-[320px]">
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
  data: Record<string, number>[];
}

const GraphComponent = ({ data }: GraphComponentProps) => {
  const chartData = data.map((item) => ({
    name: item.shop,
    value: item.downtime,
  }));

  const maxValue = Math.max(...chartData.map((item) => item.value)) * 1.1;

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
        <YAxis domain={[0, maxValue]} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="value"
          fill="#ffaa0b"
          name="Downtime in Hrs"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ShopGraph2;
