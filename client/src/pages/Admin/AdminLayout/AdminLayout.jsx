import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../AdminDashboard/adminDashboard.css";

const AdminLayout = () => {
  const admin = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="admin-layout">
      {/* ===== Sidebar ===== */}
      <aside className="admin-sidebar">
        <h2 className="logo">DocsCare</h2>

        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/pending-doctors">Pending Doctors</Link>
          <Link to="/admin/approved-doctors">Approved Doctors</Link>
          <Link to="/admin/appointments">Appointments</Link>
          <Link to="/admin/availability">Doctor Availability</Link>
          <Link to="/admin/settings">Settings</Link>
        </nav>
      </aside>

      {/* ===== Main Section ===== */}
      <main className="admin-main">
        {/* ===== Header ===== */}
        <header className="admin-header">
          <div>
            <h3>{admin?.clinicName}</h3>
            {/* <p>{admin?.email}</p> */}
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
