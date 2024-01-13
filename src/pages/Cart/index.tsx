import Features from "../../components/Features";
import SameSection from "../../components/SameSection";
import "./style.scss";
import DeleteSvg from "../../images/ant-design_delete-filled.svg";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import {
	clearCart,
	fetchCart,
	removeCart,
} from "../../redux/features/cartSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { CartItem, Product } from "../../types";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Cart: React.FC = () => {
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const userId = localStorage.getItem("userId");

	const cart = useSelector((state: RootState) => state.cart.postCart.data);
	const removeCartdata = useSelector(
		(state: RootState) => state.cart.removeCart.data
	);
	const clearAlldata = useSelector(
		(state: RootState) => state.cart.clearAllCart.data
	);
	const fetchCartitems = useSelector(
		(state: RootState) => state.cart.fetchCart.data
	);

	console.log(fetchCartitems);
	

	useEffect(() => {
		dispatch(fetchCart(userId));
	}, [cart, removeCartdata, clearAlldata]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);

	//delete from cart
	const handleRemoveProduct = (product: Product) => {
		const cartItem = {
			productId: product.productId,
			colorId: product.productImages.id,
			userId: userId,
		};

		dispatch(removeCart(cartItem)).then(() => {
			toast.success(removeCartdata?.message || "The product has been removed from the cart", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		});
	};
    console.log(clearAlldata);
	
	const handleClearAll = () => {
		Swal.fire({
			icon: "success",
			title: clearAlldata.message || "Cart cleared",
			showConfirmButton: false,
			timer: 1500,
		});
		dispatch(clearCart(userId))
	};
console.log(fetchCartitems);

	return (
		<div className="cart-page">
			<SameSection title1="Cart" title2="Cart" />
			<div className="product-cart">
				<div className="product-cart-container">
					{fetchCartitems.length > 0 ? (
						<>
							<div className="product-cart_info">
								<div className="product-cart_info-title">
									<div className="container">
										<h2 className="title">Product</h2>
										<h2>Price</h2>
										<div className="quantity_and_subtotal">
											<h2>Quantity</h2>
											<h2>Subtotal</h2>
										</div>
									</div>
								</div>
								<div className="added-products">
									{fetchCartitems?.map((item: CartItem) =>
										item.cartItems?.map((product) => (
											<div className="product" key={product.productId}>
												<div className="img-wrapper">
													<img
														src={product?.productImages?.imageFiles?.[0]}
														alt="img"
														loading="lazy"
													/>
												</div>
												<div className="info-wrapper">
													<h3>{product.productTitle}</h3>
													<span className="product-price">
														Rs.
														<span className="price-span">
															{product.discountedPrice
																? product.discountedPrice
																: product.salePrice}
														</span>
													</span>
													<div className="quantity">{product.count}</div>
													<span>
														Rs.
														<span className="price-span">
															{product.subtotal}
														</span>
													</span>
													<img
														src={DeleteSvg}
														alt="img"
														className="delete-icon"
														onClick={() => handleRemoveProduct(product)}
														loading="lazy"
													/>
												</div>
											</div>
										))
									)}
								</div>
							</div>
							<div className="product-cart_totals">
								<h2>Cart Totals</h2>
								<div className="subtotal">
									<h3>Subtotal </h3>
									<span className="subtotal-span">
										Rs.
										<span className="total-price">
											{fetchCartitems
												?.map((item: CartItem) =>
													item.cartItems?.reduce(
														(sum, product) =>
															sum +
															(product.salePrice ??
																product.discountedPrice ??
																0) *
																product.count,
														0
													)
												)
												.reduce(
													(acc, subtotal) =>
														acc! + parseFloat(subtotal?.toString() ?? "0"),
													0
												)?.toFixed(4)}
										</span>
									</span>
								</div>
								<div className="subtotal">
									<h3>Total</h3>
									<span className="total-span">
										Rs.
										<span className="total-price">
											{fetchCartitems
												?.map((item: CartItem) =>
													item.cartItems?.reduce(
														(sum, product) =>
															sum +
															(product.discountedPrice ??
																product.salePrice ??
																0) *
																product.count,
														0
													)
												)
												.reduce(
													(acc, subtotal) =>
														acc! + parseFloat(subtotal?.toString() ?? "0"),
													0
												)?.toFixed(4)}
										</span>
									</span>
								</div>
								<div className="checkout-btn">
									<NavLink to="/checkout">
										<button>Check Out</button>
									</NavLink>
								</div>
							</div>
						</>
					) : (
						<div className="no-products-message">
							<img
								src="https://cocoa-theme.myshopify.com/cdn/shop/t/5/assets/empty-cart.png?v=124674504766911058681646036893"
								alt="img"
								loading="lazy"
							/>
							<h2>No Items in cart</h2>
							<p>Add items you want to shop</p>
							<NavLink to="/shop">
								<button>Start Shopping</button>
							</NavLink>
						</div>
					)}
				</div>
				{fetchCartitems.length > 1 && (
					<div className="clear-all">
						<button onClick={() => handleClearAll()}>Clear All</button>
					</div>
				)}
			</div>
			<Features />
		</div>
	);
};

export default Cart;
