import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";


const data = [
  { name: "Page A", pv: 2400, amt: 2400, pvd: 2400 },
  { name: "Page B", pv: 2800, amt: 2700, pvd: 2800 },
  { name: "Page C", pv: 1300, amt: 2200 },
  { name: "Page D", pv: 2200, amt: 2800, pvd: 2200 },
  { name: "Page F", pv: 2400, amt: 2500, pvd: 2400 },
];

const LineChartElement = () => {
  return (
    <ResponsiveContainer width="50%" height="50%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <Line
          type="monotone"
          dataKey="amt"
          stroke="#567890"
          r={3}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#123456"
          r={3}
          activeDot={{ r: 6 }}
        />
        <Line
        connectNulls
          type="monotone"
          dataKey="pvd"
          stroke="#f00"
          r={3}
          activeDot={{ r: 6 }}
        />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"  padding={{ left: 20, right: 20 }} />
        <YAxis domain={[0, "dataMax + 1000"]} />
        <ReferenceLine x="Page B" stroke="#ff0" />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartElement;
