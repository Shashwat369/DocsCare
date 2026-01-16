import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  // ❌ Not logged in OR not admin
  if (!token || userType !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Logged in admin
  return children;
};

export default AdminProtectedRoute;
