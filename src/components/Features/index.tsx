import Svg1 from "../../images/trophy 1.svg";
import Svg2 from "../../images/guarantee.svg";
import Svg3 from "../../images/shipping.svg";
import Svg4 from "../../images/customer-support.svg";
import "./style.scss";

const Features = () => {
	return (
		<div className="features">
			<div className="features-container">
				<div className="feature">
					<img src={Svg1} alt="svg" loading="lazy" />
					<div>
						<h3>High Quality</h3>
						<span>crafted from top materials</span>
					</div>
				</div>
				<div className="feature">
					<img src={Svg2} alt="svg" loading="lazy" />
					<div>
						<h3>Warranty Protection</h3>
						<span>Over 2 years</span>
					</div>
				</div>
				<div className="feature">
					<img src={Svg3} alt="svg" loading="lazy" />
					<div>
						<h3>Free Shipping</h3>
						<span>Order over 150 $</span>
					</div>
				</div>
				<div className="feature feature4">
					<img src={Svg4} alt="svg" loading="lazy" />
					<div>
						<h3>24 / 7 Support</h3>
						<span>Dedicated support</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Features;
