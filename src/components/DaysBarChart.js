// src/components/DaysBarChart.js
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DaysBarChart({ data }) {
  return (
    <div className="card chart-card">
      <h6 className="chart-title">Revenue — Last 10 Days</h6>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 8, right: 10, left: -6, bottom: 4 }}
          >
            <CartesianGrid stroke="rgba(6, 231, 119, 0.1)" />
            <XAxis
              dataKey="date"
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
              tick={{ fill: "rgba(255,255,255,0.7)" }}
            />
            <Tooltip
              formatter={(val) => `₹${val.toLocaleString()}`}
              contentStyle={{
                background: "rgba(94, 94, 94, 0.95)",
                borderRadius: 8,
              }}
            />
            <Bar dataKey="revenue" fill="#9be15d" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
