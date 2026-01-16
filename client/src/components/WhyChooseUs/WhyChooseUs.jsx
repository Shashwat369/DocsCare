import React from "react";
import "./WhyChooseUs.css";
import ChooseUsImage from "../../assets/ChooseUsImage.jpg";

const reasons = [
  {
    title: "Verified Doctors",
    desc: "All doctors are certified, experienced, and background-verified.",
    icon: "✔️",
  },
  {
    title: "24/7 Medical Support",
    desc: "Consult doctors anytime, even during emergencies.",
    icon: "⏰",
  },
  {
    title: "Secure Health Records",
    desc: "Your medical data is encrypted and safely stored.",
    icon: "🔒",
  },
  {
    title: "Fast Appointments",
    desc: "Book doctor consultations in just a few clicks.",
    icon: "⚡",
  },
];

const WhyChooseUs = () => {
  return (
<section className="why-section">
  <div className="why-wrapper">
    
  

    <div className="why-content">
      <h2>Why Choose DocsCare</h2>
      <p className="why-subtitle">
        We combine technology and trusted healthcare to deliver a seamless
        medical experience.
      </p>

      <div className="why-grid">
        {reasons.map((item, index) => (
          <div className="why-card" key={index}>
            <div className="why-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
      <div className="image-container">
      <img src={ChooseUsImage} alt="Why Choose Us" />
    </div>

  </div>
</section>

  );
};

export default WhyChooseUs;
