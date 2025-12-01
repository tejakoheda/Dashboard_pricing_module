// src/components/NavBar.js
import { useKeycloak } from "@react-keycloak/web";

export default function NavBar() {
  const { keycloak } = useKeycloak();

  return (
    <header className="top-nav">
      <div className="nav-left">
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
