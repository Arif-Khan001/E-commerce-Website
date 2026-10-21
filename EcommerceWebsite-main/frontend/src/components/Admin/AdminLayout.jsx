import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

/*
  AdminLayout is the wrapper for all admin pages.
  It provides:
  - Responsive sidebar
  - Mobile toggle
  - Main content area using <Outlet />
*/
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-gray-100">

      {/* ================= MOBILE HEADER ================= */}
      <header className="flex md:hidden items-center p-4 bg-gray-900 text-white z-30">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="focus:outline-none"
        >
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-lg font-semibold">Admin Dashboard</h1>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          bg-gray-900 text-white w-64 min-h-screen
          absolute md:relative
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 z-30
        `}
      >
        <AdminSideBar closeSidebar={() => setIsSidebarOpen(false)} />
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
