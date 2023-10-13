import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Lunes", Total: 3200 },
  { name: "Martes", Total: 2200 },
  { name: "Miercoles", Total: 3200 },
  { name: "Jueves", Total: 1200 },
  { name: "Viernes", Total: 3100 },
  { name: "Sabado", Total: 3200 },
];

const Chart = () => {
  return (
    <div className="chart">
      <div className="title">Ingresos de los ultimos 7 dias</div>
      <ResponsiveContainer width="100%" aspect={2 / 0.5}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="Total" x1="0" y1="1" x2="2" y2="0">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="90%" stopColor="#8884d8" stopOpacity={0.8} />
            </linearGradient>
            {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient> */}
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#Total)"
          />
          {/* <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
