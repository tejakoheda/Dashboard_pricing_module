// src/components/MetricsCard.js
import React from "react";
import CountUp from "./CountUp";

/**
 * MetricsCard
 * props:
 *  - title, value, subtitle, accent (color)
 */
export default function MetricsCard({
  title,
  value,
  subtitle,
  accent = "#FFCE54",
}) {
  return (
    <div className="metric-card">
      <div className="metric-accent" style={{ background: accent }} />
      <div className="metric-content">
        <div className="metric-title">{title}</div>
        <div className="metric-value">
          <CountUp
            end={value}
            duration={1.1}
            formatter={(v) =>
              typeof value === "number" ? v.toLocaleString() : String(v)
            }
          />
        </div>
        {subtitle && <div className="metric-sub">{subtitle}</div>}
      </div>
    </div>
  );
}
