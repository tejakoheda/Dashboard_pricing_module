// src/App.js
import { useEffect, Suspense, lazy } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { DriverProvider } from "./context/DriverContext"; // Restored Import

import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout";
import Loading from "./pages/LoadingPage";

const Dashboard = lazy(() => import("./pages/Dashboard"));
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

const ConsumerList = lazy(() => import("./pages/ConsumerPages/ConsumerList"));
const ConsumerOnboarding = lazy(() =>
  import("./pages/ConsumerPages/ConsumerOnboarding")
);

const PricingModule = lazy(() => import("./pages/PricingPages/PricingModule"));
const PricingManage = lazy(() => import("./pages/PricingPages/PricingManage"));

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

  if (!initialized) return <Loading />;

  return (
    <DriverProvider>
      {" "}
      {/* Restored Provider */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/login"
            element={
              keycloak.authenticated ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage />
              )
            }
          />
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

            {/* Pricing Routes */}
            <Route
              path="/pricing"
              element={<Navigate to="/pricing/new" replace />}
            />
            <Route path="/pricing/new" element={<PricingModule />} />
            <Route path="/pricing/manage" element={<PricingManage />} />

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

            <Route path="/consumers" element={<ConsumerList />} />
            <Route
              path="/consumers/onboarding"
              element={<ConsumerOnboarding />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </DriverProvider>
  );
}
