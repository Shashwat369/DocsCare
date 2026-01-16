import React, { useState, useEffect } from "react";
import API from "../../../utils/axiosInstance";
import "./adminSettings.css";

const ProfileSettings = () => {
  const storedAdmin = JSON.parse(localStorage.getItem("user"));

  const [admin, setAdmin] = useState(storedAdmin);
  const [clinicName, setClinicName] = useState(storedAdmin?.clinicName || "");
  const [loading, setLoading] = useState(false);

  // 🟢 initials from clinic name
  const initials = clinicName
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSave = async () => {
    try {
      setLoading(true);

      await API.patch("/admin/update-profile", {
        clinicName,
      });

      // 🔥 IMPORTANT FIX (email preserve)
      const updatedAdmin = {
        ...admin,
        clinicName,
      };

      localStorage.setItem("user", JSON.stringify(updatedAdmin));
      setAdmin(updatedAdmin);

      alert("Clinic name updated successfully");
    } catch (err) {
      alert("Failed to update clinic name");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-card">
      <h3 className="settings-title">Admin Settings</h3>

      {/* HEADER */}
      <div className="settings-header">
        <div className="avatar">{initials}</div>

        <div>
          <h4>{admin?.clinicName}</h4>
          <p className="muted">{admin?.email}</p>
        </div>
      </div>

      {/* FORM */}
      <div className="settings-form">
        <label>Clinic Name</label>
        <input
          type="text"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
        />

        <label>Email</label>
        <input type="email" value={admin?.email || ""} disabled />

        <button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;


