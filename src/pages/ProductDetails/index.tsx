import { NavLink, useParams } from "react-router-dom";
import "./style.scss";
import Svg from "../../images/dashicons_arrow-up-alt2.svg";
import StarSvg from "../../images/dashicons_star-filled.svg";
import { useState } from "react";
import AboutProduct from "./AboutProduct";
import { ProductTypes } from "../../types";
// import ProductCard from "../../components/ProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import "react-toastify/dist/ReactToastify.css";
import ProductFeatures from "../../components/ProductFeatures";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchDataDetail } from "../../redux/features/dataSlice";
import Loading from "../../components/Loading";
import ProductCard from "../../components/ProductCard";

const ProductDetails: React.FC<ProductTypes> = () => {
	const { id } = useParams();

	const data = useSelector((state: RootState) => state.data.detailData.data);
	const reviews: any = useSelector(
		(state: RootState) => state.review.fetchReview.data
	);

	const statusData = useSelector(
		(state: RootState) => state.data.detailData.status
	);
	const colorId = useSelector(
		(state: RootState) => state.data.detailData.colorId
	);

	const reng = data?.colors?.filter((item) => item.id == colorId);

	const [selectedProductImage, setSelectedProductImage] = useState<
		string | undefined
	>(reng?.[0]?.imageFiles[0]);

	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();

	useEffect(() => {
		if (id) {
			dispatch(fetchDataDetail(id));
		}
	}, [dispatch, id]);

	const handleRelatedProductClick = (img: string) => {
		setSelectedProductImage(img);
	};

	useEffect(() => {
		setSelectedProductImage(reng?.[0]?.imageFiles[0]);
	}, [data]);
	const handleColorChange = (newColorId: number) => {
		const newProductImage = data?.colors?.find((item) => item.id == newColorId)
			?.imageFiles[0];
		setSelectedProductImage(newProductImage);
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);

	useEffect(() => {
		console.log(
			"Updated 'selectedProductImage' valueeeeeee:",
			selectedProductImage
		);
	}, [selectedProductImage]);

	return (
		<>
			<div className="detail-page">
				<div className="detail-page_title">
					<div className="detail-page_title-container">
						<ul>
							<li>
								<NavLink to="/">Home</NavLink>
							</li>
							<img src={Svg} alt="img" />
							<li>
								<NavLink to="/shop">Shop</NavLink>
							</li>
							<img src={Svg} alt="img" />
							<div className="line"></div>
							<h3>{data?.title}</h3>
						</ul>
					</div>
				</div>
				<div className="detail-page_product-section">
					<div className="container">
						{statusData === "loading" && <Loading />}

						{statusData === "succeeded" && (
							<>
								<div className="detail-page_product-section-leftside">
									<div className="detail-page_product-section-leftside_relatedProducts">
										{reng?.[0]?.imageFiles?.map(
											(item: string, index: number) => (
												<div
													className="related-product"
													key={index}
													onClick={() => handleRelatedProductClick(item)}
												>
													<img src={item} alt="img" />
												</div>
											)
										)}
									</div>
									<div className="detail-page_product-section-leftside_product">
										<img src={selectedProductImage} alt="img" />
									</div>
								</div>
								<div className="detail-page_product-section-rightside">
									<h1>{data?.title}</h1>
									<span className="span">Rs.</span>
									<span className="span">
										{data?.discountedPrice
											? data?.discountedPrice
											: data?.salePrice}
									</span>
									<div className="review">
										<div className="stars">
											<img src={StarSvg} alt="img" />
											<img src={StarSvg} alt="img" />
											<img src={StarSvg} alt="img" />
											<img src={StarSvg} alt="img" />
											<img src={StarSvg} alt="img" />
										</div>
										<div className="line"></div>
										<span>{reviews.totalReviewCount} Customer Review</span>
									</div>
									<p>{data?.introduction}</p>

									<ProductFeatures
										selectedProductImage={selectedProductImage}
										onColorChange={handleColorChange}
									/>
									<div className="rightside-separator-line"></div>
									<div className="product-about">
										<ul>
											<li>
												<span className="product-feature">SKU</span>
												<span className="feature-span">:</span>
												{data?.sku}
											</li>
											<li>
												<span className="product-feature">Category</span>
												<span className="feature-span">:</span>
												<span>{data?.category?.categoryName}</span>
											</li>
											<li>
												<span className="product-feature">Tags</span>
												<span className="feature-span">:</span>
												{data?.tags?.map((item, index) => (
													<span key={item.id} className="tags">
														{item.tagName}
														{index < (data?.tags?.length ?? 0) - 1 && ", "}
													</span>
												))}
											</li>
											<li>
												<span className="product-feature">Share</span>
												<span className="feature-span">:</span>
												<div className="share-icons-wrapper">
													<i className="fa-brands fa-facebook"></i>
													<i className="fa-brands fa-linkedin"></i>
													<i className="fa-brands fa-twitter"></i>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</>
						)}

						{statusData === "failed" && (
							<div>Error loading data: {statusData}</div>
						)}
					</div>
				</div>
				<div className="separator-line"></div>
				<AboutProduct />
				<div className="separator-line"></div>
				<div className="related-products-section">
					<h2>Related Products</h2>

					<ProductCard />
				</div>
			</div>
		</>
	);
};

export default ProductDetails;
