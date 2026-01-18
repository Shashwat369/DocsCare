import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/axiosInstance";
import "./Dashboard.css";

const Home = () => {
  const { user } = useAuth();

  const [upcomingCount, setUpcomingCount] = useState(null);
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await API.get("/api/appointments/my");
        const appointments = res.data.appointments || [];

        const now = new Date();

        const upcoming = appointments
          .filter((appt) => {
            if (!["pending", "approved"].includes(appt.status)) return false;

            const appointmentDateTime = new Date(
              `${appt.date.split("T")[0]}T${appt.time}`
            );

            return appointmentDateTime >= now;
          })
          .sort(
            (a, b) =>
              new Date(`${a.date.split("T")[0]}T${a.time}`) -
              new Date(`${b.date.split("T")[0]}T${b.time}`)
          );

        setUpcomingCount(upcoming.length);
        setNextAppointment(upcoming[0] || null);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
        setUpcomingCount(0);
        setNextAppointment(null);
      }
    };

    if (user) fetchAppointments();
  }, [user]);

  return (
    <div className="dashboard-main-content">
      <h1 className="dashboard-welcome">
        Welcome, {user?.username?.split(" ")[0] || "User"}!
      </h1>

      <p>Manage your health and appointments all in one place.</p>

      <div className="dashboard-widget-grid">
        <div className="dashboard-widget-card">
          <h3>Book an Appointment</h3>
          <p>Find a doctor and book your slot instantly.</p>
          <Link to="/find-doctor" className="card-button">
            Find a Doctor
          </Link>
        </div>

        <div className="dashboard-widget-card">
          <h3>My Appointments</h3>

          <p>
            {upcomingCount === null
              ? "Loading appointments..."
              : upcomingCount === 0
              ? "You have no upcoming appointments."
              : `You have ${upcomingCount} upcoming appointment${
                  upcomingCount > 1 ? "s" : ""
                }.`}
          </p>

          {nextAppointment && (
            <p className="next-appointment">
              <strong>Next:</strong>{" "}
              {new Date(nextAppointment.date).toLocaleDateString()} at{" "}
              {nextAppointment.time}
            </p>
          )}

          <Link to="/appointments" className="card-button">
            View Details
          </Link>
        </div>

        <div className="dashboard-widget-card">
          <h3>Your Profile</h3>
          <p>Keep your contact info up to date.</p>
          <Link to="/user-profile" className="card-button">
            Update Profile
          </Link>
        </div>

        <div className="dashboard-widget-card">
          <h3>Medical Records</h3>
          <p>View your prescriptions and lab reports.</p>
          <Link to="/my-medical-records" className="card-button">
            View Records
          </Link>
        </div>

        <div className="dashboard-widget-card">
          <h3>Find a Pharmacy</h3>
          <p>Locate a nearby pharmacy for your prescriptions.</p>
          <Link to="/find-pharmacy" className="card-button">
            Find Nearby
          </Link>
        </div>

        <div className="dashboard-widget-card">
          <h3>Health Blog</h3>
          <p>Read articles on how to stay healthy.</p>
          <Link to="/blog" className="card-button">
            Read Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

