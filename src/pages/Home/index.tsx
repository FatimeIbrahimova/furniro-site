
import Funiro from "./Funiro"
import HeroSection from "./HeroSection"
import Products from "./Products"
import RangeSection from "./RangeSection"
import Slider from "./Slider"
import {useEffect} from "react"

const Home = () => {
  useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);
  return (
    <div>
      <HeroSection/>
      <RangeSection/>
      <Products/>
      <Slider/>
      <Funiro/>
    </div>
  )
}

export default Home