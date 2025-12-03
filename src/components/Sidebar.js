// src/components/Sidebar.js
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [isDriversOpen, setDriversOpen] = useState(false);

  // Auto-open dropdown if user is already in drivers routes
  useEffect(() => {
    if (location.pathname.startsWith("/drivers")) {
      setDriversOpen(true);
    }
  }, [location.pathname]);

  return (
    <nav className="sidebar d-none d-md-block" aria-label="Main sidebar">
      <div className="sidebar-inner">
        <ul className="sidebar-list list-unstyled">
          {/* Dashboard */}
          <li className="sidebar-item">
            <NavLink to="/" className="sidebar-link btn-plain">
              <span className="sidebar-icon">🏠</span>
              <span className="sidebar-text">Dashboard</span>
            </NavLink>
          </li>

          {/* Drivers Dropdown */}
          <li className="sidebar-item">
            <button
              className="sidebar-link btn-plain"
              onClick={() => setDriversOpen(!isDriversOpen)}
              aria-expanded={isDriversOpen}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flex: 1,
                }}
              >
                <span className="sidebar-icon">👨‍✈️</span>
                <span className="sidebar-text">Drivers Management</span>
              </div>
              <span className={`dropdown-arrow ${isDriversOpen ? "open" : ""}`}>
                ▼
              </span>
            </button>

            {isDriversOpen && (
              <ul className="sidebar-submenu list-styled">
                <li>
                  <NavLink
                    to="/drivers"
                    className={({ isActive }) =>
                      `submenu-link ${isActive ? "active" : ""}`
                    }
                  >
                    Drivers List
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/drivers/onboarding"
                    className={({ isActive }) =>
                      `submenu-link ${isActive ? "active" : ""}`
                    }
                  >
                    Driver Onboarding
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/drivers/manual-verification"
                    className={({ isActive }) =>
                      `submenu-link ${isActive ? "active" : ""}`
                    }
                  >
                    Manual Verification
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/drivers/auto-verification"
                    className={({ isActive }) =>
                      `submenu-link ${isActive ? "active" : ""}`
                    }
                  >
                    Auto Verifications
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/drivers/feedback"
                    className={({ isActive }) =>
                      `submenu-link ${isActive ? "active" : ""}`
                    }
                  >
                    Driver Feedback
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
