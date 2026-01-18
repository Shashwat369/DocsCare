import React, { useEffect, useState } from "react";

import API from "../../../utils/axiosInstance";
import "../../Dashboard/Dashboard.css";

const PendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const res = await API.get("/api/appointments/doctor");
        const allAppointments = res.data;

        const pending = allAppointments.filter(
          (a) => a.status === "pending"
        );

        setAppointments(pending);
      } catch (err) {
        console.error("Failed to fetch pending appointments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAppointments();
  }, []);

  const updateStatus = async (appointmentId, status) => {
    try {
      setActionLoading(appointmentId);

      await API.put("/api/appointments/update-status", {
        appointmentId,
        status,
      });

      // Remove from pending list after action
      setAppointments((prev) =>
        prev.filter((a) => a._id !== appointmentId)
      );
    } catch (err) {
      alert("Failed to update appointment status");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="dashboard-layout">
  

      <main className="dashboard-main-content">
        <h1 className="dashboard-welcome">Pending Requests</h1>
        <p>Approve or reject patient appointment requests</p>

        {loading ? (
          <p>Loading requests...</p>
        ) : appointments.length === 0 ? (
          <div className="dashboard-widget-card">
            <p>No pending appointment requests.</p>
          </div>
        ) : (
          <div className="dashboard-widget-grid">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="dashboard-widget-card"
              >
                <h3>{appt.user?.username}</h3>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appt.date).toLocaleDateString()}
                </p>

                <p>
                  <strong>Time:</strong> {appt.time}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="status pending">Pending</span>
                </p>

                <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                  <button
                    className="card-button"
                    disabled={actionLoading === appt._id}
                    onClick={() =>
                      updateStatus(appt._id, "approved")
                    }
                  >
                    {actionLoading === appt._id
                      ? "Processing..."
                      : "Approve"}
                  </button>

                  <button
                    className="card-button"
                    style={{ background: "#dc3545" }}
                    disabled={actionLoading === appt._id}
                    onClick={() =>
                      updateStatus(appt._id, "rejected")
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PendingAppointments;
