import React from "react";
import "./DoctorsCard.css";
import doctorCardImage1 from "../../assets/doctorsCardImage1.png";
import doctorCardImage2 from "../../assets/doctorsCardImage2.png";
import doctorCardImage3 from "../../assets/doctorsCardImage3.png";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    specialization: "Cardiologist",
    experience: "12+ Years Experience",
    rating: "4.8",
    image: doctorCardImage1,
  },
  {
    id: 2,
    name: "Dr. Anjali Verma",
    specialization: "Dermatologist",
    experience: "8+ Years Experience",
    rating: "4.7",
    image: doctorCardImage2,
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    specialization: "Orthopedic",
    experience: "10+ Years Experience",
    rating: "4.9",
    image: doctorCardImage3,
  },
];


const DoctorsCard = () => {
  return (
    <section className="doctors-section">
      <h2>Our Trusted Doctors</h2>
      <p className="doctors-subtitle">
        Consult experienced and verified medical professionals
      </p>

      <div className="doctors-grid">
        {doctorsData.map((doctor) => (
          <div className="doctor-card" key={doctor.id}>
            <div className="doctor-avatar">
              <img src={doctor.image} alt={doctor.name.charAt(0)} />
            </div>

            <h3>{doctor.name}</h3>
            <p className="specialization">{doctor.specialization}</p>
            <p className="experience">{doctor.experience}</p>

            <div className="rating">⭐ {doctor.rating}</div>

            <button className="book-btn">Book Appointment</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorsCard;
