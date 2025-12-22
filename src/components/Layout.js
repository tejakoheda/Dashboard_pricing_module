// src/components/Layout.js
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="dashboard-layout">
      {/* Pass toggle function to NavBar */}
      <NavBar onToggleSidebar={toggleSidebar} />

      {/* Pass open state and close function to Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Mobile Overlay - only visible when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* "Outlet" is where the child route (Dashboard, Drivers, etc.) renders */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
