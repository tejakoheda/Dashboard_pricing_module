// src/pages/Dashboard.js
import { useMemo } from "react";
import MetricsCard from "../components/MetricsCard";
import MonthlyBarChart from "../components/MonthlyBarChart";
import DaysBarChart from "../components/DaysBarChart";
import VehicleTypes from "../components/VehicleTypes";
import {
  todayMetrics,
  revenueLast4Months,
  revenueLast10Days,
} from "../data/dashboardData";

export default function Dashboard() {
  const m = todayMetrics;

  // Memoize calculations so they don't run on every render
  const stats = useMemo(() => {
    // used use memo for performance optimization and single time calculation
    const totalRev = revenueLast10Days.reduce((s, r) => s + r.revenue, 0);
    const totalRides = revenueLast10Days.reduce((s, r) => s + r.rides, 0);
    const count = revenueLast10Days.length;

    const bestDay = revenueLast10Days.reduce((a, b) =>
      a.revenue > b.revenue ? a : b
    );
    const lowestDay = revenueLast10Days.reduce((a, b) =>
      a.revenue < b.revenue ? a : b
    );

    const isRevenueIncreasing =
      revenueLast4Months[revenueLast4Months.length - 1].revenue >
      revenueLast4Months[0].revenue;

    return {
      avgRevenue: Math.round(totalRev / count),
      avgRides: Math.round(totalRides / count),
      bestDayDate: bestDay.date,
      lowestDayDate: lowestDay.date,
      trend: isRevenueIncreasing ? "Increasing ↑" : "Decreasing ↓",
    };
  }, []);

  return (
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
          accent="#e8950fff"
        />
        <MetricsCard
          title="Total Vehicles"
          value={m.vehiclesOnRoad}
          subtitle="Registered Vehicles"
          accent="#90e0ef"
        />
        <MetricsCard
          title="Total Consumers"
          value={m.consumers}
          subtitle="Registered consumers"
          accent="#00ea04ff"
        />
      </div>
      <div>
        <VehicleTypes />
      </div>

      <div className="panel-row">
        <div className="left-panel">
          <MonthlyBarChart data={revenueLast4Months} />
          <DaysBarChart data={revenueLast10Days} />
        </div>

        {/* QUICK SUMMARY  */}
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
            <div className="bold">{m.preActiveDrivers.toLocaleString()}</div>
          </div>

          <div className="summary-item">
            <div className="muted">Inactive Drivers</div>
            <div className="bold">{m.inactiveDrivers.toLocaleString()}</div>
          </div>

          <div className="summary-item">
            <div className="muted">vehicles</div>
            <div className="bold">{m.vehiclesOnRoad.toLocaleString()}</div>
          </div>

          <div className="summary-item">
            <div className="muted">Consumers</div>
            <div className="bold">{m.consumers.toLocaleString()}</div>
          </div>

          <hr
            style={{
              borderColor: "rgba(255,255,255,0.04)",
              margin: "10px 0",
            }}
          />

          <div className="summary-item">
            <div className="muted">Average Revenue (10 days)</div>
            <div className="bold">₹{stats.avgRevenue.toLocaleString()}</div>
          </div>

          <div className="summary-item">
            <div className="muted">Average Rides/Day (10d)</div>
            <div className="bold">{stats.avgRides.toLocaleString()}</div>
          </div>

          <div className="summary-item">
            <div className="muted">Best Day (10d)</div>
            <div className="bold">{stats.bestDayDate}</div>
          </div>

          <div className="summary-item">
            <div className="muted">Lowest Day (10d)</div>
            <div className="bold">{stats.lowestDayDate}</div>
          </div>

          <div className="summary-item">
            <div className="muted">Monthly Revenue Trend</div>
            <div className="bold">{stats.trend}</div>
          </div>
        </aside>

        {/* YESTERDAY SUMMARY */}
        <aside className="right-panel card summary-card">
          <h6 className="summary-title">Yesterday Rides </h6>

          <div className="summary-item">
            <div className="muted">Total Trips Completed </div>
            <div className="bold">{m.tripsCompleted.toLocaleString()}</div>
          </div>

          <div className="summary-item">
            <div className="muted">Total Trips Cancelled</div>
            <div className="bold">
              {Math.round(m.tripsCancelled).toLocaleString()}
            </div>
          </div>

          <div className="summary-item">
            <div className="muted">Revenue </div>
            <div className="bold">₹{m.revenueYesterday.toLocaleString()}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
