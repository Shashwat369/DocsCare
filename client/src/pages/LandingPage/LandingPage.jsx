import React from 'react'
import Hero from '../../components/Hero/Hero'
import TrustedCompanies from '../../components/TrustedCompanies/TrustedCompanies'
import Services from '../../components/Services/Services'
import HowItWorks from '../../components/HowItWorks/HowItworks'
import DoctorsCard from '../../components/DoctorsCard/DoctorsCard'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import Testimonials from '../../components/Testimonials/Testimonials'
import FAQ from '../../components/FAQ/FAQ'
import CallToAction from '../../components/CallToAction/CallToAction'
import LandingFooter from '../../components/LandingFooter/LandingFooter'

const LandingPage = () => {
  return (
    <div>
      <Hero/>
      <TrustedCompanies/>
      <Services/>
      <HowItWorks/>
      <DoctorsCard/>
      <WhyChooseUs/>
      <Testimonials/>
      <CallToAction/>
      <FAQ/>
      <LandingFooter/>
    </div>
  )
}

export default LandingPage
