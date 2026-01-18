import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import API from "../../../utils/axiosInstance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookAppointment.css";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(null);
  const [slotType, setSlotType] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorRes = await API.get(`/api/doctor/${doctorId}`);
        setDoctor(doctorRes.data.doctor);

        const availabilityRes = await API.get(`/api/availability/${doctorId}`);
        setAvailability(availabilityRes.data);

        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId]);

  const isAllowedDay = (date) => {
    if (!availability) return false;
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return availability.days.includes(dayName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !slotType || !selectedTime) {
      alert("Please select date, slot and time");
      return;
    }

    try {
      const res = await API.post("/api/appointments/book", {
        doctorId: doctor._id,
        date: selectedDate,
        time: selectedTime,
        slot: slotType,
      });

      alert(res.data.message);
      navigate("/appointments");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!doctor) return <p>Doctor not found</p>;
  if (!availability) return <p>Doctor is currently unavailable</p>;

  return (
    <div className="dashboard-layout">
   

      <main className="dashboard-main-content">
        <h1 className="dashboard-welcome">Book Appointment</h1>

        {/* DOCTOR CARD */}
        <div className="doctor-card">
          <h2>Dr. {doctor.username}</h2>
          <p>
            Department: <strong>{doctor.department}</strong>
          </p>
          <p>{doctor.experience} years experience</p>
          <p>Location: {doctor.location}</p>
          <p>Fees: ₹{doctor.fees}</p>
        </div>

        {/* BOOKING FORM */}
        <form onSubmit={handleSubmit} className="booking-card">
          <h3>Select Appointment Details</h3>

          <div className="form-group">
            <label>Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              filterDate={isAllowedDay}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select available date"
            />
          </div>

          <div className="form-group">
            <label>Time Slot</label>
            <div className="time-slots">
              {availability.slots?.morning && (
                <label>
                  <input
                    type="radio"
                    name="slotType"
                    value="morning"
                    checked={slotType === "morning"}
                    onChange={() => {
                      setSlotType("morning");
                      setSelectedTime("");
                    }}
                  />
                  Morning ({availability.slots.morning.from} –{" "}
                  {availability.slots.morning.to})
                </label>
              )}

              {availability.slots?.evening && (
                <label>
                  <input
                    type="radio"
                    name="slotType"
                    value="evening"
                    checked={slotType === "evening"}
                    onChange={() => {
                      setSlotType("evening");
                      setSelectedTime("");
                    }}
                  />
                  Evening ({availability.slots.evening.from} –{" "}
                  {availability.slots.evening.to})
                </label>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              value={selectedTime}
              min={
                slotType === "morning"
                  ? availability.slots.morning?.from
                  : availability.slots.evening?.from
              }
              max={
                slotType === "morning"
                  ? availability.slots.morning?.to
                  : availability.slots.evening?.to
              }
              onChange={(e) => setSelectedTime(e.target.value)}
              disabled={!slotType}
            />
          </div>

          <button type="submit" className="confirm-btn">
            Confirm Booking
          </button>
        </form>
      </main>
    </div>
  );
};

export default BookAppointment;

