// src/components/NavBar.js
import { useKeycloak } from "@react-keycloak/web";

export default function NavBar({ onToggleSidebar }) {
  const { keycloak } = useKeycloak();

  return (
    <header className="top-nav">
      <div className="nav-left">
        {/* Hamburger Menu - Visible only on mobile */}
        <button className="btn-menu" onClick={onToggleSidebar}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <a href="https://www.voltacabs.com" target="_blank" rel="noreferrer">
          <img
            src="https://www.voltacabs.com/assets/img/logo/volta-ai-logo%20W.png"
            alt="Volta Logo"
            className="nav-logo"
          />
        </a>
        <div style={{ marginLeft: 12 }}></div>
      </div>

      <div className="nav-right">
        <button
          className="btn-logout"
          onClick={() =>
            keycloak.logout({ redirectUri: window.location.origin })
          }
        >
          Logout
        </button>
      </div>
    </header>
  );
}
