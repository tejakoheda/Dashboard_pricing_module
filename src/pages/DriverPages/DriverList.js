// src/pages/DriverPages/DriverList.js
import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useDriverContext } from "../../context/DriverContext"; // Restored hook
import { glassTableStyles } from "./ManualVerification"; // Reuse styles
import "./drivers.css";

// --- Modal Component for Driver Ride History ---
const DriverHistoryModal = ({ rideHistory, driver, onClose }) => {
  //popup to show ride history
  const hasHistory = rideHistory && rideHistory.length > 0; // Check if ride history exists

  const historyColumns = [
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
      grow: 1.5,
      cell: (row) => (
        <span style={{ color: "#38bff8", fontWeight: 600 }}>{row.time}</span>
      ),
    },
    { name: "Booking ID", selector: (row) => row.bookingId, grow: 1 },
    { name: "Customer", selector: (row) => row.customer, grow: 1.5 },
    {
      name: "Route",
      selector: (row) => `${row.pickup} to ${row.droppedLocation}`,
      cell: (row) => (
        <span>
          {row.pickup} <span style={{ color: "#94a3b8" }}>→</span>{" "}
          {row.droppedLocation}
        </span>
      ),
      grow: 2,
    },
    {
      name: "Duration/Distance",
      selector: (row) => `${row.timeTaken} / ${row.distance}`,
      cell: (row) => (
        <span style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>
          {row.timeTaken} / {row.distance}
        </span>
      ),
      grow: 1.5,
    },
    { name: "Fare", selector: (row) => row.fare, grow: 1 },
  ];

  return (
    <div className="doc-modal-overlay">
      <div
        className="doc-modal-content"
        style={{ maxWidth: "95%", width: "1200px", padding: "30px" }}
      >
        <div className="modal-header-custom">
          <h3 className="section-title">
            Ride History for {driver.firstName} {driver.lastName} (D{driver.id})
          </h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {hasHistory ? (
          <DataTable
            columns={historyColumns}
            data={rideHistory}
            customStyles={glassTableStyles}
            highlightOnHover
            defaultSortFieldId={1}
            noDataComponent={
              <div style={{ padding: "20px", color: "#fff" }}>
                No ride history found for this driver.
              </div>
            }
          />
        ) : (
          <div
            style={{
              padding: "40px",
              color: "#94a3b8",
              textAlign: "center",
              fontSize: "1.1rem",
              background: "#0f172a",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <p style={{ marginBottom: "15px", color: "#fff", fontWeight: 600 }}>
              ⚠️ No ride history found for this driver.
            </p>
            <p>This driver has not completed any verifiable rides yet.</p>
          </div>
        )}

        <div
          className="modal-actions"
          style={{ justifyContent: "flex-end", paddingTop: "15px" }}
        >
          <button
            onClick={onClose}
            className="btn-reject"
            style={{ border: "none", background: "#334155", color: "#fff" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
// --- End Modal Component ---

export default function DriversPage() {
  const { drivers } = useDriverContext(); // Restored hook
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);

  const verifiedDrivers = useMemo(() => {
    return drivers.filter(
      (d) =>
        d.status === "verified" &&
        (d.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.phone.includes(searchTerm) ||
          (d.regNumber &&
            d.regNumber.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [drivers, searchTerm]);

  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      grow: 1.5,
      allowOverflow: true,
      cell: (row) => (
        <div className="name-cell-container">
          <span
            className="driver-name-text"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            {row.firstName} {row.lastName}
          </span>
          <div className="hover-popup">
            <div className="popup-header">Driver Details</div>
            <p>
              <strong>Reg No:</strong> {row.regNumber}
            </p>
            <p>
              <strong>Mobile:</strong> {row.phone}
            </p>
            <p>
              <strong>Address:</strong> {row.city}
            </p>
          </div>
        </div>
      ),
    },
    { name: "Mobile", selector: (row) => row.phone },
    {
      name: "Vehicle",
      selector: (row) => row.vehicleType,
      cell: (row) => (
        <span>
          {row.vehicleType}{" "}
          <small style={{ color: "#94a3b8" }}>({row.regNumber})</small>
        </span>
      ),
    },
    { name: "City", selector: (row) => row.city, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          style={{
            color: "#4ade80",
            fontWeight: "700",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            background: "rgba(74, 222, 128, 0.1)",
            padding: "4px 8px",
            borderRadius: "6px",
            border: "1px solid rgba(74, 222, 128, 0.2)",
          }}
        >
          ● Active
        </span>
      ),
    },
    {
      name: "History",
      cell: (row) => (
        <button
          className="btn-view-docs"
          onClick={() => setSelectedDriver(row)}
          style={{ padding: "6px 10px" }}
        >
          View History
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "120px",
    },
  ];

  return (
    <div className="driver-page-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h2 className="page-title">Verified Drivers List</h2>
        <div className="search-container" style={{ margin: 0 }}>
          <input
            type="text"
            placeholder="Search verified drivers..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-table-card">
        <DataTable
          columns={columns}
          data={verifiedDrivers}
          pagination
          customStyles={glassTableStyles}
          highlightOnHover
          noDataComponent={
            <div style={{ padding: "20px", color: "#fff" }}>
              No verified drivers found.
            </div>
          }
        />
      </div>

      {/* Driver History Modal */}
      {selectedDriver && (
        <DriverHistoryModal
          driver={selectedDriver}
          rideHistory={selectedDriver.rideHistory}
          onClose={() => setSelectedDriver(null)}
        />
      )}
    </div>
  );
}
