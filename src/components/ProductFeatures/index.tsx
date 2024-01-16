import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { useEffect, useState } from "react";
import "./style.scss";
import { postCart } from "../../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchDataDetail, setColorIds } from "../../redux/features/dataSlice";
import Loading from "../Loading";
import {
	fetchWishlist,
	postWishlist,
} from "../../redux/features/wishlistSlice";
import { toast } from "react-toastify";

const ProductFeatures = ({
	itemId,
	isModal,
	onColorChange,
	card,
	like,
}: any) => {
	const [count, setCount] = useState(1);
	const data = useSelector((state: RootState) => state.data.detailData.data);
	const navigate = useNavigate();
	const location = useLocation();
	const isProductDetailPage = location.pathname.includes("/product/");

	const status = useSelector(
		(state: RootState) => state.data.detailData.status
	);
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const { id } = useParams();
	const [colorId, setColorId] = useState(data?.colors?.[0]?.id);

	useEffect(() => {
		if (itemId) {
			dispatch(fetchDataDetail(itemId));
		}
	}, [dispatch, itemId]);

	const [selectedSize, setSelectedSize] = useState(data?.sizes?.[0]?.sizeName);
	const [selectedColor, setSelectedColor] = useState(
		data?.colors?.[0]?.colorHexCode
	);

	useEffect(() => {
		setSelectedColor(data?.colors?.[0]?.colorHexCode);
		setSelectedSize(data?.sizes?.[0]?.sizeName);
	}, [data?.colors]);

	const decreaseCount = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	const increaseCount = () => {
		setCount(count + 1);
	};

	const userId = localStorage.getItem("userId");
	const token = localStorage.getItem("token");

	const handleAddToCart = () => {
		if (!token) {
			navigate("/login");
		} else {
			const cartItem = {
				productId: id || itemId,
				colorId: colorId !== undefined ? colorId : data?.colors?.[0]?.id,
				userId: userId,
				count: count,
			};

			dispatch(postCart(cartItem)).then((confirm) => {
				if (confirm.meta.requestStatus === "rejected") {
					alert(confirm?.payload?.response?.data?.Message);
				} else if (confirm.meta.requestStatus === "fulfilled") {
					toast.success("Product added to card!", {
						position: "bottom-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
					navigate("/cart");
				}
			});
			isModal(false);
		}
	};

	const handleAddWishlist = async () => {
		if (!token) {
			navigate("/login");
		} else {
			const wishlistItem = {
				productId: itemId,
				colorId: colorId !== undefined ? colorId : data?.colors?.[0]?.id,
				userId: Number(userId),
			};

			dispatch(postWishlist(wishlistItem)).then((confirm) => {
				if (confirm.meta.requestStatus === "rejected") {
					alert(confirm?.payload?.response?.data?.Message);
				} else if (confirm.meta.requestStatus === "fulfilled") {
					toast.success("Product added to wishlist!", {
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
				}
			});
			isModal(false);
		}
	};

	const handleSelectColor = (color: {
		id: number;
		colorHexCode: string;
		imageFiles: string[];
	}) => {
		setSelectedColor(color.colorHexCode);
		const colorId = color.id;
		setColorId(colorId);
		dispatch(setColorIds(colorId));
		if (typeof onColorChange === "function") {
			onColorChange(colorId);
		}
	};

	return (
		<div>
			{status === "loading" ? (
				<Loading isModal={isModal} />
			) : (
				<>
					{card && (
						<>
							<h4>Size</h4>
							<div className="all-sizes">
								{Array.isArray(data?.sizes) &&
									data?.sizes.map((size) => (
										<div
											key={size.id}
											className={`size ${
												selectedSize === size.sizeName ? "selected" : ""
											}`}
											onClick={() => setSelectedSize(size.sizeName)}
										>
											<span
												className={`${
													selectedSize === size.sizeName ? "selected" : ""
												}`}
											>
												{size.sizeName}
											</span>
										</div>
									))}
							</div>
						</>
					)}

					{card && (
						<>
							<h4>Color:</h4>
							<span className="color-name" style={{ color: selectedColor }}>
								({selectedColor})
							</span>
							<div className="colors">
								{data?.colors?.map((color) => (
									<div
										className="color"
										style={{ backgroundColor: color.colorHexCode }}
										key={color.id}
										onClick={() => handleSelectColor(color)}
									></div>
								))}
							</div>
						</>
					)}
					{like && (
						<>
							<h4>Color:</h4>
							<span className="color-name" style={{ color: selectedColor }}>
								({selectedColor})
							</span>
							<div className="colors">
								{data?.colors?.map((color) => (
									<div
										className="color"
										style={{ backgroundColor: color.colorHexCode }}
										key={color.id}
										onClick={() => handleSelectColor(color)}
									></div>
								))}
							</div>
						</>
					)}

					{card && (
						<div className="product-buttons">
							<div className="count">
								<span className="decrease-increase" onClick={decreaseCount}>
									-
								</span>
								<span>{count}</span>
								<span className="decrease-increase" onClick={increaseCount}>
									+
								</span>
							</div>
							<NavLink to="">
								<button
									className="add_cart-btn"
									onClick={() => handleAddToCart()}
								>
									Add To Cart
								</button>
							</NavLink>
						</div>
					)}
					{like && (
						<div className="product-buttons">
							<button onClick={() => handleAddWishlist()}>Add Wishlist</button>
						</div>
					)}
					{isProductDetailPage && !card && !like && (
						<>
							<h4>Size</h4>
							<div className="all-sizes">
								{Array.isArray(data?.sizes) &&
									data?.sizes.map((size) => (
										<div
											key={size.id}
											className={`size ${
												selectedSize === size.sizeName ? "selected" : ""
											}`}
											onClick={() => setSelectedSize(size.sizeName)}
										>
											<span
												className={`${
													selectedSize === size.sizeName ? "selected" : ""
												}`}
											>
												{size.sizeName}
											</span>
										</div>
									))}
							</div>
							<h4>Color:</h4>
							<span className="color-name" style={{ color: selectedColor }}>
								({selectedColor})
							</span>
							<div className="colors">
								{data?.colors?.map((color) => (
									<div
										className="color"
										style={{ backgroundColor: color.colorHexCode }}
										key={color.id}
										onClick={() => handleSelectColor(color)}
									></div>
								))}
							</div>
							<div className="product-buttons">
								<>
									<div className="count">
										<span className="decrease-increase" onClick={decreaseCount}>
											-
										</span>
										<span>{count}</span>
										<span className="decrease-increase" onClick={increaseCount}>
											+
										</span>
									</div>
									<NavLink to="">
										<button
											className="add_cart-btn"
											onClick={() => handleAddToCart()}
										>
											Add To Cart
										</button>
									</NavLink>
								</>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default ProductFeatures;
