import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useEffect } from "react";
import Select from "react-select";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
	fetchCategory,
	fetchColors,
	fetchSizes,
	fetchTags,
} from "../../redux/features/filterSlice";
import { fetchDataShop } from "../../redux/features/dataSlice";
import "./style.scss";

interface featureOptions {
	label: string | JSX.Element;
	value: number;
}
interface ShopFilterProps {
	isFilterVisible: boolean;
	selectedTitle: string;
	filterNumber: number;
	resetFilterNumber: () => void;
	selectedCategories:any;
    setSelectedCategories:any;
	selectedTags:any;
	setSelectedTags:any;
	selectedSizes:any;
	setSelectedSizes:any;
	selectedColors:any;
	setSelectedColors:any;
	selectedMinPrice:any;
	setSelectedMinPrice:any;
	selectedMaxPrice:any;
	setSelectedMaxPrice:any;
	isNewChecked:any;
	setNewChecked:any;
}
const ShopFilter: React.FC<ShopFilterProps> = ({
	isFilterVisible,
	selectedTitle,
	filterNumber,
	resetFilterNumber,
	selectedCategories,
	setSelectedCategories,
	selectedTags,
	setSelectedTags,
	selectedSizes,
	setSelectedSizes,
	selectedColors,
	setSelectedColors,
	selectedMinPrice,
	setSelectedMinPrice,
	selectedMaxPrice,
	setSelectedMaxPrice,
	isNewChecked,
	setNewChecked
}) => {
	const categories = useSelector(
		(state: RootState) => state.filterFeatures.categories.data
	);
	const categoryOptions: featureOptions[] =
		categories && Array.isArray(categories)
			? categories.map((item) => ({ label: item.categoryName, value: item.id }))
			: [];
	const tags = useSelector(
		(state: RootState) => state.filterFeatures.tags.data
	);

	const tagsOptions: featureOptions[] =
		tags && Array.isArray(tags)
			? tags.map((item) => ({ label: item.tagName, value: item.id }))
			: [];
	const sizes = useSelector(
		(state: RootState) => state.filterFeatures.sizes.data
	);
	const sizeOptions: featureOptions[] =
		sizes && Array.isArray(sizes)
			? sizes.map((item) => ({ label: item.sizeName, value: item.id }))
			: [];

	const colors = useSelector(
		(state: RootState) => state.filterFeatures.colors.data
	);

	const colorOptions: featureOptions[] =
		colors && Array.isArray(colors)
			? colors.map((item) => ({
					value: item.id,
					label: item.colorHexCode,
			  }))
			: [];

	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();

	useEffect(() => {
		dispatch(
			fetchDataShop({
				page: 1,
				count: filterNumber,
				sortValue: selectedTitle,
				categoryNames: selectedCategories,
				tagNames: selectedTags,
				productSizes: selectedSizes,
				productColors: selectedColors,
				productMinPrice: selectedMinPrice,
				productMaxPrice: selectedMaxPrice,
				isNew: isNewChecked,
			})
		);
	}, [
		selectedTitle,
		selectedCategories,
		selectedTags,
		selectedSizes,
		selectedColors,
		selectedMinPrice,
		selectedMaxPrice,
		isNewChecked,
		filterNumber,
	]);

	useEffect(() => {
		dispatch(fetchCategory());
		dispatch(fetchTags());
		dispatch(fetchSizes());
		dispatch(fetchColors());
	}, []);

	const handleCategoryChange = (selectedOptions: any) => {
		setSelectedCategories(selectedOptions);
	};

	const handleTagsChange = (selectedOptions: any) => {
		setSelectedTags(selectedOptions);
	};

	const handleSizesChange = (selectedOptions: any) => {
		setSelectedSizes(selectedOptions);
	};
	const handleColorsChange = (selectedOptions: any) => {
		setSelectedColors(selectedOptions);
	};

	const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setSelectedMinPrice(parseInt(inputValue));
	};
	const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setSelectedMaxPrice(parseInt(inputValue));
	};

	const handleNewCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewChecked(e.target.checked);
	};

	useEffect(() => {
		if (
			selectedCategories.length === 0 &&
			selectedTags.length === 0 &&
			selectedSizes.length === 0 &&
			selectedColors.length === 0
		) {
			resetFilterNumber();
		}
	}, [
		selectedCategories,
		selectedTags,
		selectedSizes,
		selectedColors,
		resetFilterNumber,
	]);

	return (
		<div className={`filter ${isFilterVisible ? "filter-visible" : ""}`}>
			<div className="filter-wrapper">
				<Select
					className="react-select"
					options={categoryOptions}
					isMulti
					placeholder="Categories"
					onChange={(item) => handleCategoryChange(item)}
				/>
				<Select
					className="react-select"
					options={tagsOptions}
					isMulti
					placeholder="Tags"
					onChange={(item) => handleTagsChange(item)}
				/>
				<Select
					className="react-select"
					options={sizeOptions}
					isMulti
					placeholder="Sizes"
					onChange={(item) => handleSizesChange(item)}
				/>
				<Select
					className="react-select"
					options={colorOptions}
					isMulti
					placeholder="Colors"
					onChange={(item) => handleColorsChange(item)}
				/>
				<input
					className="select-price"
					placeholder="Min Price"
					type="number"
					onChange={(e) => handleMinPriceChange(e)}
				/>
				<input
					className="select-price"
					placeholder="Max Price"
					type="number"
					onChange={(e) => handleMaxPriceChange(e)}
				/>
				<div className="new-filter">
					<input
						type="checkbox"
						checked={isNewChecked}
						onChange={handleNewCheckboxChange}
					/>
					<span>New</span>
				</div>
			</div>
		</div>
	);
};

export default ShopFilter;
