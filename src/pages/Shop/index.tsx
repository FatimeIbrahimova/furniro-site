import SameSection from "../../components/SameSection";
import "./style.scss";
import Svg1 from "../../images/system-uicons_filtering.svg";
import Svg2 from "../../images/ci_grid-big-round.svg";
import Svg3 from "../../images/bi_view-list.svg";
import Features from "../../components/Features";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { ProductCard, ShopFilter } from "../../components";

const Shop = () => {
	const data = useSelector((state: RootState) => state.data.dataShop.data);
	const dataProductsLength: any = data?.map((item) => item?.products?.length);

	const [selectedTitle, setSelectedTitle] = useState<any>("");
	const [filterNumber, setFilterNumber] = useState<number>(8);

	//for ShopFilter
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [selectedSizes, setSelectedSizes] = useState([]);
	const [selectedColors, setSelectedColors] = useState([]);
	const [selectedMinPrice, setSelectedMinPrice] = useState(0);
	const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
	const [isNewChecked, setNewChecked] = useState(false);
	//

	const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		const selectedValue = e.target.value;

		setSelectedTitle(selectedValue);
	};
	// useEffect(() => {
	// 	const productsLength = data?.[0]?.products?.length;
	// 	const totalProductCount = data?.[0]?.totalProductCount;
	// 	if (productsLength !== undefined && totalProductCount !== undefined) {
	// 		setFilterNumber(productsLength);
	// 	}
	// }, [data]);

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

	const handleResetFilterNumber = () => {
		setFilterNumber(filterNumber);
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
							Showing 1–{dataProductsLength} of {data?.[0]?.totalProductCount}{" "}
							results
						</span>
					</div>
					<div className="products-filter-container-rightside">
						<span>Show</span>
						<input
							type="number"
							min="1"
							max={dataProductsLength}
							className="sort_number"
							value={filterNumber}
							onChange={(e) => handleNumberChange(e)}
						/>

						<span>Sort by</span>
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
				resetFilterNumber={handleResetFilterNumber}
				selectedCategories={selectedCategories}
				setSelectedCategories={setSelectedCategories}
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
				selectedSizes={selectedSizes}
				setSelectedSizes={setSelectedSizes}
				selectedColors={selectedColors}
				setSelectedColors={setSelectedColors}
				selectedMinPrice={selectedMinPrice}
				setSelectedMinPrice={setSelectedMinPrice}
				selectedMaxPrice={selectedMaxPrice}
				setSelectedMaxPrice={setSelectedMaxPrice}
				isNewChecked={isNewChecked}
				setNewChecked={setNewChecked}
			/>
			<ProductCard />
			<Pagination
				filterNumber={filterNumber}
				selectedTitle={selectedTitle}
				selectedCategories={selectedCategories}
				selectedTags={selectedTags}
				selectedSizes={selectedSizes}
				selectedColors={selectedColors}
				selectedMinPrice={selectedMinPrice}
				selectedMaxPrice={selectedMaxPrice}
				isNewChecked={isNewChecked}
			/>
			<Features />
		</div>
	);
};

export default Shop;
