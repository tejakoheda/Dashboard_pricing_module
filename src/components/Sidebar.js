// src/components/Sidebar.js
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path) => {
    navigate(path);
  };

  return (
    <nav className="sidebar d-none d-md-block" aria-label="Main sidebar">
      <div className="sidebar-inner">
        <ul className="sidebar-list list-unstyled">
          {/* Dashboard Link */}
          <li className="sidebar-item">
            <button
              className="sidebar-link btn-plain"
              onClick={() => go("/")}
              aria-current={location.pathname === "/" ? "true" : "false"}
            >
              <span className="sidebar-icon" aria-hidden>
                🏠
              </span>
              <span className="sidebar-text">Dashboard</span>
            </button>
          </li>

          {/* Drivers Link */}
          <li className="sidebar-item">
            <button
              className="sidebar-link btn-plain"
              onClick={() => go("/drivers")}
              aria-current={location.pathname === "/drivers" ? "true" : "false"}
            >
              <span className="sidebar-icon" aria-hidden>
                👨‍✈️
              </span>
              <span className="sidebar-text">Drivers</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
