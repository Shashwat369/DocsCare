import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import LandingPage from "./pages/LandingPage/LandingPage";
import LoginDoctor from "./pages/Login/LoginDoctor";
import LoginPatient from "./pages/Login/LoginPatient";
import LoginAdmin from "./pages/Login/LoginAdmin";
import RegisterPatient from "./pages/Register/RegisterPatient";
import RegisterDoctor from "./pages/Register/RegisterDoctor";

import PatientDashboard from "./pages/Dashboard/PatientDashboard";
import DoctorDashboard from "./pages/Dashboard/DoctorDashboard";

import UserProtectedRoute from "./routes/ProtectedRoutes/UserProtectedRoute";
import DoctorProtectedRoute from "./routes/ProtectedRoutes/DoctorProtectedRoute";
import AdminProtectedRoute from "./routes/ProtectedRoutes/AdminProtectedRoute";

import MyAppointments from "./pages/User/MyAppointments/MyAppointments";
import FindDoctor from "./pages/User/FindDoctor/FindDoctor";
import BookAppointment from "./pages/User/BookAppointment/BookAppointment";
import HealthBlog from "./pages/User/Blog/HealthBlog";
import ProfileSettings from "./pages/Profile/ProfileSettings";

import DoctorAppointment from "./pages/Doctor/DoctorAppointment/DoctorAppointment";
import TodayAppointments from "./pages/Doctor/DoctorAppointment/TodayAppointments";
import UpcomingAppointments from "./pages/Doctor/DoctorAppointment/UpcomingAppointments";
import PendingAppointments from "./pages/Doctor/DoctorAppointment/PendingAppointments";
import DoctorAvailability from "./pages/Doctor/Availability/DoctorAvailability";
import Patients from "./pages/Doctor/MyPatients.jsx/MyPatients";
import PatientLayout from "./layout/PatientLayout";

import AdminLayout from "./pages/Admin/AdminLayout/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import PendingDoctors from "./pages/Admin/PendingDoctors/PendingDoctors";
import ApprovedDoctors from "./pages/Admin/ApprovedDoctors/ApprovedDoctors";
import AdminAppointments from "./pages/Admin/Appointments/AdminAppointments";
import AdminAvailability from "./pages/Admin/AdminAvailability/AdminAvailability";
import AdminSettings from "./pages/Admin/AdminSettings/ProfileSettings";
import DoctorLayout from "./layout/DoctorLayout";

import ComingSoon from "./components/ComingSoon/ComingSoon";

const AppLayout = () => {
  const location = useLocation();

  const hideFooterRoutes = [
    "/",
    "/doctor/login",
    "/user/login",
    "/admin/login",
    "/doctor/register",
    "/user/register",
  ];

  const hideNavbarRoutes = [
    "/doctor/login",
    "/user/login",
    "/admin/login",
    "/doctor/register",
    "/user/register",
  ];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-wrapper">
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/doctor/login" element={<LoginDoctor />} />
        <Route path="/user/login" element={<LoginPatient />} />
        <Route path="/admin/login" element={<LoginAdmin />} />

        <Route path="/doctor/register" element={<RegisterDoctor />} />
        <Route path="/user/register" element={<RegisterPatient />} />

        {/* USER */}
        <Route
          element={
            <UserProtectedRoute>
              <PatientLayout />
            </UserProtectedRoute>
          }
        >
          <Route path="/user-dashboard" element={<PatientDashboard />} />
          <Route path="/appointments" element={<MyAppointments />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route
            path="/book-appointment/:doctorId"
            element={<BookAppointment />}
          />
          <Route path="/user-profile" element={<ProfileSettings />} />

          <Route path="/blog" element={<HealthBlog />} />
        </Route>

        {/* DOCTOR */}

        <Route
          element={
            <DoctorProtectedRoute>
              <DoctorLayout />
            </DoctorProtectedRoute>
          }
        >
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointment />} />
          <Route
            path="//doctor-appointments/today"
            element={<TodayAppointments />}
          />
          <Route
            path="/doctor-appointments/upcoming"
            element={<UpcomingAppointments />}
          />
          <Route
            path="/doctor-appointments/pending"
            element={<PendingAppointments />}
          />

          <Route path="/doctor/patients" element={<Patients />} />

          <Route path="/doctor/availability" element={<DoctorAvailability />} />

          <Route path="/doctor/profile" element={<ProfileSettings />} />
        </Route>

        <Route
          path=""
          element={<DoctorProtectedRoute></DoctorProtectedRoute>}
        />

        <Route
          path=""
          element={<DoctorProtectedRoute></DoctorProtectedRoute>}
        />

        <Route
          path=""
          element={<DoctorProtectedRoute></DoctorProtectedRoute>}
        />

        <Route
          path=""
          element={<DoctorProtectedRoute></DoctorProtectedRoute>}
        />

        <Route
          path=""
          element={<DoctorProtectedRoute></DoctorProtectedRoute>}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pending-doctors" element={<PendingDoctors />} />
          <Route path="approved-doctors" element={<ApprovedDoctors />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="availability" element={<AdminAvailability />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<ComingSoon title="Coming Soon" />} />
      </Routes>

      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default function App() {
  return <AppLayout />;
}
