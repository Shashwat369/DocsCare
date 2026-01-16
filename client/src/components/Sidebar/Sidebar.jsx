import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user, userType } = useAuth();
  const location = useLocation();

  const patientLinks = [
    { name: "Dashboard", path: "/user-dashboard" },
    { name: "Book an Appointment", path: "/find-doctor" },
    { name: "My Appointments", path: "/appointments" },
    { name: "Medical Records", path: "/my-medical-records" },
    { name: "Profile Settings", path: "/user-profile" },
  ];

  const doctorLinks = [
    { name: "Dashboard", path: "/doctor-dashboard" },
    { name: "Appointments", path: "/doctor-appointments" },
    { name: "Availability", path: "/doctor/availability" },
    { name: "Patients", path: "/doctor/patients" },
    { name: "Profile Settings", path: "/doctor/profile" },
  ];

  const links = userType === "doctor" ? doctorLinks : patientLinks;

  return (
    <>
      <nav className={`dashboard-sidebar ${isOpen ? "open" : ""}`}>
        <div className="dashboard-sidebar-profile">
          <h3>{user?.username}</h3>
          <p>{userType === "doctor" ? "Doctor" : "Patient"}</p>
        </div>

        <ul className="dashboard-sidebar-nav">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? "active" : ""}
                onClick={closeSidebar}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {isOpen && <div className="sidebar-backdrop" onClick={closeSidebar} />}
    </>
  );
};

export default Sidebar;



