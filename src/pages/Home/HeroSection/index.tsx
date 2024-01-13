import { NavLink } from "react-router-dom"
import "./style.scss"

const HeroSection = () => {
  return (
    <div className="hero-section">
       <div className="hero-section_content-wrapper">
           <div className="hero-section_content-wrapper-desc">
               <h3>New Arrival</h3>
               <h1>Discover Our New Collection</h1>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
               <NavLink to="/shop"><button>BUY Now</button></NavLink>
           </div>
       </div>
    </div>
  )
}

export default HeroSection