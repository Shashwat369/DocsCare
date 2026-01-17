import React, { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";

const PendingDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/admin/pending-doctors");
      setDoctors(res.data || []);
    } catch (err) {
      console.error("Pending doctors error:", err);
      alert("Failed to load pending doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const approveDoctor = async (id) => {
    try {
      await API.patch(`/api/admin/approve-doctor/${id}`);
      fetchDoctors(); // 🔁 refresh list
    } catch {
      alert("Failed to approve doctor");
    }
  };

  const rejectDoctor = async (id) => {
    if (!window.confirm("Reject this doctor?")) return;

    try {
      await API.delete(`/api/admin/reject-doctor/${id}`);
      fetchDoctors(); // 🔁 refresh list
    } catch {
      alert("Failed to reject doctor");
    }
  };

  return (
    <section className="table-section">
      <h3>Pending Doctor Requests</h3>

      {loading ? (
        <p>Loading...</p>
      ) : doctors.length === 0 ? (
        <p>No pending doctor requests</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.username}</td>
                <td>{doc.email}</td>
                <td>{doc.department}</td>
                <td>{doc.experience} yrs</td>
                <td>
                  <button
                    className="approve"
                    onClick={() => approveDoctor(doc._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() => rejectDoctor(doc._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default PendingDoctors;


