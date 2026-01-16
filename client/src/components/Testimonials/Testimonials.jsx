import React from "react";
import "./Testimonials.css";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";

const testimonialsData = [
  {
    name: "Rohit Kumar",
    role: "Patient",
    review:
      "DocsCare helped me consult a specialist within minutes. The process was smooth and stress-free.",
    rating: 5,
    image : user1
  },
  {
    name: "Priya Sharma",
    role: "Patient",
    review:
      "Very professional doctors and quick appointment booking. Highly recommended for online consultation.",
    rating: 5,
    image : user2
  },
  {
    name: "Ankit Verma",
    role: "Patient",
    review:
      "I loved how easy it was to manage my health records and consult doctors anytime.",
    rating: 4,
    image : user3
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2>What Our Patients Say</h2>
      <p className="testimonials-subtitle">
        Real experiences from people who trusted DocsCare for their healthcare needs.
      </p>

      <div className="testimonials-grid">
        {testimonialsData.map((item, index) => (
          <div className="testimonial-card" key={index}>
             <img src={item.image} alt={item.name} className="testimonial-avatar" />
            <h4>{item.name}</h4>
            <span>{item.role}</span>
            <div className="stars">
              {"⭐".repeat(item.rating)}
            </div>
            <p className="review">“{item.review}”</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
