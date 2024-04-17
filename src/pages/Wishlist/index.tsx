import { NavLink } from "react-router-dom";
import SameSection from "../../components/SameSection";
import { RootState } from "../../redux";
import {
	fetchWishlist,
	removeWishlist,
} from "../../redux/features/wishlistSlice";
import { ProductTypes2 } from "../../types";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const Wishlist = () => {
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const wishlistData: any = useSelector(
		(state: RootState) => state.wishlist.fetchWishlist.data
	);

	const userId = localStorage.getItem("userId");

	const handleRemoveFromWishlist = (product: ProductTypes2) => {
		console.log(product);
		
		const wishlistItem = {
			productId: product.id,
			colorId: product.productImages.id,
			userId: userId,
		};

		dispatch(removeWishlist(wishlistItem)).then(() => {
			toast.success("Product removed from the wishlist!", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			dispatch(fetchWishlist(userId));
		});
	};

	useEffect(() => {
		handleRemoveFromWishlist;
	}, []);
	useEffect(() => {
		dispatch(fetchWishlist(userId));
	}, []);
	const favori = wishlistData?.[0]?.favorites;
	const likedProductss = favori?.map((item: any) => item) || [];

	return (
		<div className="wishlist">
			<SameSection title1="Wishlist" title2="Wishlist" />
			<div className="wishlist-section">
				<div className="wishlist-section-container">
					{likedProductss?.length === 0 ? (
						<div className="no-products-message">
							<img
								src="https://cocoa-theme.myshopify.com/cdn/shop/t/5/assets/empty-cart.png?v=124674504766911058681646036893"
								alt="img"
							/>
							<h4>Nothing found in wishlist!</h4>
							<NavLink to="/shop">
								<button>Start Shopping</button>
							</NavLink>
						</div>
					) : (
						<>
							<div className="wishlist-section-container-title">
								<h1>Product</h1>
								<h1 className="color-title">SubTitle</h1>
								<h1>Price</h1>
							</div>
							<div className="liked-products-wrapper">
								{/* @ts-ignore */}
								{wishlistData?.[0].favorites?.map((item: any) => (
									<div className="liked-product" key={item.id}>
										<div className="liked-product_leftside">
											<i
												className="fa-solid fa-x"
												onClick={() => handleRemoveFromWishlist(item)}
											></i>
											<div className="img_title">
												<div className="liked-product-img">
													<img
														src={item.imageFiles?.[0]}
														alt="img"
													/>
												</div>
												<h2>{item.title}</h2>
											</div>
										</div>
										<div className="subtitle">
											<div
												style={{
													// backgroundColor: item.productImages.colorHexCode,
													width: 55,
													// height: 35,
													// borderRadius: "50%",
												}}
											>{item?.subTitle}</div>
										</div>
										<div className="price">
											{item.discountedPrice
												? item.discountedPrice
												: item.salePrice}
										</div>
										<div className="wishlist-buttons">
											<NavLink to={`/product/${item.id}`}>
												<button>Add To Cart</button>
											</NavLink>
											<button className="delete-btn">X</button>
										</div>
									</div>
								))}
							</div>
							<ToastContainer />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Wishlist;
