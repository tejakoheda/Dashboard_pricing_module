// src/components/VehicleTypes.js
import CountUp from "./CountUp";

export default function VehicleTypes({ data }) {
  // Safe check in case data hasn't loaded yet
  if (!data) return null;

  return (
    <div className="vehicle-types-card glass-card">
      <h3 className="section-title">Vehicle Types</h3>

      <div className="vehicle-grid">
        {data.map((t) => (
          <div key={t.name} className="vehicle-item">
            <span className="vehicle-emoji">
              <b>{t.emoji}</b>
            </span>
            <span className="vehicle-name">
              <b>{t.name}</b>
            </span>
            <br />

            <span className="vehicle-value">
              <CountUp end={t.value} duration={1.2} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
