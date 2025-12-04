// src/App.js
import { useEffect, Suspense, lazy } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Routes, Route, Navigate } from "react-router-dom";

// Eager load the Login page (critical path)
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout";
import Loading from "./pages/LoadingPage";

// Lazy load Dashboard
const Dashboard = lazy(() => import("./pages/Dashboard"));

// Lazy load Driver Pages from the new 'DriverPages' folder
const DriversPage = lazy(() => import("./pages/DriverPages/DriverList"));
const DriverOnboarding = lazy(() =>
  import("./pages/DriverPages/DriverOnboarding")
);
const ManualVerification = lazy(() =>
  import("./pages/DriverPages/ManualVerification")
);
const AutoVerification = lazy(() =>
  import("./pages/DriverPages/AutoVerification")
);
const DriverFeedback = lazy(() => import("./pages/DriverPages/DriverFeedback"));

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

  if (!initialized) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={
            keycloak.authenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />

        {/* Protected Routes (wrapped in Layout) */}
        <Route
          element={
            keycloak.authenticated ? (
              <Layout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/" element={<Dashboard />} />

          {/* Driver Sub-routes */}
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/drivers/onboarding" element={<DriverOnboarding />} />
          <Route
            path="/drivers/manual-verification"
            element={<ManualVerification />}
          />
          <Route
            path="/drivers/auto-verification"
            element={<AutoVerification />}
          />
          <Route path="/drivers/feedback" element={<DriverFeedback />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
