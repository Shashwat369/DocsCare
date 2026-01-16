import React, { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";
import "./DoctorAvailability.css";

const DoctorAvailability = () => {
  const [days, setDays] = useState([]);
  const [slotType, setSlotType] = useState("");

  const [morning, setMorning] = useState({ from: "", to: "" });
  const [evening, setEvening] = useState({ from: "", to: "" });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 NEW: current availability
  const [myAvailability, setMyAvailability] = useState(null);

  // 🔥 FETCH current availability
  useEffect(() => {
    const fetchMyAvailability = async () => {
      try {
        const { data } = await API.get("/availability/my");
        setMyAvailability(data);
      } catch (err) {
        // ignore if not found
      }
    };

    fetchMyAvailability();
  }, []);

  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const submit = async () => {
    if (!days.length) {
      setMessage("Please select available days");
      return;
    }

    if (!slotType) {
      setMessage("Please select a time slot");
      return;
    }

    const slots = {};

    if (slotType === "morning" || slotType === "both") {
      if (!morning.from || !morning.to) {
        setMessage("Please fill morning time slot");
        return;
      }
      slots.morning = morning;
    }

    if (slotType === "evening" || slotType === "both") {
      if (!evening.from || !evening.to) {
        setMessage("Please fill evening time slot");
        return;
      }
      slots.evening = evening;
    }

    try {
      setLoading(true);
      await API.post("/availability/doctor", { days, slots });

      setMessage("Availability submitted for admin approval");
      setDays([]);
      setSlotType("");
      setMorning({ from: "", to: "" });
      setEvening({ from: "", to: "" });

      // 🔥 refresh availability
      const { data } = await API.get("/availability/my");
      setMyAvailability(data);
    } catch {
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
    

      <main className="dashboard-main-content">
        <div className="availability-page">
          <div className="availability-card">
            <h1>Set Availability</h1>

            {/* 🔥 STATUS / REJECTION BOX */}
            {myAvailability?.status === "rejected" && (
              <div className="rejection-box">
                <h4>Availability Rejected ❌</h4>
                <p>
                  <strong>Reason:</strong>{" "}
                  {myAvailability.rejectionReason || "No reason provided"}
                </p>
                <small>Please update and resubmit.</small>
              </div>
            )}

            {myAvailability?.status === "pending" && (
              <div className="pending-box">
                ⏳ Your availability is pending admin approval
              </div>
            )}

            {myAvailability?.status === "approved" && (
              <div className="approved-box">
                ✅ Your availability is approved
              </div>
            )}

            {/* DAYS */}
            <div className="section-title">Available Days</div>
            <div className="days-grid">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <label key={day} className="day-option">
                  <input
                    type="checkbox"
                    checked={days.includes(day)}
                    onChange={() => toggleDay(day)}
                  />
                  {day}
                </label>
              ))}
            </div>

            {/* SLOT TYPE */}
            <div className="section-title">Time Slot</div>
            <div className="slot-type-row">
              {["morning", "evening", "both"].map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    name="slotType"
                    value={type}
                    checked={slotType === type}
                    onChange={() => setSlotType(type)}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>

            {/* MORNING */}
            {(slotType === "morning" || slotType === "both") && (
              <>
                <div className="section-subtitle">Morning Slot</div>
                <div className="time-row">
                  <input
                    type="time"
                    value={morning.from}
                    onChange={(e) =>
                      setMorning({ ...morning, from: e.target.value })
                    }
                  />
                  <input
                    type="time"
                    value={morning.to}
                    onChange={(e) =>
                      setMorning({ ...morning, to: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            {/* EVENING */}
            {(slotType === "evening" || slotType === "both") && (
              <>
                <div className="section-subtitle">Evening Slot</div>
                <div className="time-row">
                  <input
                    type="time"
                    value={evening.from}
                    onChange={(e) =>
                      setEvening({ ...evening, from: e.target.value })
                    }
                  />
                  <input
                    type="time"
                    value={evening.to}
                    onChange={(e) =>
                      setEvening({ ...evening, to: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            <button
              className="submit-btn"
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Availability"}
            </button>

            {message && <p className="availability-message">{message}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorAvailability;
