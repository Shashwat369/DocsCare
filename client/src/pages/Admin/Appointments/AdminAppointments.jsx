import React, { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";
import "../AdminDashboard/adminDashboard.css";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 10;

  const fetchAppointments = async () => {
    try {
      const res = await API.get(
        `/admin/appointments?status=${status}&page=${page}&limit=${limit}`
      );
      setAppointments(res.data.appointments);
      setPages(res.data.totalPages);
    } catch {
      alert("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [status, page]);

  const updateStatus = async (id, status) => {
    await API.patch(`/admin/appointments/${id}`, { status });
    fetchAppointments();
  };

  return (
    <section className="table-section">
      <h3 style={{ fontSize: 20, fontWeight: 700, fontStyle: "italic" }}>
        All Appointments
      </h3>

      {/* FILTER */}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <table style={{ margin: 10 }}>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a._id}>
              <td>{a.user?.username}</td>
              <td>{a.doctor?.username}</td>
              <td>{a.doctor?.department}</td>
              <td>{new Date(a.date).toLocaleDateString()}</td>
              <td>{a.time}</td>
              <td
                className={
                  a.status === "approved"
                    ? "status-approved"
                    : a.status === "rejected"
                    ? "status-rejected"
                    : "status-pending"
                }
              >
                {a.status}
              </td>

              <td>
                {a.status === "pending" ? (
                  <>
                    <button
                      className="approve"
                      onClick={() => updateStatus(a._id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject"
                      onClick={() => updateStatus(a._id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          {page} / {pages}
        </span>
        <button disabled={page === pages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </section>
  );
};

export default AdminAppointments;
