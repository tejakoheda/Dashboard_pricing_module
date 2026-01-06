// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";

import keycloak from "./keycloak";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "./styles.css"; // Custom global styles

const initOptions = {
  onLoad: "check-sso", // or "login-required"
  pkceMethod: "S256", // Use PKCE for enhanced security
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactKeycloakProvider>
  </React.StrictMode>
);
