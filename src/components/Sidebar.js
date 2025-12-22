// src/components/Sidebar.js
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [isDriversOpen, setDriversOpen] = useState(false);
  const [isConsumersOpen, setConsumersOpen] = useState(false);
  const [isPricingOpen, setPricingOpen] = useState(false);
  // No submenu for marketing yet, but prepared state if needed
  // const [isMarketingOpen, setMarketingOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/drivers")) setDriversOpen(true);
    if (location.pathname.startsWith("/consumers")) setConsumersOpen(true);
    if (location.pathname.startsWith("/pricing")) setPricingOpen(true);
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
              <ul className="sidebar-submenu list-unstyled">
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

          {/* Consumers Dropdown */}
          <li className="sidebar-item">
            <button
              className="sidebar-link btn-plain"
              onClick={() => setConsumersOpen(!isConsumersOpen)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flex: 1,
                }}
              >
                <span className="sidebar-icon">🧑</span>
                <span className="sidebar-text">Consumer Management</span>
              </div>
              <span
                className={`dropdown-arrow ${isConsumersOpen ? "open" : ""}`}
              >
                ▼
              </span>
            </button>

            {isConsumersOpen && (
              <ul className="sidebar-submenu list-unstyled">
                <li>
                  <NavLink
                    to="/consumers"
                    className={({ isActive }) =>
                      `submenu-link ${isActive ? "active" : ""}`
                    }
                  >
                    Consumer List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/consumers/onboarding"
                    className={({ isActive }) =>
                      `submenu-link ${isActive ? "active" : ""}`
                    }
                  >
                    Onboarding Consumer
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Pricing Module Dropdown */}
          <li className="sidebar-item">
            <button
              className="sidebar-link btn-plain"
              onClick={() => setPricingOpen(!isPricingOpen)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flex: 1,
                }}
              >
                <span className="sidebar-icon">💰</span>
                <span className="sidebar-text">Pricing Module</span>
              </div>
              <span className={`dropdown-arrow ${isPricingOpen ? "open" : ""}`}>
                ▼
              </span>
            </button>

            {isPricingOpen && (
              <ul className="sidebar-submenu list-unstyled">
                <li>
                  <NavLink
                    to="/pricing/new"
                    className={({ isActive }) =>
                      `submenu-link ${isActive ? "active" : ""}`
                    }
                  >
                    Create New Structure
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pricing/manage"
                    className={({ isActive }) =>
                      `submenu-link ${isActive ? "active" : ""}`
                    }
                  >
                    Manage Active Pricing
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* --- NEW MARKETING SECTION --- */}

          <li className="sidebar-item">
            <NavLink to="/promotions" className="sidebar-link btn-plain">
              <span className="sidebar-icon">🏷️</span>
              <span className="sidebar-text">Coupons</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
