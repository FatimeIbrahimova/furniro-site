import "./style.scss";
import { range } from "../../../Data/Data";
import { RangeTypes } from "../../../types";

const RangeSection:React.FC<RangeTypes> = () => {
	return (
		<div className="range-section">
			<div className="range-section-container">
			<div className="range-section-container_title">
				<h2>Browse The Range</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
				<div className="range-section-container_cards-wrapper">
				{range?.map((item)=>(
					<div className="range-section-container_cards-wrapper-card" key={item.id}>
					<img src={item.img} alt="img" loading="lazy"/>
                    <span>{item.room}</span>
				</div>
				))}
				
				</div>
			</div>
		</div>
	);
};

export default RangeSection;
