import { ProductTypes } from "../../../types";
import "./style.scss";
import ProductCard from "../../../components/ProductCard";

const Products: React.FC<ProductTypes> = () => {
	return (
		<div className="products-section">
			<div className="products-section-container">
				<div className="products-section-container_title">
					<h2>Our Products</h2>
				</div>
			</div>
			<ProductCard />
		</div>
	);
};

export default Products;
