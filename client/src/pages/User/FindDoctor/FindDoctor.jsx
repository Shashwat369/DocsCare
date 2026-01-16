import React, { useState, useEffect } from "react";
import API from "../../../utils/axiosInstance";
import "../../Dashboard/Dashboard.css"; // We can reuse this CSS
import { Link } from "react-router-dom";

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function runs when the component loads
    const fetchAllDoctors = async () => {
      try {
        // 1. Call your new API endpoint
        const res = await API.get("/doctor/all");
        setDoctors(res.data.doctors);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
        setLoading(false);
      }
    };

    fetchAllDoctors();
  }, []); // The empty array means this runs only once

  return (
    <div className="dashboard-layout">

      <main className="dashboard-main-content">
        <h1 className="dashboard-welcome">Find a Doctor</h1>
        <p>Book an appointment with our top specialists.</p>

        {loading ? (
          <p>Loading doctors...</p>
        ) : (
          // 2. We use the same grid layout as the dashboard
          <div className="dashboard-widget-grid">
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <div key={doc._id} className="dashboard-widget-card">
                  <h3>Dr. {doc.username}</h3>
                  <p>
                    Specialty: <strong>{doc.department}</strong>
                  </p>
                  <p>Experience: {doc.experience} years</p>
                  <p>Location: {doc.location}</p>

                  {/* 3. This button will handle the next step */}
                  <Link
                    to={`/book-appointment/${doc._id}`}
                    className="card-button"
                  >
                    Book Now
                  </Link>
                </div>
              ))
            ) : (
              <p>No doctors are available at this time.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default FindDoctor;
  