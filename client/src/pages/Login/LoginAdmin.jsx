import React, { useState } from "react";
import "./adminLogin.css";
import doctors_photo from "../../assets/doctors_photo.webp";
import { useNavigate } from "react-router-dom";
import API from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", "admin");
      localStorage.setItem("user", JSON.stringify(res.data.admin));

      login("admin", res.data.admin);
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-img">
        <img src={doctors_photo} alt="admin-login" />
      </div>

      <form onSubmit={handleSubmit} className="admin-login-card">
        <h2 className="admin-login-heading">Admin Login 🛡️</h2>

        <div className="admin-login-field">
          <label>Email :</label>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-login-field">
          <label>Password :</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="admin-login-btn">
          Login as Admin
        </button>
        <Link to="/forget-password" className="forget-password">Forgot Password?</Link>
      </form>
    </div>
  );
};

export default AdminLogin;
