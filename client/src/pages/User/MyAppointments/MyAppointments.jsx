import React, { useEffect, useState } from "react";

import API from "../../../utils/axiosInstance";
import "./MyAppointments.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await API.get("/api/appointments/my");
        setAppointments(res.data.appointments || []);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading appointments...</p>;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments.filter((appt) => {
    return (
      appt.status === "approved" &&
      new Date(appt.date) >= today
    );
  });


  const expiredAppointments = appointments.filter((appt) => {
    return new Date(appt.date) < today;
  });

  return (
    <div className="dashboard-layout">
   

      <main className="dashboard-main-content">
        <h1 className="page-title">My Appointments</h1>


{upcomingAppointments.length > 0 && (
  <>
    <h3 className="section-title">Upcoming Appointments</h3>

    <div className="appointments-grid">
      {upcomingAppointments.map((appt) => (
        <div key={appt._id} className="appointment-card">
          <h3>Dr. {appt.doctor?.username}</h3>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(appt.date).toLocaleDateString()}
          </p>

          <p>
            <strong>Time:</strong> {appt.time}
          </p>

          <span className="status approved">Approved</span>
        </div>
      ))}
    </div>
  </>
)}

{/* EXPIRED SECTION */}
{expiredAppointments.length > 0 && (
  <>
    <h3 className="section-title expired-title">
      Expired Appointments
    </h3>

    <div className="appointments-grid">
      {expiredAppointments.map((appt) => (
        <div
          key={appt._id}
          className="appointment-card expired"
        >
          <h3>Dr. {appt.doctor?.username}</h3>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(appt.date).toLocaleDateString()}
          </p>

          <p>
            <strong>Time:</strong> {appt.time}
          </p>

          <span className="status expired-label">
            Expired
          </span>
        </div>
      ))}
    </div>
  </>
)}




        {/* NO APPOINTMENTS */}
        {appointments.length === 0 && (
          <p>No appointments found.</p>
        )}
      </main>
    </div>
  );
};

export default MyAppointments;
