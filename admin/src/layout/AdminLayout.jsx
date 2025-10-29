import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ setToken }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (handles both desktop and mobile) */}
      <Sidebar setToken={setToken} />

      {/* Content area */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <main className="flex-1 mt-14 md:mt-0 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
