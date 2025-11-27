// src/components/RevenueBarChart.js
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RevenueBarChart({ data }) {
  return (
    <div className="card p-3 mb-3">
      <h6 className="mb-3 text-light">Revenue (last months)</h6>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.7)" }} />
            <YAxis
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              tick={{ fill: "rgba(255,255,255,0.7)" }}
            />
            <Tooltip
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{
                background: "#0f1720",
                borderRadius: 8,
                color: "#fff",
              }}
            />
            <Bar dataKey="revenue" fill="#9be15d" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
