import React, { useState } from "react";
import "./loginStyle.css";
import doctors_photo from "../../assets/doctors_photo.webp";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" | "error"

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
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
      const res = await API.post("/api/doctor/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", "doctor");
      localStorage.setItem("user", JSON.stringify(res.data.doctor));

      login("doctor", res.data.doctor);

      setMessage("✅ Login successful!");
      setMessageType("success");

      setTimeout(() => {
        navigate("/doctor-dashboard");
      }, 1000);
    } catch (err) {
      if (err.response?.status === 403) {
        setMessage("⏳ Profile pending admin approval");
      } else if (err.response?.status === 401) {
        setMessage("❌ Invalid email or password");
      } else {
        setMessage("⚠️ Server error. Try again later");
      }
      setMessageType("error");
    }

    setForm({ email: "", password: "" });
  };

  return (
    <div className="login-container">
      <div className="login-img">
        <img src={doctors_photo} alt="doctors_photo" />
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className="login-heading">Doctor Login 👨‍⚕️</h2>
        {message && (
          <div className={`auth-message ${messageType}`}>{message}</div>
        )}
        <div className="login-details">
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-details">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <div className="links">
          <p>
            Don't have an account? <Link to="/doctor/register">Register</Link>
          </p>
          <Link to="/forget-password" className="forget-password">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
