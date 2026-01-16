import React, { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";

import "./MyPatients.css"

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await API.get("/appointments/patients");
        setPatients(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="dashboard-layout">
   

      <main className="dashboard-main-content">
        <h1>My Patients</h1>

        {loading ? (
          <p>Loading...</p>
        ) : patients.length === 0 ? (
          <p>No patients yet</p>
        ) : (
          <table className="patients-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Last Visit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((item, index) => (
                <tr key={index}>
                  <td>{item.patient.username || "N/A"}</td>
                  <td>{item.patient.age || "-"}</td>
                  <td>{item.patient.gender || "-"}</td>
                  <td>
                    {new Date(item.lastAppointment).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Patients;
