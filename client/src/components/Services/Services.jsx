import React from "react";
import ServicesImage from "../../assets/ServicesImage.png";
import "./Services.css";

const Services = () => {
  const services = [
    "Online Doctor Consultation",
    "Easy Appointment Booking",
    "Digital Health Records",
    "24/7 Medical Support",
  ];

  return (
    <section className="services">
      <div className="left-container">
        <img src={ServicesImage} alt="Services Image" />
      </div>
      <div className="right-container">
        <h2>What We Offer</h2>
        <ul>
          {services.map((service, index) => (
            <li key={index}>
              <span className="tick">✓</span> {service}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
