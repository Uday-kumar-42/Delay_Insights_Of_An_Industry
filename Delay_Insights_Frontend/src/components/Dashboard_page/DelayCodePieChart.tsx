import { useEffect, useState } from "react";
import axios from "axios";
import { PieChartIcon } from "lucide-react";
import SkeletonGraph from "../SkeletonGraph";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface DelayCodeDataItem {
  delay_code: number;
  total_delays: number;
}

interface DelayCodeData {
  data: DelayCodeDataItem[];
}

const DelayCodePieChart = () => {
  const [data, setData] = useState<DelayCodeDataItem[]>([]);
  const [status, setStatus] = useState<"loading" | "succeeded" | "failed">(
    "loading"
  );

  useEffect(() => {
    const fetchDelayCodeData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/fetch-delay-code-data",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        console.log(response.data.data);
        setData(response.data.data);
        setStatus("succeeded");
      } catch (err) {
        console.error("Error fetching delay code data:", err);
        setStatus("failed");
      }
    };

    fetchDelayCodeData();
    const interval = setInterval(fetchDelayCodeData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:w-[40%] max-w-5xl p-4 mx-auto">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-neutral-700 flex items-center justify-center gap-2">
          <PieChartIcon className="text-orange-600 w-8 h-8" />
          Most Frequent Delay Codes
        </h2>
      </div>
      <div className="relative min-h-[250px]">
        {status !== "succeeded" && <SkeletonGraph />}
        {status === "succeeded" && <PieChartComponent data={data} />}
        {status === "failed" && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-white bg-opacity-80 rounded-lg">
            Failed to load graph data. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

const PieChartComponent = ({ data }: DelayCodeData) => {
    const topDelays = data.slice(0, 8);
    const otherDelays = data.slice(8);
  
    const chartData = topDelays.map((delay) => ({
      name: `Code ${delay.delay_code}`,
      value: delay.total_delays,
    }));
  
    const sumOfOtherDelays = otherDelays.reduce(
      (acc, delay) => acc + delay.total_delays,
      0
    );
  
    if (sumOfOtherDelays > 0) {
      chartData.push({ name: "Other", value: sumOfOtherDelays });
    }
  
    const COLORS = [
        "#FF3B6B", // brighter red
        "#1E90FF", // brighter blue
        "#FFD700", // bright golden yellow
        "#00CED1", // bright turquoise
        "#8A2BE2", // bright violet
        "#FF8C00", // vivid orange
        "#32CD32", // bright lime green
        "#FF4C4C", // vibrant salmon red
        "#808080", // neutral gray (for "Other")
      ];
      
        
    return (
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              label
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };
  

export default DelayCodePieChart;
