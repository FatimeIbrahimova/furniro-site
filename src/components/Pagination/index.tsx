import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataShop } from "../../redux/features/dataSlice";
import { fetchBlog } from "../../redux/features/blogSlice";
import "./style.scss";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux";
import { useLocation } from "react-router-dom";

const Pagination = ({
	blog,
	value,
	categoryId,
	filterNumber,
	selectedTitle,
	selectedCategories,
	selectedTags,
	selectedSizes,
	selectedColors,
	selectedMinPrice,
	selectedMaxPrice,
	isNewChecked,
}: any) => {
	const [selectedNumber, setSelectedNumber] = useState(1);
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const data = useSelector((state: RootState) => state.data.dataShop.data);
	const location = useLocation();
	const isShopPage = location.pathname === "/shop";
	const itemsPerPage = isShopPage ? filterNumber : 3;

	const handleButtonClick = (pageNumber: number) => {
		setSelectedNumber(pageNumber);
		if (pageNumber) {
			isShopPage
				? dispatch(
						fetchDataShop({
							page: pageNumber,
							count: itemsPerPage,
							sortValue: selectedTitle,
							categoryNames: selectedCategories,
							tagNames: selectedTags,
							productSizes: selectedSizes,
							productColors: selectedColors,
							productMinPrice: selectedMinPrice,
							productMaxPrice: selectedMaxPrice,
							isNew: isNewChecked,
						})
				  )
				: dispatch(
						fetchBlog({
							page: pageNumber,
							count: itemsPerPage,
							value: value,
							categoryId: categoryId,
						})
				  );
		}
	};

	const renderPageButtons = (totalPages: number) => {
		const buttons = [];
		const totalPagesToShow = 3;

		if (totalPages <= totalPagesToShow) {
			for (let i = 1; i <= totalPages; i++) {
				buttons.push(renderPageButton(i));
			}
		} else {
			const startPage = Math.max(selectedNumber - 1, 1);
			const endPage = Math.min(startPage + totalPagesToShow - 1, totalPages);

			for (let i = startPage; i <= endPage; i++) {
				buttons.push(renderPageButton(i));
			}

			if (endPage < totalPages && totalPages !== endPage + 1) {
				buttons.push(<span key="ellipsis">...</span>);
				buttons.push(renderPageButton(totalPages));
			}
		}

		return buttons;
	};

	const renderPageButton = (pageNumber: number) => (
		<button
			key={pageNumber}
			className={selectedNumber === pageNumber ? "selected" : ""}
			onClick={() => handleButtonClick(pageNumber)}
		>
			{pageNumber}
		</button>
	);

	const handleNextButtonClick = () => {
		if (
			(data && data.length > 0) ||
			(blog && blog.length > 0 && blog[0]?.blogs && blog[0]?.blogs.length)
		) {
			const totalItemCount = isShopPage
				? (data && data?.[0]?.totalProductCount) || 0
				: (blog && blog[0]?.totalBlogCount) || 0;
			const totalPages = Math.ceil(totalItemCount / itemsPerPage);

			if (selectedNumber < totalPages) {
				setSelectedNumber(selectedNumber + 1);
				isShopPage
					? dispatch(
							fetchDataShop({ page: selectedNumber, count: itemsPerPage })
					  )
					: dispatch(
							fetchBlog({
								page: selectedNumber,
								count: itemsPerPage,
								value: value,
								categoryId: categoryId,
							})
					  );
			}
		}
	};

	const handleBackButtonClick = () => {
		if (selectedNumber > 1) {
			setSelectedNumber(selectedNumber - 1);
			isShopPage
				? dispatch(
						fetchDataShop({ page: selectedNumber - 1, count: itemsPerPage })
				  )
				: dispatch(
						fetchBlog({
							page: selectedNumber - 1,
							count: itemsPerPage,
							value: value,
						})
				  );
		}
	};

	return (
		<div className="pagination">
			<div className="pagination-buttons">
				{selectedNumber > 1 && (
					<button onClick={handleBackButtonClick}>Back</button>
				)}
				{renderPageButtons(
					Math.ceil(
						((blog && blog[0]?.totalBlogCount) ||
							(data && data[0]?.totalProductCount) ||
							0) / itemsPerPage
					)
				)}

				<button onClick={handleNextButtonClick}>Next</button>
			</div>
		</div>
	);
};

export default Pagination;
