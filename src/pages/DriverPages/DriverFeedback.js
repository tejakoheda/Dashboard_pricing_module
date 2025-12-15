// src/pages/DriverPages/DriverFeedback.js
import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { glassTableStyles } from "./ManualVerification"; // Reusing table styles
import "./drivers.css";

// Dummy Feedback Data (Sample Data) - Updated to include longer comments and 'appreciated' status
const initialFeedback = [
  {
    id: 1,
    driverName: "Ravi Kumar",
    driverId: "D101",
    customer: "Priya Singh",
    rating: 5,
    category: "Service Quality",
    comment:
      "The driver was very polite and the ride was smooth. Excellent experience! I highly recommend him to all future customers.",
    date: "2023-11-01",
    appreciated: false,
  },
  {
    id: 2,
    driverName: "Sita Lakshmi",
    driverId: "D102",
    customer: "Arjun Reddy",
    rating: 2,
    category: "Punctuality",
    comment:
      "Driver arrived 15 minutes late. No communication about the delay. This is an issue that needs to be resolved immediately as I rely on this service for my daily commute to work.",
    date: "2023-11-02",
    appreciated: false,
  },
  {
    id: 3,
    driverName: "Ahmed Ali",
    driverId: "D103",
    customer: "Meena Jain",
    rating: 4,
    category: "Vehicle Condition",
    comment:
      "Vehicle was clean, but the AC was not working properly. It was a hot day and this made the ride quite uncomfortable, but the driver was apologetic.",
    date: "2023-11-03",
    appreciated: false,
  },
  {
    id: 4,
    driverName: "John Doe",
    driverId: "D104",
    customer: "Vivek",
    rating: 5,
    category: "Driving Skill",
    comment:
      "Very safe and smooth driving. Highly recommended for long rides. The best driver I've had in a long time. Keep up the good work!",
    date: "2023-11-04",
    appreciated: false,
  },
  {
    id: 5,
    driverName: "Anusha Patel",
    driverId: "D107",
    customer: "Sanjay",
    rating: 1,
    category: "Driver Behavior",
    comment:
      "Driver was rude and argumentative about the route and payment. I felt unsafe and will think twice before booking again. Please look into this matter immediately.",
    date: "2023-11-05",
    appreciated: false,
  },
];

// New Component for the Appreciation Button
const ReviewAppreciation = ({ review, onAppreciate }) => {
  const isPositive = review.rating >= 4;

  // Logic to determine button message based on rating
  const titleMessage = isPositive
    ? "Thank you, we appreciate your review."
    : "Sorry for the inconvenience. We'll ensure it doesn't repeat next time. Thanks for feedback.";

  return (
    <button
      className="btn-view-docs" // Reusing btn-view-docs for a styled button
      onClick={() => onAppreciate(review.id, titleMessage)}
      style={{
        padding: "6px 10px",
        fontSize: "0.8rem",
        minWidth: "100px",
        // Positive: Greenish, Negative: Reddish - using existing color variables
        background: isPositive
          ? "rgba(74, 222, 128, 0.2)"
          : "rgba(248, 113, 113, 0.2)",
        color: isPositive ? "#4ade80" : "#f87171",
        border: "1px solid " + (isPositive ? "#4ade80" : "#f87171"),
      }}
      disabled={review.appreciated}
    >
      {review.appreciated ? "Actioned" : "Appreciate"}
    </button>
  );
};

export default function DriverFeedback() {
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState(initialFeedback); // State to manage feedback status

  // Handle appreciation action
  const handleAppreciate = (id, message) => {
    alert(message); // Show the thank you/sorry message
    // Update the 'appreciated' status of the review
    setFeedback((prevFeedback) =>
      prevFeedback.map((f) => (f.id === id ? { ...f, appreciated: true } : f))
    );
  };

  // Data Table Columns ni define cheyyadam
  const columns = [
    {
      name: "Driver Name (ID)",
      selector: (row) => row.driverName,
      sortable: true,
      grow: 1.5,
      // Hover popup structure ni reuse chestunnamu for color fix and future expandability
      cell: (row) => (
        <div className="name-cell-container">
          <span
            className="driver-name-text"
            style={{ textDecoration: "none", color: "#38bff8" }}
          >
            {row.driverName}{" "}
            <small style={{ color: "#94a3b8" }}>({row.driverId})</small>
          </span>
          {/* Dummy popup is needed for the styling to work correctly */}
          <div className="hover-popup" style={{ width: "250px" }}>
            <div className="popup-header">Driver Info</div>
            <p>Customer: {row.customer}</p>
            <p>Rating: {row.rating} ★</p>
          </div>
        </div>
      ),
    },
    {
      name: "Customer",
      selector: (row) => row.customer,
      sortable: true,
      grow: 1.2,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
      width: "100px",
      cell: (row) => (
        <span
          style={{
            color:
              row.rating >= 4
                ? "#4ade80"
                : row.rating > 2
                ? "#fbbf24"
                : "#f87171",
            fontWeight: "700",
          }}
        >
          {"★".repeat(row.rating)} ({row.rating})
        </span>
      ),
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "150px",
    },
    {
      name: "Comment",
      selector: (row) => row.comment,
      grow: 3,
      // Full message hover effect ni implement cheyyadam
      cell: (row) => (
        <div
          className="name-cell-container"
          style={{
            maxWidth: "350px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block", // To apply text-overflow
            padding: "8px 0", // To match other cells
          }}
        >
          <span style={{ color: "#f1f5f9" }}>{row.comment}</span>
          <div
            className="hover-popup"
            style={{
              width: "400px",
              whiteSpace: "normal",
              overflow: "visible",
            }}
          >
            <div className="popup-header">
              Full Comment (Rating: {row.rating}★)
            </div>
            <p style={{ whiteSpace: "normal", lineHeight: "1.4" }}>
              {row.comment}
            </p>
          </div>
        </div>
      ),
    },
    // {
    //   name: "Date",
    //   selector: (row) => row.date,
    //   sortable: true,
    //   width: "120px",
    //   right: true,
    // },
    {
      name: "Action",
      cell: (row) => (
        <ReviewAppreciation review={row} onAppreciate={handleAppreciate} />
      ),
      ignoreRowClick: true,
      button: true,
      width: "140px",
    },
  ];

  // Search logic implement cheyyadam
  const filteredFeedback = useMemo(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();

    if (!lowerCaseSearch) return feedback;

    return feedback.filter(
      (f) =>
        f.driverName.toLowerCase().includes(lowerCaseSearch) ||
        f.driverId.toLowerCase().includes(lowerCaseSearch) ||
        f.customer.toLowerCase().includes(lowerCaseSearch) ||
        f.comment.toLowerCase().includes(lowerCaseSearch) ||
        f.category.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchTerm, feedback]);

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
        <h2 className="page-title">Driver Feedback & Reviews</h2>
        {/* Search Bar */}
        <div className="search-container" style={{ margin: 0 }}>
          <input
            type="text"
            placeholder="Search by driver, customer, or keyword..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-table-card">
        <DataTable
          columns={columns}
          data={filteredFeedback}
          pagination
          highlightOnHover
          responsive
          customStyles={glassTableStyles}
          noDataComponent={
            <div style={{ padding: "20px", color: "#fff" }}>
              No matching feedback found.
            </div>
          }
        />
      </div>
    </div>
  );
}
