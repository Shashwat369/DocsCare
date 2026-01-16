import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import API from "../../../utils/axiosInstance";
import "../../Dashboard/Dashboard.css";

const TodayAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        const res = await API.get("/appointments/doctor");
        const allAppointments = res.data;

        const today = new Date().toDateString();

        const todayAppointments = allAppointments.filter(
          (a) =>
            new Date(a.date).toDateString() === today &&
            a.status === "approved"
        );

        setAppointments(todayAppointments);
      } catch (err) {
        console.error("Failed to fetch today appointments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayAppointments();
  }, []);

  return (
    <div className="dashboard-layout">
      

      <main className="dashboard-main-content">
        <h1 className="dashboard-welcome">
          Today’s Appointments
        </h1>
        <p>
          Appointments scheduled for today (
          {new Date().toLocaleDateString()})
        </p>

        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <div className="dashboard-widget-card">
            <p>No appointments scheduled for today.</p>
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
                  <strong>Time:</strong> {appt.time}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="status approved">
                    Approved
                  </span>
                </p>

                {/* Future actions placeholder */}
                <button
                  className="card-button"
                  style={{ marginTop: "10px" }}
                  disabled
                >
                  Consultation (Coming Soon)
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TodayAppointments;
