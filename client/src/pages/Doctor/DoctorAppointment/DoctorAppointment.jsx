import React, { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";
import "./DoctorAppointments.css";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await API.get("/appointments/doctor");

    const sorted = res.data.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB - dateA;
    });

    setAppointments(sorted);
  };

  const updateStatus = async (id, status) => {
    await API.put("/appointments/update-status", {
      appointmentId: id,
      status,
    });
    fetchAppointments();
  };

  const grouped = appointments.reduce((acc, appt) => {
    const key = new Date(appt.date).toDateString();
    acc[key] = acc[key] || [];
    acc[key].push(appt);
    return acc;
  }, {});

  const formatDateLabel = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date();

    if (d.toDateString() === today.toDateString()) return "Today";

    today.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return "Yesterday";

    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-layout">
      <main className="dashboard-main-content">
        <h1 className="dashboard-title">All Appointments</h1>

        {Object.keys(grouped)
          .sort((a, b) => new Date(b) - new Date(a))
          .map((date) => (
            <div key={date} className="date-group">
              <div className="date-separator">
                {formatDateLabel(date)}
              </div>

              <div className="appointments-grid">
                {grouped[date].map((appt) => (
                  <div
                    key={appt._id}
                    className={`appointment-card ${appt.status}`}
                  >
                    <div className="card-header">
                      <div className="avatar">
                        {appt.user?.username?.charAt(0)}
                      </div>
                      <span className={`status ${appt.status}`}>
                        {appt.status}
                      </span>
                    </div>

                    <div className="card-body">
                      <h3>{appt.user?.username}</h3>
                      <p className="time">{appt.time}</p>
                    </div>

                    {appt.status === "pending" && (
                      <div className="card-actions">
                        <button
                          className="approve"
                          onClick={() =>
                            updateStatus(appt._id, "approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="reject"
                          onClick={() =>
                            updateStatus(appt._id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </main>
    </div>
  );
};

export default DoctorAppointments;
