// src/App.js
import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    const listener = (e) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "kc_popup_auth") window.location.reload();
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  if (!initialized) return <h2 style={{ padding: 24 }}>Loading Keycloak...</h2>;

  return keycloak.authenticated ? <Dashboard /> : <LoginPage />;
}
