import React, { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";
import "../AdminDashboard/adminDashboard.css";

const ApprovedDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovedDoctors = async () => {
    try {
      const res = await API.get("/api/admin/approved-doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load approved doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedDoctors();
  }, []);

  return (
    <section className="table-section">
      <h3>Approved Doctors</h3>

      {loading ? (
        <p>Loading...</p>
      ) : doctors.length === 0 ? (
        <p>No approved doctors</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Experience</th>
              <th>Fees</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.username}</td>
                <td>{doc.email}</td>
                <td>{doc.department}</td>
                <td>{doc.experience} yrs</td>
                <td>₹{doc.fees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default ApprovedDoctors;
