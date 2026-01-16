import React, { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    pendingCount: 0,
    approvedCount: 0,
    totalDoctors: 0,
    pendingDoctors: [],
  });

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleApprove = async (id) => {
    try {
      await API.patch(`/admin/approve-doctor/${id}`);
      fetchDashboard();
    } catch {
      alert("Failed to approve doctor");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject doctor?")) return;
    try {
      await API.delete(`/admin/reject-doctor/${id}`);
      fetchDashboard();
    } catch {
      alert("Failed to reject doctor");
    }
  };

  return (
    <>
      {/* ===== STATS ===== */}
      <section className="stats">
        <div className="stat-card">
          <h4>Pending Doctors</h4>
          <span>{stats.pendingCount}</span>
        </div>

        <div className="stat-card">
          <h4>Approved Doctors</h4>
          <span>{stats.approvedCount}</span>
        </div>

        <div className="stat-card">
          <h4>Total Doctors</h4>
          <span>{stats.totalDoctors}</span>
        </div>
      </section>

      {/* ===== TABLE ===== */}
      <section className="table-section">
        <h3>Pending Doctor Requests (Latest 10)</h3>

        {stats.pendingDoctors.length === 0 ? (
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
              {stats.pendingDoctors.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.username}</td>
                  <td>{doc.email}</td>
                  <td>{doc.department}</td>
                  <td>{doc.experience} yrs</td>
                  <td>
                    <button
                      className="approve"
                      onClick={() => handleApprove(doc._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject"
                      onClick={() => handleReject(doc._id)}
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
    </>
  );
};

export default AdminDashboard;





