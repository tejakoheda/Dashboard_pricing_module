// src/App.js
import { useEffect, Suspense, lazy } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Routes, Route, Navigate } from "react-router-dom";

// Eager load the Login page (critical path)
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";

// Lazy load data-heavy pages (Code Splitting)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DriversPage = lazy(() => import("./pages/DriversPage"));

// Simple loading spinner component
const Loading = () => (
  <div style={styles.container}>
    <div className="loader-wrapper">
      <div className="pin"></div>
      <div className="orbit orbit-1"></div>
      <div className="orbit orbit-2"></div>
      <div className="orbit orbit-3"></div>
    </div>
    <p style={styles.text}>Fetching...</p>
    <div className="dots">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <style>
      {`
        .loader-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pin {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
          border-radius: 50%;
          position: relative;
          z-index: 10;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.6),
                      0 0 40px rgba(255, 255, 255, 0.3);
          animation: pinPulse 2s ease-in-out infinite;
        }

        .pin::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: inherit;
          border-radius: 50%;
          animation: innerPulse 1.5s ease-in-out infinite alternate;
        }

        .orbit {
          position: absolute;
          border: 2px solid transparent;
          border-radius: 50%;
          border-top-color: rgba(255, 255, 255, 0.9);
          border-right-color: rgba(255, 255, 255, 0.6);
          animation: rotate 3s linear infinite;
        }

        .orbit-1 {
          width: 60px;
          height: 60px;
          animation-duration: 2s;
          border-width: 3px;
        }

        .orbit-2 {
          width: 90px;
          height: 90px;
          animation-duration: 3s;
          animation-direction: reverse;
          border-width: 2px;
          opacity: 0.7;
        }

        .orbit-3 {
          width: 120px;
          height: 120px;
          animation-duration: 4s;
          border-width: 2px;
          opacity: 0.5;
        }

        .dots {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }

        .dots span {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: dotBounce 1.4s ease-in-out infinite;
        }

        .dots span:nth-child(1) {
          animation-delay: 0s;
        }

        .dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes pinPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.6),
                        0 0 40px rgba(255, 255, 255, 0.3);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
                        0 0 60px rgba(255, 255, 255, 0.5);
          }
        }

        @keyframes innerPulse {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes dotBounce {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}
    </style>
  </div>
);

const styles = {
  container: {
    background: "linear-gradient(to right, #A43931, #1D4350)",
    color: "#fff",
    textAlign: "center",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  text: {
    marginTop: "30px",
    opacity: 0.9,
    fontSize: "20px",
    fontWeight: "500",
    letterSpacing: "0.5px",
  },
};
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
          <Route path="/drivers" element={<DriversPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
