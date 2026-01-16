import React from "react";
import "./LandingFooter.css";

const LandingFooter = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-col">
          <h3>DocsCare</h3>
          <p>
            Your trusted digital healthcare partner. Book appointments, consult
            verified doctors, and manage health records with ease.
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>Find Doctors</li>
            <li>Book Appointment</li>
            <li>Online Consultation</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Help Center</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} DocsCare. All rights reserved.
      </div>
    </footer>
  );
};

export default LandingFooter;
