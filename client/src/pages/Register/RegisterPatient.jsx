import React, { useState } from "react";
import "./registerStyle.css";
import doctors_photo from "../../assets/doctors_photo.webp";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/axiosInstance";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });

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
      const res = await API.post("/api/user/register", form);
      alert(res.data.message);
      navigate("/user/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2 className="register-heading">Patient Registration</h2>

        <div className="register-details">
          <label>Full Name :</label>
          <input
            name="username"
            type="text"
            placeholder="Enter full name"
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
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-details">
          <label>Password :</label>
          <input
            name="password"
            type="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-details">
          <label>Gender :</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="register-details">
          <label>Age :</label>
          <input
            name="age"
            type="number"
            placeholder="Age"
            min="1"
            max="120"
            value={form.age}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="register-btn">
          Register as Patient
        </button>

        <p>
          Already have an account? <Link to="/user/login">Login</Link>
        </p>
      </form>

      <div className="register-img">
        <img src={doctors_photo} alt="doctors" />
      </div>
    </div>
  );
};

export default Register;

