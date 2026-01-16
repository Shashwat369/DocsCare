import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import "./PatientLayout.css";

const PatientLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="dashboard-main">
        <button
          className="mobile-sidebar-btn"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default PatientLayout;
