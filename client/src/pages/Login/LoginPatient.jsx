import React, { useState } from "react";
import "./loginStyle.css";
import doctors_photo from "../../assets/doctors_photo.webp";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const {login} = useAuth()
  const navigate = useNavigate()


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
      const res = await API.post("/api/user/login", form);
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", "user");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      login("user" , res.data.user);
      navigate("/user-dashboard")
     
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
    setForm({
      email: "",
      password: "",
    });
  };

  return (
    <div className="login-container">
      <div className="login-img">
        <img src={doctors_photo} alt="doctors_photo" />
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className="login-heading">Patient Login </h2>
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
            Don't have an account? <Link to="/user/register">Register</Link>
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
