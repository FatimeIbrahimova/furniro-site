import { NavLink, useLocation } from "react-router-dom";
import "./style.scss";
import SvgRight from "../../images/dashicons_arrow-down-alt2.svg";
import LogoSvg from "../../images/Meubel House_Logos-05.svg";

interface Props {
	title1: string;
	title2: string;
}
const SameSection = ({ title1, title2 }: Props) => {
	const location = useLocation();
	const isSearchPage = location.pathname === "/search";
	return (
		<div className="same-section">
			<div className="same-section_content">
				<img src={LogoSvg} alt="logo" className="logo" loading="lazy" />
				<h1>{title1}</h1>
				<div className="same-section_content-links">
					{isSearchPage ? (
						<div className="input-wrapper">
							<input type="text" placeholder="Axtar" />
							<i className="fa-solid fa-magnifying-glass"></i>
						</div>
					) : (
						<>
							<NavLink to="/">Home</NavLink>
							<img src={SvgRight} alt="svg" loading="lazy" />
							<h2>{title2}</h2>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default SameSection;
