import "./style.scss";
import LogoSvg from "../../images/Meubel House_Logos-05.svg";
import SvgIcon1 from "../../images/mdi_account-alert-outline.svg";
import SvgIcon2 from "../../images/akar-icons_search.svg";
import SvgIcon3 from "../../images/akar-icons_heart.svg";
import SvgIcon4 from "../../images/ant-design_shopping-cart-outlined.svg";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import CartSidebar from "../CartSidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import Search from "../Search";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchCart } from "../../redux/features/cartSlice";

const Navbar = () => {
	const [menuVisibilty, setMenuVisibilty] = useState("");
	const [sidebarMenu, setSidebarMenu] = useState(false);
	const wishlistData = useSelector(
		(state: RootState) => state.wishlist.fetchWishlist.data
	);

	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();

	const userId = localStorage.getItem("userId");

	const fetchCartitems = useSelector(
		(state: RootState) => state.cart.fetchCart.data
	);
	useEffect(() => {
		dispatch(fetchCart(userId));
	}, []);
	const handleClick = () => {
		setMenuVisibilty("visible-menu");
	};
	const handleClose = () => {
		setMenuVisibilty("");
		setInputClass("input hidden");
		setFilterSearch("hidden");
		setValue("");
	};

	//sidebar
	const openSidebar = () => {
		setSidebarMenu(true);
		setMenuVisibilty("");
	};
	const closeSidebar = () => {
		setSidebarMenu(false);
	};
	//search
	const [search_input, setInputClass] = useState("search-wrapper hidden");
	const [filterSearch, setFilterSearch] = useState("hidden");
	const [value, setValue] = useState("");

	const handleSearch = () => {
		setInputClass("input visible");
	};

	const token=localStorage.getItem("token")


	return (
		<>
			<div className="nav">
				<div className="nav-container">
					<div className="nav-container_logo">
						<img src={LogoSvg} alt="logo" loading="lazy" />
						<span>Furniro</span>
					</div>
					<div className="nav-container_links">
						<ul>
							<li>
								<NavLink to="/">Home</NavLink>
							</li>
							<li>
								<NavLink to="/shop">Shop</NavLink>
							</li>
							<li>
								<NavLink to="/blog">Blog</NavLink>
							</li>
							<li>
								<NavLink to="/contact">Contact</NavLink>
							</li>
						</ul>
					</div>
					<div className="nav-container_icons">
						<ul>
							{token ? (
								<li>
									<NavLink to="/profile">
										<i className="fa-regular fa-user"></i>
									</NavLink>
								</li>
							) : (
								<li>
									<NavLink to="/login">
										<img src={SvgIcon1} alt="icon" />
									</NavLink>
								</li>
							)}
							<li>
								<NavLink to="#">
									<img
										src={SvgIcon2}
										alt="icon"
										onClick={() => handleSearch()}
									/>
								</NavLink>
							</li>
							<li className="basket_wishlist">
								<NavLink to="/wishlist">
									<img src={SvgIcon3} alt="icon" />
								</NavLink>

								{wishlistData?.map((item: any,index:number) => (
									<span className="basket_wishlist-count" key={index}>
										{item?.favorites.length}
									</span>
								))}
							</li>
							<li onClick={openSidebar} className="basket_wishlist">
								<img src={SvgIcon4} alt="icon" loading="lazy" />
								{fetchCartitems.length > 0 && (
									<span className="basket_wishlist-count">
										{fetchCartitems.length}
									</span>
								)}
							</li>
						</ul>
					</div>
					<div className="hamburger-icon">
						<i className="fa-solid fa-bars" onClick={handleClick}></i>
					</div>
					<div className={`menu ${menuVisibilty}`}>
						<i className="fa-solid fa-x" onClick={handleClose}></i>
						<ul className="links">
							<li onClick={handleClose}>
								<NavLink to="/">Home</NavLink>
							</li>
							<li onClick={handleClose}>
								<NavLink to="/shop">Shop</NavLink>
							</li>
							<li onClick={handleClose}>
								<NavLink to="/blog">Blog</NavLink>
							</li>
							<li onClick={handleClose}>
								<NavLink to="/contact">Contact</NavLink>
							</li>
						</ul>
						<ul className="icons">
							<li onClick={handleClose}>
								<NavLink to="#">
									<img src={SvgIcon1} alt="icon" />
								</NavLink>
							</li>
							<li onClick={handleClose}>
								<NavLink to="#">
									<img src={SvgIcon2} alt="icon" />
								</NavLink>
							</li>
							<li onClick={handleClose}>
								<NavLink to="/wishlist">
									<img src={SvgIcon3} alt="icon" />
								</NavLink>
							</li>
							<li onClick={openSidebar}>
								<NavLink to="/#">
									<img src={SvgIcon4} alt="icon" />
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
				<Search
					search_input={search_input}
					handleClose={handleClose}
					filterSearch={filterSearch}
					setFilterSearch={setFilterSearch}
					value={value}
					setValue={setValue}
				/>
				{sidebarMenu && (
					<CartSidebar close={closeSidebar} sidebarMenu={sidebarMenu} />
				)}
			</div>
		</>
	);
};

export default Navbar;
