import React, { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";
import "./adminAvailability.css";

const AdminAvailability = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const { data } = await API.get("/api/availability/pending");
      setList(data);
    } catch (err) {
      alert("Failed to load pending availabilities");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      await API.put(`/api/availability/approve/${id}`);
      alert("Availability approved");
      fetchPending();
    } catch (err) {
      alert("Approval failed");
    }
  };
  
  const reject = async (id) => {
  const reason = prompt("Reason for rejection (optional):");

  try {
    await API.put(`/api/availability/reject/${id}`, {
      reason,
    });

    alert("Availability rejected");
    fetchPending();
  } catch (err) {
    alert("Rejection failed");
  }
};


  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="dashboard-layout">
      <main className="dashboard-main-content">
        <h1>Doctor Availability Approvals</h1>

        {loading ? (
          <p>Loading...</p>
        ) : list.length === 0 ? (
          <p>No pending requests 🎉</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Days</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.doctor?.username}</strong>
                    <br />
                    <small>{item.doctor?.email}</small>
                  </td>

                  <td>{item.days.join(", ")}</td>

                  <td>
                    {item.slots?.morning && (
                      <>
                        Morning: {item.slots.morning.from} –{" "}
                        {item.slots.morning.to}
                        <br />
                      </>
                    )}

                    {item.slots?.evening && (
                      <>
                        Evening: {item.slots.evening.from} –{" "}
                        {item.slots.evening.to}
                      </>
                    )}
                  </td>

                  <td data-label="Action">
                    <button
                      className="approve-btn"
                      onClick={() => approve(item._id)}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => reject(item._id)}
                    >
                      Reject
                    </button>
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

export default AdminAvailability;
