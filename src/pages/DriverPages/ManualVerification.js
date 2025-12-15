// src/pages/DriverPages/ManualVerification.js
import { useState } from "react";
import DataTable from "react-data-table-component";
import { useDriverContext } from "../../context/DriverContext"; // Restored hook
import "./drivers.css";

// Shared Table Styles
export const glassTableStyles = {
  table: { style: { backgroundColor: "transparent" } },
  headRow: {
    style: {
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      color: "#94a3b8",
      fontWeight: "700",
      fontSize: "0.85rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    },
  },
  rows: {
    style: {
      backgroundColor: "transparent",
      color: "#f1f5f9",
      fontSize: "0.95rem",
      minHeight: "60px",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.03) !important",
        color: "#ffffff !important",
        cursor: "default",
      },
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      color: "#cbd5e1",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      fontSize: "0.85rem",
    },
    pageButtonsStyle: {
      color: "#38bff8",
      fill: "#38bff8",
      backgroundColor: "transparent",
      "&:disabled": {
        color: "#475569",
        fill: "#475569",
      },
      "&:hover:not(:disabled)": {
        backgroundColor: "rgba(56, 191, 248, 0)",
      },
    },
  },
};

// --- Modal Component for Driver Ride History (Defined Locally) ---
const DriverHistoryModal = ({ rideHistory, driver, onClose }) => {
  const hasHistory = rideHistory && rideHistory.length > 0;

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

export default function ManualVerification() {
  const { drivers, verifyDriver, rejectDriver } = useDriverContext(); // Restored hook
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocs, setSelectedDocs] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [selectedDriverForHistory, setSelectedDriverForHistory] =
    useState(null); // New State

  const filteredDrivers = drivers.filter(
    (d) =>
      d.status === "pending" &&
      (d.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.phone.includes(searchTerm) ||
        d.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const ImageViewer = () => {
    if (!expandedImage) return null;
    return (
      <div
        className="image-viewer-overlay"
        onClick={() => setExpandedImage(null)}
      >
        <div
          className="image-viewer-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="close-image-btn"
            onClick={() => setExpandedImage(null)}
          >
            ✕
          </button>
          <img
            src={expandedImage}
            alt="Full Size"
            className="full-size-image"
          />
        </div>
      </div>
    );
  };

  const DocumentModal = ({ driver, onClose }) => {
    if (!driver) return null;
    return (
      <div className="doc-modal-overlay" onClick={onClose}>
        <div className="doc-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header-custom">
            <h3>
              Documents: {driver.firstName} {driver.lastName}
            </h3>
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="doc-grid">
            {[
              "selfie",
              "vehicleImage",
              "dlFront",
              "dlBack",
              "aadharFront",
              "aadharBack",
              "panFront",
              "panBack",
            ].map((field) => (
              <div key={field} className="doc-item">
                <span className="doc-label">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </span>
                {driver[field] ? (
                  <img
                    src={driver[field]}
                    alt={field}
                    className="doc-img-preview"
                    onClick={() => setExpandedImage(driver[field])}
                    title="Click to zoom"
                  />
                ) : (
                  <div
                    style={{
                      padding: "40px",
                      color: "#555",
                      fontSize: "0.8rem",
                    }}
                  >
                    No File
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <button
              className="btn-reject"
              onClick={() => {
                rejectDriver(driver.id);
                onClose();
              }}
            >
              Reject
            </button>
            <button
              className="btn-verify"
              onClick={() => {
                verifyDriver(driver.id);
                onClose();
              }}
            >
              Verify & Approve
            </button>
          </div>
        </div>
      </div>
    );
  };

  const columns = [
    {
      name: "Driver Name",
      selector: (row) => row.firstName,
      allowOverflow: true, // Fix for popup clipping
      cell: (row) => (
        <div className="name-cell-container">
          <span className="driver-name-text">
            {row.firstName} {row.lastName}
          </span>
          <div className="hover-popup">
            <div className="popup-header">Details</div>
            <p>
              <strong>Email:</strong> {row.email}
            </p>
            <p>
              <strong>Gender:</strong> {row.gender}
            </p>
            <div
              style={{
                height: "1px",
                background: "rgba(255,255,255,0.1)",
                margin: "8px 0",
              }}
            ></div>
            <div className="popup-header">Address</div>
            <p>
              {row.houseNo}, {row.street}
            </p>
            <p>
              {row.city}, {row.district}
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
              {row.state} - {row.pinCode}
            </p>
          </div>
        </div>
      ),
      sortable: true,
      grow: 1.5,
    },
    { name: "Mobile", selector: (row) => row.phone, sortable: true },
    { name: "City", selector: (row) => row.city, sortable: true },
    {
      name: "Applied On",
      selector: (row) => row.submittedAt,
      sortable: true,
      right: true,
    },
    {
      name: "Documents",
      cell: (row) => (
        <button className="btn-view-docs" onClick={() => setSelectedDocs(row)}>
          Verify Docs
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
    // New History Column
    {
      name: "History",
      cell: (row) => (
        <button
          className="btn-view-docs"
          onClick={() => setSelectedDriverForHistory(row)}
          style={{ padding: "6px 10px" }}
        >
          View History
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action-buttons">
          <button
            className="btn-verify-sm"
            onClick={() => verifyDriver(row.id)}
            title="Verify"
          >
            ✓
          </button>
          <button
            className="btn-reject-sm"
            onClick={() => rejectDriver(row.id)}
            title="Reject"
          >
            ✕
          </button>
        </div>
      ),
      right: true,
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
        <h2 className="page-title">Manual Verification</h2>
        <div className="search-container" style={{ margin: 0 }}>
          <input
            type="text"
            placeholder="Search applications..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-table-card">
        <DataTable
          columns={columns}
          data={filteredDrivers}
          pagination
          customStyles={glassTableStyles}
          highlightOnHover
          responsive
          noDataComponent={
            <div style={{ padding: "20px", color: "#fff" }}>
              No pending verifications found.
            </div>
          }
        />
      </div>

      {selectedDocs && (
        <DocumentModal
          driver={selectedDocs}
          onClose={() => setSelectedDocs(null)}
        />
      )}
      <ImageViewer />

      {/* Driver History Modal for Manual Verification Page */}
      {selectedDriverForHistory && (
        <DriverHistoryModal
          driver={selectedDriverForHistory}
          rideHistory={selectedDriverForHistory.rideHistory}
          onClose={() => setSelectedDriverForHistory(null)}
        />
      )}
    </div>
  );
}
