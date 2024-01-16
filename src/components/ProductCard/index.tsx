import { useEffect, useState } from "react";
import SvgIcon1 from "../../images/gridicons_share.svg";
import SvgIcon3 from "../../images/Heart.svg";
import "./style.scss";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { ProductTypes } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist} from "../../redux/features/wishlistSlice";
import {
	fetchData,
	fetchDataShop,
	fetchRelatedData,
} from "../../redux/features/dataSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux";
import Modal from "../ModalComponent";
import Loading from "../Loading";

interface RouteParams {
	id?: string | any;
}

const ProductCard: React.FC<ProductTypes> = () => {
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const data = useSelector((state: RootState) => state.data.data.data);
	const dataStatus = useSelector((state: RootState) => state.data.data.status);
	const dataShop = useSelector((state: RootState) => state.data.dataShop.data);
	const relatedData = useSelector((state: RootState) => state.data.relatedData);
	const wishlistData:any=useSelector((state: RootState) => state.wishlist.fetchWishlist.data);
	
	const { id }: RouteParams = useParams();

	const products = data?.map((item) => item.products);
	const productsShop = dataShop?.map((item) => item.products);

	const [likeClicked, setLikeClicked] = useState(false);
	//for home page
	const showProducts = () => {
		const newDataLength = (products?.[0]?.length || 0) + 8;
		if (newDataLength) {
			dispatch(fetchData(newDataLength));
		}
	};

	const showRelatedProducts = () => {
		const newDataLength = (relatedData?.data?.length || 0) + 4;

		if (newDataLength) {
			dispatch(fetchData(newDataLength));
		}
	};

	useEffect(() => {
		dispatch(fetchData(8));
		dispatch(fetchDataShop({ page: 1, count: 12 }));
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchRelatedData({ id: id, count: 4 }));
	}, [id]);

	//like
	const likedProducts: ProductTypes[] = useSelector(
		(state: RootState) => state.wishlist.postWishlist.likedProducts
	);
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		dispatch(fetchWishlist(userId));
	}, []);

	const handleClickLike = (likedProduct: ProductTypes) => {
		setLikeClicked(true);
		openModal(likedProduct.id);
		setAddCard(false);
	};


	const handleProductDetail = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		e.stopPropagation();
		e.preventDefault();
	};

	const location = useLocation();
	const isHomePage = location.pathname === "/";
	const isShopPage = location.pathname === "/shop";

	const isProductDetail = location.pathname.includes(id);

	//modal
	const [modal, setModal] = useState<number | null>(null);
	const openModal = (itemId: number | null) => {
		setModal(itemId);
	};
	//share
	const handleClickSocialIcon = (item: ProductTypes, e: React.MouseEvent) => {
		const urlToShare = `http://localhost:5173/${item.id}`;
		const socialMedia = e.currentTarget.classList[1];

		switch (socialMedia) {
			case "fa-instagram":
				window.open(
					`https://www.instagram.com/?utm_source=ig_web_copy_link&url=${urlToShare}`,
					"_blank"
				);
				break;
			case "fa-linkedin":
				window.open(
					`https://www.linkedin.com/sharer/sharer.php?u=${encodeURIComponent(
						urlToShare
					)}`,
					"_blank"
				);
				break;

			case "fa-whatsapp":
				window.open(
					`https://api.whatsapp.com/send?text=${encodeURIComponent(
						`Check out this product: ${urlToShare}`
					)}`,
					"_blank"
				);
				break;
			default:
				break;
		}
	};

	const handleSocialMediaShare = (urlToShare: string) => {
		window.open(urlToShare, "_blank");
	};

	const [addCard, setAddCard] = useState(false);
	const handleAddToCard = (item: ProductTypes) => {
		openModal(item.id);
		setAddCard(true);
		setLikeClicked(false);
	};

	const favori = wishlistData?.[0]?.favorites;
    const likedProductss = favori?.map((item:any) => item) || []; 
	
	
	return (
		<div className="product-card">
			<div className="product-card-container">
				<div className="products-section-container_cards-wrapper">
					{isHomePage && (
						<>
							{dataStatus === "loading" ? (
								<Loading />
							) : dataStatus === "succeeded" ? (
								products[0]?.map((item: ProductTypes) => (
									<div
										className="products-section-container_cards-wrapper-card"
										key={item.id}
									>
										<img src={item.imageFiles} alt="img" loading="lazy" />
										<div className="product-info">
											<h3>{item.title}</h3>
											<p className="desc">{item.subTitle}</p>
											<div className="price">
												{item.discountedPrice &&
													(item.discountedPrice !== item.salePrice ? (
														<>
															<p>
																<span className="price-text">Rp</span>
																<span>{item.discountedPrice}</span>
															</p>
															<p className="second-price">
																<span>Rp {item.salePrice}</span>
															</p>
														</>
													) : (
														<p>
															<span className="price-text">Rp</span>
															<span>{item.salePrice}</span>
														</p>
													))}
											</div>
										</div>
										<div className="new-or-discount">
											{item.discountPercent !== 0 && item.discountedPrice && (
												<span className="discount">
													-{item.discountPercent}%
												</span>
											)}
											{item.isNew && item.discountPercent === 0 && (
												<span className="new">New</span>
											)}
										</div>
										<NavLink
											to={`/product/${item.id}`}
											className={` ${modal === item.id ? "disable-hover" : ""}`}
										>
											<div
												className={` ${
													modal === item.id
														? "disable-hover"
														: "hover-effect-overlay"
												}`}
											>
												<div
													className="hover-effect"
													onClick={(e) => handleProductDetail(e)}
												>
													<button
														className="card-btn"
														onClick={() => handleAddToCard(item)}
													>
														Add to cart
													</button>
													<ul>
														<li className="share">
															<div className="share-icon-text">
																<img
																	src={SvgIcon1}
																	alt="icon"
																	onClick={() =>
																		handleSocialMediaShare(
																			`http://localhost:5173/${id}`
																		)
																	}
																/>
																Share
															</div>
															<ul className="social-icons">
																<li>
																	<i
																		className="fa-brands fa-instagram"
																		onClick={(e) =>
																			handleClickSocialIcon(item, e)
																		}
																	></i>
																</li>
																<li>
																	<i
																		className="fa-brands fa-linkedin"
																		onClick={(e) =>
																			handleClickSocialIcon(item, e)
																		}
																	></i>
																</li>
																<li>
																	<i
																		className="fa-brands fa-whatsapp"
																		onClick={(e) =>
																			handleClickSocialIcon(item, e)
																		}
																	></i>
																</li>
															</ul>
														</li>

														<li >
															{likedProductss?.some(
																(product:any) => product.productId === item.id
															) ? (
																<i className="fa-solid fa-heart"></i>
															) : (
																<img src={SvgIcon3} alt="icon" />
															)}
															{likedProductss?.some(
																(product:any) => product.productId === item.id
															)
																? <span>Unlike</span>
																: <span onClick={() => handleClickLike(item)}>Like</span>}
														</li>
													</ul>
												</div>
											</div>
										</NavLink>
										{modal === item.id && (
											<Modal
												itemId={modal}
												onClose={() => setModal(null)}
												isModal={openModal}
												like={likeClicked}
												card={addCard}
											/>
										)}
									</div>
								))
							) : (
								dataStatus === "failed" && <div>Error</div>
							)}
						</>
					)}

					{isHomePage &&
					(products?.[0]?.length || 0) < data[0]?.totalProductCount ? (
						<div className="show">
							<button onClick={showProducts}>Show More</button>
						</div>
					) : (
						<></>
					)}

					{isShopPage &&
						productsShop[0]?.map((item: ProductTypes) => (
							<div
								className="products-section-container_cards-wrapper-card"
								key={item.id}
							>
								<img src={item.imageFiles} alt="img" loading="lazy" />
								<div className="product-info">
									<h3>{item.title}</h3>
									<p className="desc">{item.subTitle}</p>
									<div className="price">
										{item.discountedPrice &&
											(item.discountedPrice !== item.salePrice ? (
												<>
													<p>
														<span className="price-text">Rp</span>
														<span>{item.discountedPrice}</span>
													</p>
													<p className="second-price">
														<span>Rp {item.salePrice}</span>
													</p>
												</>
											) : (
												<p>
													<span className="price-text">Rp</span>
													<span>{item.salePrice}</span>
												</p>
											))}
									</div>
								</div>
								<div className="new-or-discount">
									{item.discountPercent !== 0 && item.discountedPrice && (
										<span className="discount">-{item.discountPercent}%</span>
									)}
									{item.isNew && item.discountPercent == 0 && (
										<span className="new">New</span>
									)}
								</div>
								<NavLink
									to={`/product/${item.id}`}
									className={` ${modal === item.id ? "disable-hover" : ""}`}
								>
									<div
										className={` ${
											modal === item.id
												? "disable-hover"
												: "hover-effect-overlay"
										}`}
									>
										<div
											className="hover-effect"
											onClick={(e) => handleProductDetail(e)}
										>
											<button
												className="card-btn"
												onClick={() => handleAddToCard(item)}
											>
												Add to cart
											</button>
											<ul>
												<li className="share">
													<div className="share-icon-text">
														<img
															src={SvgIcon1}
															alt="icon"
															onClick={() =>
																handleSocialMediaShare(
																	`http://localhost:5173/${id}`
																)
															}
														/>{" "}
														Share
													</div>
													<ul className="social-icons">
														<li>
															<i
																className="fa-brands fa-instagram"
																onClick={(e) => handleClickSocialIcon(item, e)}
															></i>
														</li>
														<li>
															<i
																className="fa-brands fa-linkedin"
																onClick={(e) => handleClickSocialIcon(item, e)}
															></i>
														</li>
														<li>
															<i
																className="fa-brands fa-whatsapp"
																onClick={(e) => handleClickSocialIcon(item, e)}
															></i>
														</li>
													</ul>
												</li>
												<li onClick={() => handleClickLike(item)}>
													{likedProducts.some(
														(product) => product.id === item.id
													) ? (
														<i className="fa-solid fa-heart"></i>
													) : (
														<img src={SvgIcon3} alt="icon" />
													)}
													{likedProducts.some(
														(product) => product.id === item.id
													)
														? "Unlike"
														: "Like"}
												</li>
											</ul>
										</div>
									</div>
								</NavLink>
								{modal === item.id && (
									<Modal
										itemId={modal}
										onClose={() => setModal(null)}
										isModal={openModal}
										like={likeClicked}
										card={addCard}
									/>
								)}
							</div>
						))}
					{isProductDetail &&
						Array.isArray(relatedData.data) &&
						relatedData.data?.map((item) => (
							<div
								className="products-section-container_cards-wrapper-card"
								key={item.id}
							>
								<img src={item.imageFiles} alt="img" loading="lazy" />
								<div className="product-info">
									<h3>{item.title}</h3>
									<p className="desc">{item.subTitle}</p>
									<div className="price">
										{item.discountedPrice &&
											(item.discountedPrice !== item.salePrice ? (
												<>
													<p>
														<span className="price-text">Rp</span>
														<span>{item.discountedPrice}</span>
													</p>
													<p className="second-price">
														<span>Rp {item.salePrice}</span>
													</p>
												</>
											) : (
												<p>
													<span className="price-text">Rp</span>
													<span>{item.salePrice}</span>
												</p>
											))}
									</div>
								</div>
								<div className="new-or-discount">
									{item.discountPercent !== 0 && item.discountedPrice && (
										<span className="discount">-{item.discountPercent}%</span>
									)}
									{item.isNew && item.discountPercent == 0 && (
										<span className="new">New</span>
									)}
								</div>
								<NavLink
									to={`/product/${item.id}`}
									className={` ${modal === item.id ? "disable-hover" : ""}`}
								>
									<div
										className={` ${
											modal === item.id
												? "disable-hover"
												: "hover-effect-overlay"
										}`}
									>
										<div
											className="hover-effect"
											onClick={(e) => handleProductDetail(e)}
										>
											<button
												className="card-btn"
												onClick={() => handleAddToCard(item)}
											>
												Add to cart
											</button>
											<ul>
												<li className="share">
													<div className="share-icon-text">
														<img
															src={SvgIcon1}
															alt="icon"
															onClick={() =>
																handleSocialMediaShare(
																	`http://localhost:5173/${id}`
																)
															}
														/>{" "}
														Share
													</div>
													<ul className="social-icons">
														<li>
															<i
																className="fa-brands fa-instagram"
																onClick={(e) => handleClickSocialIcon(item, e)}
															></i>
														</li>
														<li>
															<i
																className="fa-brands fa-linkedin"
																onClick={(e) => handleClickSocialIcon(item, e)}
															></i>
														</li>
														<li>
															<i
																className="fa-brands fa-whatsapp"
																onClick={(e) => handleClickSocialIcon(item, e)}
															></i>
														</li>
													</ul>
												</li>
												<li onClick={() => handleClickLike(item)}>
													{likedProducts.some(
														(product) => product.id === item.id
													) ? (
														<i className="fa-solid fa-heart"></i>
													) : (
														<img src={SvgIcon3} alt="icon" />
													)}
													{likedProducts.some(
														(product) => product.id === item.id
													)
														? "Unlike"
														: "Like"}
												</li>
											</ul>
										</div>
									</div>
								</NavLink>
								{modal === item.id && (
										<Modal
										itemId={modal}
										onClose={() => setModal(null)}
										isModal={openModal}
										like={likeClicked}
										card={addCard}
									/>
								)}
							</div>
						))}
					{isProductDetail &&
						((relatedData?.data?.length || 0) > 4 ? (
							<div className="show">
								<button onClick={showRelatedProducts}>Show More</button>
							</div>
						) : (
							<></>
						))}
				</div>
			</div>
		</div>
	);
};
export default ProductCard;
