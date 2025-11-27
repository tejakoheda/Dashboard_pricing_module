// src/pages/Dashboard.js
import React from "react";
import NavBar from "../components/NavBar";
import MetricsCard from "../components/MetricsCard";
import MonthlyBarChart from "../components/MonthlyBarChart";
import DaysBarChart from "../components/DaysBarChart";
import {
  todayMetrics,
  revenueLast4Months,
  revenueLast10Days,
} from "../data/dashboardData";

export default function Dashboard() {
  const m = todayMetrics;

  return (
    <>
      <NavBar />

      <main className="dashboard-wrap">
        <div className="dashboard-container">
          <h2 className="page-title">Organization Dashboard</h2>

          <div className="cards-grid">
            <MetricsCard
              title="Today Rides"
              value={m.totalRidesToday}
              subtitle="Rides completed today"
              accent="#FFCE54"
            />
            <MetricsCard
              title="Daily Revenue"
              value={Math.round(m.revenueToday)}
              subtitle="Revenue (₹) today"
              accent="#9be15d"
            />
            <MetricsCard
              title="Active Drivers"
              value={m.activeDrivers}
              subtitle="Currently online"
              accent="#7af59a"
            />
            <MetricsCard
              title="Pre-active Drivers"
              value={m.preActiveDrivers}
              subtitle="Pending activation"
              accent="#ffd166"
            />
            <MetricsCard
              title="Inactive Drivers"
              value={m.inactiveDrivers}
              subtitle="Blocked / inactive"
              accent="#ff8fa3"
            />
            <MetricsCard
              title="Total Drivers"
              value={m.totalDrivers}
              subtitle="Registered drivers"
              accent="#90e0ef"
            />
          </div>

          <div className="panel-row">
            <div className="left-panel">
              <MonthlyBarChart data={revenueLast4Months} />
              <DaysBarChart data={revenueLast10Days} />
            </div>

            {/* QUICK SUMMARY - replace the white box with this */}
            <aside className="right-panel card summary-card">
              <h6 className="summary-title">Quick Summary</h6>

              <div className="summary-item">
                <div className="muted">Today's Rides</div>
                <div className="bold">{m.totalRidesToday.toLocaleString()}</div>
              </div>

              <div className="summary-item">
                <div className="muted">Today's Revenue</div>
                <div className="bold">
                  ₹{Math.round(m.revenueToday).toLocaleString()}
                </div>
              </div>

              <div className="summary-item">
                <div className="muted">Total Drivers</div>
                <div className="bold">{m.totalDrivers.toLocaleString()}</div>
              </div>

              <div className="summary-item">
                <div className="muted">Active Drivers</div>
                <div className="bold">{m.activeDrivers.toLocaleString()}</div>
              </div>

              <div className="summary-item">
                <div className="muted">Pre-active Drivers</div>
                <div className="bold">
                  {m.preActiveDrivers.toLocaleString()}
                </div>
              </div>

              <div className="summary-item">
                <div className="muted">Inactive Drivers</div>
                <div className="bold">{m.inactiveDrivers.toLocaleString()}</div>
              </div>

              <hr
                style={{
                  borderColor: "rgba(255,255,255,0.04)",
                  margin: "10px 0",
                }}
              />

              <div className="summary-item">
                <div className="muted">Average Revenue (10 days)</div>
                <div className="bold">
                  ₹
                  {Math.round(
                    revenueLast10Days.reduce((s, r) => s + r.revenue, 0) /
                      revenueLast10Days.length
                  ).toLocaleString()}
                </div>
              </div>

              <div className="summary-item">
                <div className="muted">Average Rides/Day (10d)</div>
                <div className="bold">
                  {Math.round(
                    revenueLast10Days.reduce((s, r) => s + r.rides, 0) /
                      revenueLast10Days.length
                  ).toLocaleString()}
                </div>
              </div>

              <div className="summary-item">
                <div className="muted">Best Day (10d)</div>
                <div className="bold">
                  {(() => {
                    const best = revenueLast10Days.reduce((a, b) =>
                      a.revenue > b.revenue ? a : b
                    );
                    return best.date;
                  })()}
                </div>
              </div>

              <div className="summary-item">
                <div className="muted">Lowest Day (10d)</div>
                <div className="bold">
                  {(() => {
                    const low = revenueLast10Days.reduce((a, b) =>
                      a.revenue < b.revenue ? a : b
                    );
                    return low.date;
                  })()}
                </div>
              </div>

              <div className="summary-item">
                <div className="muted">Monthly Revenue Trend</div>
                <div className="bold">
                  {revenueLast4Months[revenueLast4Months.length - 1].revenue >
                  revenueLast4Months[0].revenue
                    ? "Increasing ↑"
                    : "Decreasing ↓"}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
