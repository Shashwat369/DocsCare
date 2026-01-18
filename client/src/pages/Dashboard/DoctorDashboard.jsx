import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../../utils/axiosInstance";
import "./Dashboard.css";


const DoctorDashboard = () => {
  const { user } = useAuth();

  const [todayCount, setTodayCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await API.get("/api/appointments/doctor");
        const appointments = res.data;

        const todayStr = new Date().toDateString();

        const todayApproved = appointments.filter(
          (a) =>
            new Date(a.date).toDateString() === todayStr &&
            a.status === "approved"
        );

        const pending = appointments.filter(
          (a) => a.status === "pending"
        );

        const uniquePatients = [
          ...new Set(appointments.map((a) => a.user?._id)),
        ];

        const upcoming = appointments
          .filter(
            (a) =>
              new Date(a.date) > new Date() &&
              a.status === "approved"
          )
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setTodayCount(todayApproved.length);
        setPendingCount(pending.length);
        setTotalPatients(uniquePatients.length);
        setNextAppointment(upcoming[0] || null);
      } catch (err) {
        console.error("Doctor dashboard error:", err);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="dashboard-layout">


      {/* MAIN */}
      <main className="dashboard-main-content">
        <h1 className="dashboard-welcome">
          Welcome, Dr. {user?.username?.split(" ")[0]}!
        </h1>
        <p>Your professional overview.</p>

        <div className="dashboard-widget-grid">
          {/* TODAY */}
          <div className="dashboard-widget-card">
            <h3>Today’s Appointments</h3>
            <p><strong>{todayCount}</strong> scheduled today</p>
            <Link
              to="/doctor-appointments/today"
              className="card-button"
            >
              View Today
            </Link>
          </div>

          {/* NEXT */}
          <div className="dashboard-widget-card">
            <h3>Next Appointment</h3>

            {nextAppointment ? (
              <p>
                <strong>{nextAppointment.user?.username}</strong><br />
                {new Date(nextAppointment.date).toLocaleDateString()} at{" "}
                <strong>{nextAppointment.time}</strong>
              </p>
            ) : (
              <p>No upcoming appointment</p>
            )}

            <Link
              to="/doctor-appointments/upcoming"
              className="card-button"
            >
              View Upcoming
            </Link>
          </div>

          {/* PENDING */}
          <div className="dashboard-widget-card">
            <h3>Pending Requests</h3>
            <p><strong>{pendingCount}</strong> awaiting approval</p>
            <Link
              to="/doctor-appointments/pending"
              className="card-button"
            >
              Review
            </Link>
          </div>

          {/* PATIENTS */}
          <div className="dashboard-widget-card">
            <h3>Total Patients</h3>
            <p><strong>{totalPatients}</strong> patients treated</p>
            <Link to="/doctor-appointments" className="card-button">
              View Patients
            </Link>
          </div>

          {/* AVAILABILITY */}
          <div className="dashboard-widget-card">
            <h3>Availability</h3>
            <p>Set working days & consultation slots</p>
            <Link to="/doctor/availability" className="card-button">
              Manage Availability
            </Link>
          </div>

          {/* EARNINGS */}
          <div className="dashboard-widget-card coming-soon">
            <div className="coming-soon-badge">Coming Soon</div>
            <h3>Earnings</h3>
            <p>Monthly income & payouts</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;




