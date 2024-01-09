import SameSection from "../../components/SameSection";
import "./style.scss";
import Svg1 from "../../images/system-uicons_filtering.svg";
import Svg2 from "../../images/ci_grid-big-round.svg";
import Svg3 from "../../images/bi_view-list.svg";
import Features from "../../components/Features";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import ShopFilter from "../../components/ShopFilter";

const Shop = () => {
	const data = useSelector((state: RootState) => state.data.dataShop.data);
	const dataProductsLength = data?.map((item) => item?.products?.length);

	const [selectedTitle, setSelectedTitle] = useState<any>("");
	const [filterNumber, setFilterNumber] = useState<number>(
		16
	);

	const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		const selectedValue = e.target.value;

		setSelectedTitle(selectedValue);
	};
	useEffect(() => {
		const productsLength = data?.[0]?.products?.length;
		const totalProductCount = data?.[0]?.totalProductCount;

		if (productsLength !== undefined && totalProductCount !== undefined) {
			setFilterNumber(productsLength);
		}
	}, [data]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const selectedNumber = parseInt(e.target.value);
		setFilterNumber(selectedNumber);
	};

	//grid & list
	const [isGridClicked, setIsGridClicked] = useState(false);
	const [isListClicked, setIsListClicked] = useState(false);

	const handleClickGrid = () => {
		setIsGridClicked(true);
		setIsListClicked(false);
	};
	const handleClickList = () => {
		setIsListClicked(true);
		setIsGridClicked(false);
	};
	const [isFilterVisible, setIsFilterVisible] = useState(false);

	const handleFilterClick = () => {
		setIsFilterVisible(!isFilterVisible);
	};

	return (
		<div
			className={`shop ${isGridClicked ? "" : ""} ${
				isListClicked ? "list-view" : ""
			}`}
		>
			<SameSection title1="Shop" title2="Shop" />
			<div className="products-filter">
				<div className="products-filter-container">
					<div className="products-filter-container-leftside">
						<img src={Svg1} alt="svg" />
						<span onClick={handleFilterClick}>Filter</span>
						<img src={Svg2} alt="svg" onClick={() => handleClickGrid()} />
						<img src={Svg3} alt="svg" onClick={() => handleClickList()} />
						<div className="line"></div>
						<span>
							Showing 1–{filterNumber ? filterNumber : dataProductsLength} of{" "}
							{dataProductsLength} results
						</span>
					</div>
					<div className="products-filter-container-rightside">
						<span>Show</span>
						<input
							type="number"
							min="1"
							max={filterNumber}
							className="sort_number"
							value={filterNumber}
							onChange={(e) => handleNumberChange(e)}
						/>
						<span>Short by</span>
						<select className="sort" onChange={handleTitleChange}>
							<option value="nameasc">Title A-Z</option>
							<option value="namedesc">Title Z-A</option>
							<option value="priceasc">Price Low-High</option>
							<option value="pricedesc">Price High-Low</option>
						</select>
					</div>
				</div>
			</div>
			<ShopFilter
				isFilterVisible={isFilterVisible}
				selectedTitle={selectedTitle}
				filterNumber={filterNumber}
			/>
			<ProductCard />
			<Pagination />
			<Features />
		</div>
	);
};

export default Shop;
