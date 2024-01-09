import "./style.scss";
import DeleteSvg from "../../images/Group.svg";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { fetchCart, removeCart } from "../../redux/features/cartSlice";
import { CartItem, Product } from "../../types";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

interface CartSidebarProps {
	close: () => void;
	sidebarMenu: boolean;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ close, sidebarMenu }) => {
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	const fetchCartitems = useSelector(
		(state: RootState) => state.cart.fetchCart.data
	);
	const removeCartdata = useSelector(
		(state: RootState) => state.cart.removeCart.data
	);

	const userId = localStorage.getItem("userId");

	useEffect(() => {
		dispatch(fetchCart(userId));
	}, [removeCartdata]);
	//delete from cart
	const handleRemoveProduct = (product: Product) => {
		const cartItem = {
			productId: product.productId,
			colorId: product.productImages.id,
			userId: userId,
		};

		dispatch(removeCart(cartItem));
	};

	return (
		<>
			<div className="sidebar-overlay" onClick={close}></div>
			<div className={sidebarMenu ? "sidebar active" : "sidebar"}>
				<div className="sidebar-container">
					<div
						className={
							fetchCartitems.length > 0 ? "sidebar-title" : "sidebar-title2"
						}
					>
						<h2 className="desc">Shopping Cart</h2>
						<img src={DeleteSvg} alt="img" onClick={close} loading="lazy" />
					</div>
					{fetchCartitems.length > 0 ? (
						<>
							<div className="sidebar-products">
								{fetchCartitems?.map((item: CartItem,index:number) =>
									item.cartItems?.map((item) => (
										<div className="product" key={index}>
											<NavLink to="/cart">
												<div className="img-wrapper">
													<img
														src={item.productImages.imageFiles[0]}
														alt="img"
													/>
												</div>
												<div className="product-info">
													<h3>{item.productTitle}</h3>
													<div className="count_and_price">
														<span className="count">{item.count}</span>
														<span>X</span>
														<span className="price">
															Rs.
															<span className="price-number">
																{item.discountedPrice
																	? item.discountedPrice
																	: item.salePrice}
															</span>
														</span>
													</div>
												</div>
											</NavLink>
											<div
												className="delete-icon"
												onClick={() => handleRemoveProduct(item)}
											>
												x
											</div>
										</div>
									))
								)}
							</div>
							<div className="products-total-price">
								<h2>Subtotal</h2>
								<span className="total-price">
									Rs.
									<span className="total-price-number">
										{fetchCartitems?.map((item: CartItem) =>
											item.cartItems?.reduce(
												(sum, item) =>
													sum +
													(item.discountedPrice ?? item.salePrice ?? 0) *
														item.count,
												0
											)
										)}
									</span>
								</span>
							</div>
						</>
					) : (
						<div className="empty-card-message">
							<h2>Your cart is currently empty.</h2>
							<NavLink to="/shop">
								<button onClick={close}>Continue Shopping</button>
							</NavLink>
						</div>
					)}
				</div>
				{fetchCartitems.length > 0 && (
					<>
						<div className="line"></div>
						<div className="sidebar-container">
							<div className="sidebar-buttons">
								<NavLink to="/cart">
									<button onClick={close}>Cart</button>
								</NavLink>
								<NavLink to="/checkout">
									<button onClick={close}>Checkout</button>
								</NavLink>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default CartSidebar;
