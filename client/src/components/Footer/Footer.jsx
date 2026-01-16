import React from "react";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterBottom from "./FooterBottom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h2>DocsCare</h2>
          <p>Your Digital Health Companion</p>
        </div>

        <div className="footer-sections">
          <FooterLinks />
          <FooterContact />
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
};

export default Footer;
