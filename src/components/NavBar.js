// src/components/NavBar.js
import React from "react";
import { useKeycloak } from "@react-keycloak/web";

export default function NavBar() {
  const { keycloak } = useKeycloak();
  const logoUrl =
    "https://www.voltacabs.com/assets/img/logo/volta-ai-logo%20W.png";

  return (
    <header className="top-nav">
      <div className="nav-left">
        <img src={logoUrl} alt="Volta Logo" className="nav-logo" />
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
