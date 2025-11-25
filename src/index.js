import ReactDOM from "react-dom/client";
import App from "./App";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";

const initOptions = {
  onLoad: "check-sso",
  pkceMethod: "S256",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
    <App />
  </ReactKeycloakProvider>
);
