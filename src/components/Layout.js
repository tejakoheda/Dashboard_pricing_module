// src/components/Layout.js
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="dashboard-layout">
      <NavBar />
      <Sidebar />
      {/* "Outlet" is where the child route (Dashboard, Drivers, etc.) renders */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
