// src/pages/ConsumerPages/ConsumerList.js
import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useDriverContext } from "../../context/DriverContext";
// Assuming glassTableStyles is exported from ManualVerification.js
import { glassTableStyles } from "../DriverPages/ManualVerification";
import "../DriverPages/drivers.css"; // Imports necessary CSS for hover-popup and styling

// Modal Component for Consumer History (Unchanged)
const ConsumerHistoryModal = ({ rideHistory, consumer, onClose }) => {
  const hasHistory = rideHistory && rideHistory.length > 0;

  // Define columns for the history table
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
    { name: "Last Driver", selector: (row) => row.lastDriver, grow: 1.5 },
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
    { name: "Payment Details", selector: (row) => row.payment, grow: 2 },
  ];

  return (
    <div className="doc-modal-overlay">
      <div
        className="doc-modal-content"
        style={{ maxWidth: "95%", width: "1200px", padding: "30px" }}
      >
        <div className="modal-header-custom">
          <h3 className="section-title">
            Ride History for {consumer.firstName} {consumer.lastName} (
            {consumer.id})
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
              ⚠️ No ride history found for this consumer.
            </p>
            <p>
              This consumer was recently onboarded or has not completed any
              rides yet.
            </p>
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

export default function ConsumerList() {
  const { consumers } = useDriverContext(); // Get consumers from context
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsumer, setSelectedConsumer] = useState(null);

  const filteredConsumers = useMemo(() => {
    return consumers.filter(
      // Filter on context consumers
      (c) =>
        c.status === "Active" &&
        (c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.mobile.includes(searchTerm) ||
          c.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, consumers]); // Depend on consumers state

  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      grow: 1.5,
      allowOverflow: true, // Crucial for hover popup
      cell: (row) => (
        // Implemented hover popup logic here
        <div className="name-cell-container">
          <span
            className="driver-name-text" // Reusing driver-name-text style
            style={{ textDecoration: "none", color: "#38bff8" }}
          >
            {row.firstName} {row.lastName}
          </span>
          <div className="hover-popup">
            <div className="popup-header">Consumer Details</div>
            <p>
              <strong>ID:</strong> {row.id}
            </p>
            <p>
              <strong>Mobile:</strong> {row.mobile}
            </p>
            <p>
              <strong>Email:</strong> {row.email}
            </p>
            <p>
              <strong>Gender:</strong> {row.gender}
            </p>
            <p>
              <strong>DOB:</strong> {row.dob}
            </p>
          </div>
        </div>
      ),
    },
    { name: "Consumer ID", selector: (row) => row.id, sortable: true, grow: 1 },
    { name: "Mobile", selector: (row) => row.mobile, grow: 1.5 },
    { name: "Email", selector: (row) => row.email, grow: 2 },
    {
      name: "Status",
      selector: (row) => row.status,
      grow: 1,
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
          onClick={() => setSelectedConsumer(row)}
          style={{ padding: "6px 10px" }}
        >
          View History
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
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
        <h2 className="page-title">Active Consumer List</h2>
        <div className="search-container" style={{ margin: 0 }}>
          <input
            type="text"
            placeholder="Search consumers by name, ID, or mobile..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-table-card">
        <DataTable
          columns={columns}
          data={filteredConsumers}
          pagination
          customStyles={glassTableStyles}
          highlightOnHover
          noDataComponent={
            <div style={{ padding: "20px", color: "#fff" }}>
              No active consumers found.
            </div>
          }
        />
      </div>

      {selectedConsumer && (
        <ConsumerHistoryModal
          consumer={selectedConsumer}
          rideHistory={selectedConsumer.rideHistory}
          onClose={() => setSelectedConsumer(null)}
        />
      )}
    </div>
  );
}
