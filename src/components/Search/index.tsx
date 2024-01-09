import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { fetchSearchData } from "../../redux/features/dataSlice";
import { SearchData } from "../../types";
import "./style.scss";
import Loading from "../Loading";

interface SearchProps {
	search_input: string;
	handleClose: () => void;
	filterSearch: string;
	setFilterSearch: React.Dispatch<React.SetStateAction<string>>;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}


const Search: React.FC<SearchProps> = ({
	search_input,
	handleClose,
	filterSearch,
	setFilterSearch,
	value,
	setValue,
}) => {
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const filterData = useSelector(
		(state: RootState) => state.data.searchData.data
	);

	useEffect(() => {
			dispatch(fetchSearchData({value:value,count:48}));
	}, [value]);
	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setValue(inputValue);
		if (inputValue === "") {
			setFilterSearch("hidden");
		} else {
			setFilterSearch("visible");
		}
	};
	return (
		<div>
			<div className={search_input}>
				<div className="search-input nav">
					<div className="nav-container">
						<input
							placeholder="Enter Your Search Product"
							onChange={(e) => handleChange(e)}
							value={value}
						/>
						<i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
					</div>
				</div>
			</div>
			<div className={filterSearch}>
				<div className="search_wrapper visible">
					{filterData ? (
						filterData.length === 0 ? (
							<p className="no-message">No search results found.</p>
						) : (
							((filterData[0].products as SearchData[]))?.map((data: SearchData) => (
								<a href={`${data.id}`} key={data.id}>
									<div className="search_wrapper-inner">
										<div className="search_wrapper-inner-img">
											{data.imageFiles && data.imageFiles.length > 0 && (
												<img
													src={data.imageFiles[0]}
													alt="img"
													loading="lazy"
													key={data.id}
												/>
											)}
										</div>
										<div className="search_wrapper-inner-desc">
											<h1>{data.title}</h1>
											<span>{data.subTitle}</span>
										</div>
									</div>
								</a>
							))
						)
					) : (
						<Loading />
					)}
				</div>
			</div>
		</div>
	);
};

export default Search;
