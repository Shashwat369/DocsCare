import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/axiosInstance";
import "../Dashboard/Dashboard.css";
import "./ProfileSettings.css";

const ProfileSettings = () => {
  const { user, userType, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    age: user?.age || "",
    gender: user?.gender || "",
    ...(userType === "doctor" && {
      department: user?.department || "",
      experience: user?.experience || 0,
      location: user?.location || "",
      fees: user?.fees || 0,
    }),
  });
  const getInitials = (name = "") => {
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      setFormData({
        username: user?.username || "",
        email: user?.email || "",
        age: user?.age || "",
        gender: user?.gender || "",
        ...(userType === "doctor" && {
          department: user?.department || "",
          experience: user?.experience || 0,
          location: user?.location || "",
          fees: user?.fees || 0,
        }),
      });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiPath = userType === "user" ? "/api/user/profile" : "/api/doctor/profile";

    try {
      const res = await API.put(apiPath, formData);
      const updatedUserData = res.data.user || res.data.doctor;

      login(userType, updatedUserData);
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      alert(res.data.message);
      setIsEditing(false);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file); // ✅ SAME as backend

    setLoading(true);

    const apiPath =
      userType === "user" ? "/api/user/profile/picture" : "/api/doctor/profile/picture";

    try {
      const res = await API.post(apiPath, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUserData = res.data.user || res.data.doctor;
      login(userType, updatedUserData);
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const renderDoctorFields = (editMode) => (
    <>
      {editMode ? (
        <>
          <div className="form-group">
            <label>Department</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Fees</label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <>
          <div className="display-group">
            <span className="display-label">Department</span>
            <span className="display-value">
              {user?.department || "Not set"}
            </span>
          </div>

          <div className="display-group">
            <span className="display-label">Experience</span>
            <span className="display-value">
              {user?.experience ? `${user.experience} years` : "Not set"}
            </span>
          </div>

          <div className="display-group">
            <span className="display-label">Location</span>
            <span className="display-value">{user?.location || "Not set"}</span>
          </div>

          <div className="display-group">
            <span className="display-label">Fees</span>
            <span className="display-value">
              {user?.fees ? `₹${user.fees}` : "Not set"}
            </span>
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="dashboard-layout">
      

      <main className="dashboard-main-content">
        <h1 className="dashboard-welcome">Profile Settings</h1>

        <div className="profile-card dashboard-widget-card">
          <div className="profile-header">
            <div className="profile-avatar-container">
              <div className="profile-avatar">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="profile-avatar-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="profile-avatar-initials">
                    {getInitials(user?.username)}
                  </div>
                )}
              </div>

              <button
                className="avatar-edit-button"
                onClick={() => fileInputRef.current.click()}
              ></button>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </div>

            <div className="profile-header-info">
              <h2>{user?.username}</h2>
              <p>{user?.email}</p>
            </div>

            <button
              className="card-button"
              onClick={handleToggleEdit}
              style={isEditing ? { backgroundColor: "#777" } : {}}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="profile-content">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="profile-edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    className="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {userType === "doctor" && renderDoctorFields(true)}

                <button
                  type="submit"
                  className="card-button"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            ) : (
              <div className="profile-display">
                <div className="display-group">
                  <span className="display-label">Full Name</span>
                  <span className="display-value">
                    {user?.username || "Not set"}
                  </span>
                </div>

                <div className="display-group">
                  <span className="display-label">Email</span>
                  <span className="display-value">
                    {user?.email || "Not set"}
                  </span>
                </div>

                <div className="display-group">
                  <span className="display-label">Age</span>
                  <span className="display-value">
                    {user?.age || "Not set"}
                  </span>
                </div>

                <div className="display-group">
                  <span className="display-label">Gender</span>
                  <span className="display-value">
                    {user?.gender
                      ? user.gender.charAt(0).toUpperCase() +
                        user.gender.slice(1)
                      : "Not set"}
                  </span>
                </div>

                {userType === "doctor" && renderDoctorFields(false)}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
