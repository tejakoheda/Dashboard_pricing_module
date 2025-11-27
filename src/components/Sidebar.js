// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ sidebarOpen, closeSidebar }) {
  const links = [
    { to: "/home", label: "Home" },
    { to: "/org-drivers", label: "Organization Drivers" },
    { to: "/analytics", label: "Analytics" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <>
      <aside className="sidebar d-none d-lg-block" aria-label="Main navigation">
        <div className="p-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                "sidebar-link d-block p-2 mb-2 " + (isActive ? "active" : "")
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Mobile slide sidebar */}
      <div
        className={`mobile-sidebar ${sidebarOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-2 d-flex justify-content-end">
          <button className="btn btn-sm btn-light" onClick={closeSidebar}>
            ✕
          </button>
        </div>
        <div className="p-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                "sidebar-link d-block p-2 mb-2 " + (isActive ? "active" : "")
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
