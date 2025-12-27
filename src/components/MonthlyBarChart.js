// src/components/MonthlyBarChart.js
import {
  ResponsiveContainer, // Recharts components
  BarChart, // for creating a responsive bar chart
  Bar, // bar element
  XAxis, // horizontal axis
  YAxis, // vertical axis
  Tooltip, // tooltip on hover
  CartesianGrid, // grid lines
} from "recharts";

export default function MonthlyBarChart({ data }) {
  return (
    <div className="card chart-card">
      <h6 className="chart-title">Revenue — Last 4 Months</h6>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -12, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.75)" }} />
            <YAxis
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              tick={{ fill: "rgba(255,255,255,0.75)" }}
            />
            <Tooltip
              formatter={(val) => `₹${val.toLocaleString()}`}
              contentStyle={{
                background: "rgba(10,10,10,0.9)",
                borderRadius: 8,
                color: "#fff",
              }}
            />
            <Bar dataKey="revenue" fill="#FFCE54" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
