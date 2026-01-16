import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <p className="how-subtitle">
        Get medical help in just three simple steps
      </p>

      <div className="steps">
        <div className="step-card">
          <div className="step-number">1</div>
          <h3>Find Doctor</h3>
          <p>Search and choose from verified doctors based on your needs.</p>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <h3>Book Appointment</h3>
          <p>Select a suitable time slot and book instantly.</p>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <h3>Get Consultation</h3>
          <p>Consult online or visit the doctor as per your appointment.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
