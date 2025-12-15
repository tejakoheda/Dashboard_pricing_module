// src/pages/PricingPages/PricingManage.js
import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useDriverContext } from "../../context/DriverContext";
import { glassTableStyles } from "../DriverPages/ManualVerification";
import "../DriverPages/drivers.css";
// Import the PricingForm for use in the modal
import { PricingForm } from "./PricingModule";
import { useNavigate } from "react-router-dom";

// Modal Component to wrap the PricingForm
const PricingFormModal = ({ editingModel, onClose }) => {
  const { updatePricingModel } = useDriverContext();
  const isEditMode = !!editingModel;

  // Handler for updating the model in context
  const handleFormSubmit = (modelData) => {
    if (isEditMode) {
      // Merge new config data with existing model properties and pass the ID
      updatePricingModel(editingModel.id, modelData);
      alert("Pricing Model Updated Successfully!");
    } else {
      console.warn("Attempted to create via modal, use /pricing/new route.");
    }
    onClose();
  };

  const modalTitle = isEditMode
    ? `Edit Pricing: ${editingModel.vehicle} - ${
        editingModel.region
      } (${editingModel.type.toUpperCase()})`
    : "Error: Cannot create from this modal.";

  return (
    <div className="doc-modal-overlay">
      <div
        className="doc-modal-content"
        style={{ maxWidth: "850px", width: "90%", padding: "30px" }}
      >
        <div className="modal-header-custom">
          <h3 className="section-title">{modalTitle}</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <PricingForm
          initialData={editingModel} // Pass the entire model object to pre-fill fields
          onSubmitSuccess={handleFormSubmit}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default function PricingManage() {
  const { pricingModels, togglePricingStatus } = useDriverContext();
  const navigate = useNavigate();
  const [editingModel, setEditingModel] = useState(null); // Holds data for the model being edited

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      { name: "ID", selector: (row) => row.id, sortable: true, width: "60px" },
      {
        name: "Vehicle Type",
        selector: (row) => row.vehicle,
        sortable: true,
        grow: 1,
      },
      {
        name: "Pricing Type",
        selector: (row) => row.type,
        sortable: true,
        grow: 1.5,
        cell: (row) => (
          <span style={{ textTransform: "capitalize" }}>{row.type}</span>
        ),
      },
      {
        name: "Region",
        selector: (row) => row.region,
        sortable: true,
        grow: 2,
      },
      {
        name: "Last Updated",
        selector: (row) => row.lastUpdated,
        sortable: true,
        grow: 1.5,
      },
      {
        name: "Status",
        selector: (row) => row.status,
        cell: (row) => (
          <span
            style={{
              color:
                row.status === "Active"
                  ? "#4ade80"
                  : row.status === "Draft"
                  ? "#facc15"
                  : "#f87171",
              fontWeight: "700",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              background: `rgba(${
                row.status === "Active"
                  ? "74, 222, 128"
                  : row.status === "Draft"
                  ? "250, 202, 21"
                  : "248, 113, 113"
              }, 0.1)`,
              padding: "4px 8px",
              borderRadius: "6px",
              border: `1px solid rgba(${
                row.status === "Active"
                  ? "74, 222, 128"
                  : row.status === "Draft"
                  ? "250, 202, 21"
                  : "248, 113, 113"
              }, 0.2)`,
            }}
          >
            ● {row.status}
          </span>
        ),
        grow: 1,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="action-buttons">
            <button
              className="btn-view-docs"
              style={{ padding: "6px 10px" }}
              onClick={() => setEditingModel(row)} // Open modal for editing
            >
              Edit
            </button>
            <button
              className={
                row.status === "Active" ? "btn-reject-sm" : "btn-verify-sm"
              }
              style={{ width: "30px", height: "30px" }}
              onClick={() => togglePricingStatus(row.id)} // Toggle status
              title={row.status === "Active" ? "Pause" : "Activate"}
            >
              {row.status === "Active" ? "⏸️" : "▶️"}
            </button>
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        grow: 1.5,
      },
    ],
    [togglePricingStatus]
  );

  return (
    <div className="driver-page-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2 className="page-title">Manage Active Pricing Structures</h2>
        <button
          className="btn-submit"
          style={{ padding: "10px 20px", fontSize: "0.9rem" }}
          onClick={() => navigate("/pricing/new")} // Redirects to the dedicated creation page
        >
          + Create New
        </button>
      </div>

      <div className="glass-table-card">
        <DataTable
          columns={columns}
          data={pricingModels} // Use live data from context
          pagination
          customStyles={glassTableStyles}
          highlightOnHover
          noDataComponent={
            <div style={{ padding: "20px", color: "#fff" }}>
              No pricing models found.
            </div>
          }
        />
      </div>

      {/* Renders the modal when an item is selected for editing */}
      {editingModel && (
        <PricingFormModal
          // FIX: Use key={editingModel.id} to force remount and re-initialization of the form
          key={editingModel.id}
          editingModel={editingModel}
          onClose={() => setEditingModel(null)}
        />
      )}
    </div>
  );
}
