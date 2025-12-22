// src/pages/PromotionPages/Promotions.js
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import { useDriverContext } from "../../context/DriverContext";
// Import the shared styles from ManualVerification to ensure exact match
import { glassTableStyles } from "../DriverPages/ManualVerification";
import "../DriverPages/drivers.css";
import "../DriverPages/DriverOnboarding.css";

// --- 1. Promotion Form Component ---
const PromotionForm = ({ initialData, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      code: "",
      title: "",
      description: "",
      type: "percentage",
      value: "",
      maxDiscount: "",
      minOrderValue: 0,
      vehicleType: "All",
      usageLimit: 100,
      startDate: "",
      endDate: "",
    },
  });

  const discountType = watch("type");

  return (
    <div
      className="glass-table-card" // Using the exact same class as the table container
      style={{
        padding: "25px",
        marginBottom: "25px",
        animation: "fadeIn 0.3s ease-out",
        border: "1px solid rgba(255, 255, 255, 0.08)", // Standard border
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: "15px",
        }}
      >
        <h3
          className="section-title"
          style={{ margin: 0, fontSize: "1.25rem", color: "#fff" }}
        >
          {initialData ? "Edit Promotion" : "Create New Promotion"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            fontSize: "24px",
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Row 1 */}
        <div
          className="form-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 2fr",
            gap: "20px",
          }}
        >
          <div className="form-group">
            <label className="form-label">Code</label>
            <input
              type="text"
              className={`form-control ${errors.code ? "is-invalid" : ""}`}
              placeholder="CODE123"
              style={{
                textTransform: "uppercase",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
              {...register("code", { required: "Required" })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              placeholder="e.g. 20% Off Ride"
              {...register("title", { required: "Required" })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Details visible to user..."
              {...register("description")}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div
          className="form-grid"
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-control" {...register("type")}>
              <option value="percentage">Percentage %</option>
              <option value="flat">Flat Amount ₹</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Value</label>
            <input
              type="number"
              step="0.01"
              className={`form-control ${errors.value ? "is-invalid" : ""}`}
              placeholder="0.00"
              {...register("value", { required: "Required" })}
            />
          </div>
          {discountType === "percentage" ? (
            <div className="form-group">
              <label className="form-label">Max Cap (₹)</label>
              <input
                type="number"
                className="form-control"
                placeholder="No Limit"
                {...register("maxDiscount")}
              />
            </div>
          ) : (
            <div className="form-group" />
          )}
          <div className="form-group">
            <label className="form-label">Min Order (₹)</label>
            <input
              type="number"
              className="form-control"
              placeholder="0"
              {...register("minOrderValue")}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div
          className="form-grid"
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          <div className="form-group">
            <label className="form-label">Vehicle</label>
            <select className="form-control" {...register("vehicleType")}>
              <option value="All">All Vehicles</option>
              <option value="Auto">Auto 🛺</option>
              <option value="Bike">Bike 🏍️</option>
              <option value="Car">Car 🚗</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Total Limit</label>
            <input
              type="number"
              className="form-control"
              placeholder="Total uses"
              {...register("usageLimit", { required: true })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
              {...register("startDate", { required: true })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
              {...register("endDate", { required: true })}
            />
          </div>
        </div>

        <div
          className="form-actions"
          style={{ marginTop: "25px", justifyContent: "flex-end", gap: "12px" }}
        >
          <button
            type="button"
            onClick={onCancel}
            className="btn-reject"
            style={{ padding: "8px 20px" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-submit"
            style={{ padding: "8px 25px" }}
          >
            {initialData ? "Update Promotion" : "Create Promotion"}
          </button>
        </div>
      </form>
    </div>
  );
};

// --- 2. Main Promotions Page ---
export default function Promotions() {
  const {
    promotions,
    addPromotion,
    updatePromotion,
    deletePromotion,
    togglePromotionStatus,
  } = useDriverContext();

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPromotions = useMemo(() => {
    return promotions.filter(
      (p) =>
        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [promotions, searchTerm]);

  // Handlers
  const handleSave = (data) => {
    if (editData) {
      updatePromotion(editData.id, { ...data, code: data.code.toUpperCase() });
    } else {
      addPromotion({ ...data, code: data.code.toUpperCase() });
    }
    closeForm();
  };

  const handleEditClick = (row) => {
    setEditData(row);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditData(null);
  };

  // Columns using standard styles
  const columns = [
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
      cell: (row) => (
        <span style={{ fontWeight: 700, color: "#38bff8" }}>{row.code}</span>
      ),
      width: "140px",
    },
    {
      name: "Details",
      selector: (row) => row.title,
      cell: (row) => (
        <div
          style={{ display: "flex", flexDirection: "column", padding: "6px 0" }}
        >
          <span
            style={{ fontWeight: 600, fontSize: "0.95rem", color: "#f1f5f9" }}
          >
            {row.title}
          </span>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
            {row.type === "percentage"
              ? `${row.value}% OFF`
              : `₹${row.value} FLAT`}
            {row.minOrderValue > 0 ? ` • Min Order ₹${row.minOrderValue}` : ""}
          </span>
        </div>
      ),
      grow: 2,
    },
    {
      name: "Validity",
      selector: (row) => row.endDate,
      sortable: true,
      cell: (row) => (
        <span style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>
          {row.startDate} <span style={{ color: "#64748b" }}>→</span>{" "}
          {row.endDate}
        </span>
      ),
      grow: 1.5,
    },
    {
      name: "Usage",
      selector: (row) => row.usageCount,
      cell: (row) => {
        const percentage = Math.min(
          (row.usageCount / row.usageLimit) * 100,
          100
        );
        const isFull = row.usageCount >= row.usageLimit;
        return (
          <div style={{ width: "90%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                marginBottom: "4px",
                color: "#cbd5e1",
              }}
            >
              <span>{row.usageCount} used</span>
              <span>{row.usageLimit} total</span>
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: "100%",
                  background: isFull ? "#ef4444" : "#4ade80",
                  borderRadius: "3px",
                }}
              />
            </div>
          </div>
        );
      },
      grow: 1.5,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <button
          onClick={() => togglePromotionStatus(row.id)}
          style={{
            background:
              row.status === "Active"
                ? "rgba(74, 222, 128, 0.1)"
                : "rgba(239, 68, 68, 0.1)",
            color: row.status === "Active" ? "#4ade80" : "#ef4444",
            border: `1px solid ${
              row.status === "Active"
                ? "rgba(74, 222, 128, 0.2)"
                : "rgba(239, 68, 68, 0.2)"
            }`,
            padding: "4px 12px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "0.75rem",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          {row.status}
        </button>
      ),
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="btn-view-docs"
            onClick={() => handleEditClick(row)}
            style={{ padding: "6px 12px", fontSize: "0.8rem" }}
          >
            Edit
          </button>
          <button
            className="btn-reject-sm"
            onClick={() => {
              if (window.confirm("Delete this coupon?"))
                deletePromotion(row.id);
            }}
            style={{ padding: "6px 12px", fontSize: "0.8rem" }}
          >
            &times;
          </button>
        </div>
      ),
      width: "160px",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Page Title & Add Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2 className="page-title">Marketing & Promotions</h2>
        {!showForm && (
          <button
            className="btn-submit"
            onClick={() => setShowForm(true)}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              width: "auto",
            }}
          >
            <span>+</span> Create Coupon
          </button>
        )}
      </div>

      {/* --- FORM SECTION --- */}
      {showForm && (
        <PromotionForm
          initialData={editData}
          onSubmit={handleSave}
          onCancel={closeForm}
        />
      )}

      {/* --- TABLE SECTION --- */}
      {/* Using 'glass-table-card' class to match other pages */}
      <div className="glass-table-card">
        {/* Search Bar inside card like ManualVerification */}
        <div style={{ padding: "15px 15px 5px 15px" }}>
          <input
            type="text"
            placeholder="Search coupons..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredPromotions}
          pagination
          customStyles={glassTableStyles} // <--- SHARED STYLES RESTORED
          highlightOnHover
          responsive
          noDataComponent={
            <div style={{ padding: "30px", color: "#94a3b8" }}>
              No promotions found.
            </div>
          }
        />
      </div>
    </div>
  );
}
