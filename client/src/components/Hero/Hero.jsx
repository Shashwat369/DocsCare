import React from 'react'
import DoctorImage from '../../assets/DoctorImage.png'
import "./Hero.css"
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleBookAppointment = () => {
    if (isLoggedIn) {
      navigate('/find-doctor')
    } else {
      navigate('/user/login')
    }
  }

  return (
    <div className='hero'>
      <section className='left'>
        <h1>Your Health, Our Priority</h1>

        <h3>Comprehensive & Compassionate Care</h3>

        <p className="hero-desc">
          Consult verified doctors online, book appointments easily,
          and manage your digital health records securely — anytime, anywhere.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={handleBookAppointment}>
            Book Appointment
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate('/find-doctor')}
          >
            Talk to Doctor
          </button>
        </div>

        <div className="hero-trust">
          <span>✓ Verified Doctors</span>
          <span>✓ 24/7 Support</span>
          <span>✓ Secure Records</span>
        </div>
      </section>

      <section className='right'>
        <img src={DoctorImage} loading='lazy' alt="Verified doctor smiling, DocsCare healthcare platform" />
      </section>
    </div>
  )
}

export default Hero
