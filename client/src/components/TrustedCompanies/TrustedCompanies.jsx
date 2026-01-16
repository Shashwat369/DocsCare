import React from 'react'
import Apollo from "../../assets/Apollo.png"
import Company1 from "../../assets/Company1.png"
import Company2 from "../../assets/Company2.avif"
import Company3 from "../../assets/Company3.avif"
import Company4 from "../../assets/Company4.png"
import "./TrustedCompanies.css"



const TrustedCompanies = () => {
  return (
        
      

      <div className="logos">
        <img src={Apollo} alt="Apollo logo" />
        <img src={Company1} alt="Company1 logo" />
        <img src={Company2} alt="Company2 logo" />
        <img src={Company3} alt="Company3 logo" />
        <img src={Company4} alt="Company4 logo" />

      </div>

  )
}

export default TrustedCompanies