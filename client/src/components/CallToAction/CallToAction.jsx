import React from "react";
import "./CallToAction.css";

const CallToAction = () => {
  return (
    <section className="cta-section">
      <h2>Healthcare Made Simple</h2>
      <p>
        Book appointments, consult verified doctors, and manage your health
        records — anytime, anywhere.
      </p>

      <div className="cta-buttons">
        <button className="cta-primary-btn">Book Appointment</button>
        <button className="cta-secondary-btn">Talk to Doctor</button>
      </div>
    </section>
  );
};

export default CallToAction;
