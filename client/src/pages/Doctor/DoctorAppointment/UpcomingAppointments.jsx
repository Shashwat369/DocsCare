import React, { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";
import "../../Dashboard/Dashboard.css";

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        const res = await API.get("/appointments/doctor");
        const allAppointments = res.data;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = allAppointments
          .filter(
            (a) =>
              new Date(a.date) > today &&
              a.status === "approved"
          )
          .sort(
            (a, b) =>
              new Date(a.date) - new Date(b.date)
          );

        setAppointments(upcoming);
      } catch (err) {
        console.error("Failed to fetch upcoming appointments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingAppointments();
  }, []);

  return (
    <div className="dashboard-layout">
     

      <main className="dashboard-main-content">
        <h1 className="dashboard-welcome">
          Upcoming Appointments
        </h1>
        <p>Approved appointments scheduled for upcoming dates</p>

        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <div className="dashboard-widget-card">
            <p>No upcoming appointments.</p>
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
                  <span className="status approved">
                    Approved
                  </span>
                </p>

                {/* Future scope */}
                <button
                  className="card-button"
                  disabled
                  style={{ marginTop: "10px" }}
                >
                  View Details (Coming Soon)
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UpcomingAppointments;
