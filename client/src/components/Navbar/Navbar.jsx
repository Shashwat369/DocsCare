import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DocsCare_Logo from "../../assets/DocsCare_Logo.png";
import "./navbarStyle.css";

const Navbar = () => {
  const { isLoggedIn, userType, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const publicRolePages = [
    "/",
    "/doctor/login",
    "/user/login",
    "/admin/login",
  ];

  const showRoleDropdown =
    !isLoggedIn && publicRolePages.includes(location.pathname);

  const handleRoleChange = (e) => {
    const role = e.target.value;
    if (role === "doctor") navigate("/doctor/login");
    if (role === "patient") navigate("/user/login");
    if (role === "admin") navigate("/admin/login");
  };

  const getInitials = (name = "") => {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0]?.toUpperCase();
    return words[0][0]?.toUpperCase() + words[1][0]?.toUpperCase();
  };

  const profilePath =
    userType === "user"
      ? "/user-profile"
      : userType === "doctor"
      ? "/doctor/profile"
      : "/admin/dashboard";

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/">
        <img src={DocsCare_Logo} alt="DocsCare Logo" className="logo" />
      </Link>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Menu */}
      <ul className={`navbar-lists ${menuOpen ? "open" : ""}`}>
        {isLoggedIn ? (
          <>
            {userType === "user" && (
              <>
                <li><Link to="/user-dashboard">Home</Link></li>
                <li><Link to="/find-doctor">Find Doctor</Link></li>
                <li><Link to="/appointments">My Appointments</Link></li>
                <li><Link to="/blog">Health Blogs</Link></li>
              </>
            )}

            {userType === "doctor" && (
              <>
                <li><Link to="/doctor-dashboard">Dashboard</Link></li>
                <li><Link to="/doctor-appointments">Appointments</Link></li>
                <li><Link to="/doctor/availability">Availability</Link></li>
              </>
            )}

            <li>
              <button onClick={logout} className="navbar-logout-btn">
                Logout
              </button>
            </li>

            {userType !== "admin" && (
              <li>
                <Link to={profilePath}>
                  <div className="profile-pic">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="profile-avatar-img"
                      />
                    ) : (
                      <div className="profile-avatar-initials">
                        {getInitials(user?.username)}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            )}
          </>
        ) : (
          <>
            {showRoleDropdown && (
              <li>
                <select
                  className="role-dropdown"
                  defaultValue=""
                  onChange={handleRoleChange}
                >
                  <option value="">Choose Role</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                  <option value="admin">Admin</option>
                </select>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;


