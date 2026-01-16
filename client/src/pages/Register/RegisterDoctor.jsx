import React, { useState } from "react";
import "./registerStyle.css";
import doctors_photo from "../../assets/doctors_photo.webp";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/axiosInstance";
import Select from "react-select";
import { departmentOptions } from "../../utils/departmentOptions";
import { selectStyles } from "../../utils/selectStyles";

const RegisterDoctor = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    clinicName : "",
    password: "",
    department: "",
    experience: "",
    fees: "",
    location: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        experience: Number(form.experience),
        fees: Number(form.fees),
      };

      const res = await API.post("/doctor/register", payload);
      alert(res.data.message);
      navigate("/doctor/login");
    } catch (err) {
      alert(err.response?.data?.message || "Doctor registration failed");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2 className="register-heading">Doctor Registration</h2>

        <div className="register-details">
          <label>Username :</label>
          <input
            name="username"
            type="text"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-details">
          <label>Email :</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-details">
          <label>Clinic Name :</label>
          <input
            name="clinicName"
            type="text"
            placeholder="Clinic Name"
            value={form.clinicName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-details">
          <label>Password :</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-details">
          <label>Department :</label>

          <Select
            options={departmentOptions}
            styles={selectStyles}
            placeholder="Select Department"
            isSearchable
            value={departmentOptions.find(
              (opt) => opt.value === form.department
            )}
            onChange={(selected) =>
              setForm((prev) => ({
                ...prev,
                department: selected.value,
              }))
            }
          />
        </div>

        <div className="register-details">
          <label>Experience :</label>
          <input
            type="number"
            name="experience"
            min="0"
            value={form.experience}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                experience: Number(e.target.value),
              }))
            }
            required
          />
        </div>

        <div className="register-details">
          <label>Fees :</label>
          <input
            type="number"
            name="fees"
            min="0"
            value={form.fees}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                fees: Number(e.target.value),
              }))
            }
            required
          />
        </div>

        <div className="register-details">
          <label>Location :</label>
          <input
            type="text"
            name="location"
            placeholder="City / Clinic Location"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="register-btn">
          Apply as Doctor
        </button>

        <p className="approval-note">
          Note: Your profile will be visible after admin approval.
        </p>

        <p>
          Already have an account? <Link to="/doctor/login">Login</Link>
        </p>
      </form>

      <div className="register-img">
        <img src={doctors_photo} alt="doctor" />
      </div>
    </div>
  );
};

export default RegisterDoctor;
