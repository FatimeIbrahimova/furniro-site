import { NavLink } from "react-router-dom";
import "./style.scss";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-top">
				<div className="footer-top_title">
					<h2>Funiro.</h2>
					<p>
						400 University Drive Suite 200 Coral Gables,{" "}
						<span>FL 33134 USA</span>
					</p>
				</div>
				<div className="footer-top_links">
					<h3>Links</h3>
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/shop">Shop</NavLink>
						</li>
						<li>
							<NavLink to="#">About</NavLink>
						</li>
						<li>
							<NavLink to="/contact">Contact</NavLink>
						</li>
					</ul>
				</div>
				<div className="footer-top_help">
					<h3>Help</h3>
					<ul>
						<li>Payment Options</li>
						<li>Returns</li>
						<li>Privacy Policies</li>
					</ul>
				</div>
				<div className="footer-top_newsletter">
					<h3>Newsletter</h3>
					<div className="footer-top_newsletter-form">
						<input placeholder="Enter Your Email Address" />
						<button>SUBSCRIBE</button>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="footer-bottom-container">
					<span>2023 furino. All rights reverved</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
