// src/data/dashboardData.js
// Dummy data used by the Dashboard

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Today's metrics
export const todayMetrics = {
  totalRidesToday: rnd(320, 820),
  totalDrivers: rnd(1200, 1700),
  activeDrivers: rnd(500, 950),
  preActiveDrivers: rnd(80, 260),
  inactiveDrivers: rnd(150, 420),
  revenueToday: +(rnd(15000, 85000) + Math.random()).toFixed(2),
};

// Last 4 months revenue (example values)
export const revenueLast4Months = [
  { month: "Aug", revenue: 30000 },
  { month: "Sep", revenue: 52000 },
  { month: "Oct", revenue: 41000 },
  { month: "Nov", revenue: 68000 },
];

// Last 10 days revenue (for the 10-day bar chart)
export const revenueLast10Days = (() => {
  const arr = [];
  const today = new Date();
  for (let i = 9; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const label = d.toISOString().slice(5, 10); // "MM-DD"
    arr.push({
      date: label,
      revenue: rnd(1200, 9800),
      rides: rnd(50, 320),
    });
  }
  return arr;
})();
