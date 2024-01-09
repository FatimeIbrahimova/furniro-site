import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import Features from "../../components/Features";
import SameSection from "../../components/SameSection";
import "./style.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchCountries,
	fetchProvinces,
	postCheckout,
} from "../../redux/features/checkoutSlice";
import { RootState } from "../../redux";
import { useFormik } from "formik";
import { CheckoutSchema } from "../../schema/FormSchema";
import Swal from "sweetalert2";

const Checkout = () => {
	const [orderInfo, setOrderInfo] = useState<boolean>(false);
	const [circleClicked, setCircleClicked] = useState<boolean>(false);
	const [bankInfo, setBankInfo] = useState<boolean>(false);
	const [bankCircle, setBankCircle] = useState<boolean>(false);
	const [cashInfo, setCashInfo] = useState<boolean>(false);
	const [cashCircle, setCashCircle] = useState<boolean>(false);
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const countries = useSelector(
		(state: RootState) => state.checkoutPage.country.data
	);
	const provinces = useSelector(
		(state: RootState) => state.checkoutPage.province.data
	);

	const id = countries?.[0]?.id;
	const provinceId = provinces?.[0]?.id;

	const [selectedCountryId, setSelectedCountryId] = useState(id);
	const [selectedProvinceId, setSelectedProvinceId] = useState(provinceId);

	useEffect(() => {
		dispatch(fetchCountries());
	}, []);
	useEffect(() => {
		if (countries && countries.length > 0) {
			setSelectedCountryId(countries[0].id);
		}
	}, [countries]);
	useEffect(() => {
		if (provinces && provinces.length > 0) {
			setSelectedProvinceId(provinces[0].id);
		}
	}, [provinces]);

	useEffect(() => {
		if (id) {
			dispatch(fetchProvinces(id));
		}
	}, [id]);

	useEffect(() => {
		if (selectedCountryId !== undefined && selectedCountryId !== null) {
			dispatch(fetchProvinces(selectedCountryId));
		}
	}, [selectedCountryId]);

	const handleClickCircle = () => {
		setOrderInfo(true);
		setCircleClicked(true);
		setCashInfo(false);
		setCashCircle(false);
		setBankInfo(false);
		setBankCircle(false);
	};

	const handleBankCircle = () => {
		setBankInfo(true);
		setBankCircle(true);
		setCashInfo(false);
		setCashCircle(false);
		setOrderInfo(false);
		setCircleClicked(false);
	};

	const handleCashCircle = () => {
		setCashInfo(true);
		setCashCircle(true);
		setBankCircle(false);
		setBankInfo(false);
		setOrderInfo(false);
		setCircleClicked(false);
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);

	const [errMsg, seterror] = useState("");
	const userId = localStorage.getItem("userId");

	//formik
	const {
		handleChange,
		values,
		handleSubmit,
		errors,
		resetForm,
		touched,
		setFieldValue,
	} = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			companyName: "",
			streetAddress: "",
			city: "",
			zipcode: "",
			phone: "",
			additionalInfo: "",
			emailAddress: "",
			appUserId: userId,
			countryId: selectedCountryId,
			provinceId: selectedProvinceId,
		},
		validationSchema: CheckoutSchema,
		onSubmit: (values) => {
			dispatch(postCheckout(values)).then((confirm) => {
				if (confirm.meta.requestStatus === "rejected") {
					seterror(
						confirm?.payload?.response?.data?.Message || "An error occurred"
					);
					alert(confirm?.payload?.response?.data?.Message || errMsg);
				} else if (confirm.meta.requestStatus === "fulfilled") {
					Swal.fire("Checkout Completed!");
					seterror("");
					resetForm();
				}
			});
		},
	});
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(e);
	};
	useEffect(() => {
		if (selectedCountryId !== null && selectedCountryId !== undefined) {
			dispatch(fetchProvinces(selectedCountryId));
			setFieldValue("countryId", selectedCountryId);
		}
	}, [selectedCountryId]);

	useEffect(() => {
		if (selectedProvinceId !== null && selectedProvinceId !== undefined) {
			setFieldValue("provinceId", selectedProvinceId);
		}
	}, [selectedProvinceId]);

	return (
		<div className="checkout-page">
			<SameSection title1="Checkout" title2="Checkout" />
			<div className="checkout-section">
				<div className="checkout-section-container">
					<form action="" onSubmit={handleSubmit}>
						<div className="billing-details">
							<div className="form-container">
								<h2>Billing details</h2>
								<div className="name_and_surname">
									<div>
										<label>First Name</label>
										<input
											type="text"
											placeholder=""
											onChange={(e) => handleInputChange(e)}
											value={values.firstName}
											name="firstName"
										/>
										{errors.firstName && touched.firstName && (
											<span style={{ color: "red" }} className="err-msg">
												{errors.firstName}
											</span>
										)}
									</div>

									<div>
										<label>Last Name</label>
										<input
											type="text"
											placeholder=""
											onChange={(e) => handleInputChange(e)}
											value={values.lastName}
											name="lastName"
										/>
										{errors.lastName && touched.lastName && (
											<span style={{ color: "red" }} className="err-msg">
												{errors.lastName}
											</span>
										)}
									</div>
								</div>
								<div>
									<label>Company Name (Optional)</label>
									<input
										type="text"
										placeholder=""
										onChange={(e) => handleInputChange(e)}
										value={values.companyName}
										name="companyName"
									/>
								</div>
								<div>
									<label>Country / Region</label>
									<select
										onChange={(e) => {
											const selectedId = parseInt(e.target.value, 10);
											setSelectedCountryId(selectedId);
										}}
									>
										{countries?.map((item) => (
											<option key={item.id} value={item.id}>
												{item.countryName}
											</option>
										))}
									</select>
								</div>
								<div>
									<label>Street address</label>
									<input
										type="text"
										placeholder=""
										onChange={(e) => handleInputChange(e)}
										value={values.streetAddress}
										name="streetAddress"
									/>
									{errors.streetAddress && touched.streetAddress && (
										<span style={{ color: "red" }} className="err-msg">
											{errors.streetAddress}
										</span>
									)}
								</div>
								<div>
									<label>Town / City</label>
									<input
										type="text"
										placeholder=""
										onChange={(e) => handleInputChange(e)}
										value={values.city}
										name="city"
									/>
									{errors.city && touched.city && (
										<span style={{ color: "red" }} className="err-msg">
											{errors.city}
										</span>
									)}
								</div>
								<div>
									<label>Province</label>
									<select
										onChange={(e) => {
											const selectedProvinceId = parseInt(e.target.value, 10);
											setSelectedProvinceId(selectedProvinceId);
										}}
									>
										{provinces?.map((item) => (
											<option key={item.id} value={item.id}>
												{item.provinceName}
											</option>
										))}
									</select>
								</div>
								<div>
									<label>ZIP code</label>
									<input
										type="text"
										placeholder=""
										onChange={(e) => handleInputChange(e)}
										value={values.zipcode}
										name="zipcode"
									/>
									{errors.zipcode && touched.zipcode && (
										<span style={{ color: "red" }} className="err-msg">
											{errors.zipcode}
										</span>
									)}
								</div>
								<div>
									<label>Phone</label>
									<input
										type="text"
										placeholder=""
										onChange={(e) => handleInputChange(e)}
										value={values.phone}
										name="phone"
									/>
									{errors.phone && touched.phone && (
										<span style={{ color: "red" }} className="err-msg">
											{errors.phone}
										</span>
									)}
								</div>
								<div>
									<label>Email address</label>
									<input
										type="text"
										placeholder=""
										onChange={(e) => handleInputChange(e)}
										value={values.emailAddress}
										name="emailAddress"
									/>
									{errors.emailAddress && touched.emailAddress && (
										<span style={{ color: "red" }} className="err-msg">
											{errors.emailAddress}
										</span>
									)}
								</div>
								<div>
									<input
										type="text"
										placeholder="Additional information"
										className="additional-info"
										onChange={(e) => handleInputChange(e)}
										value={values.additionalInfo}
										name="additionalInfo"
									/>
									{errors.additionalInfo && touched.additionalInfo && (
										<span style={{ color: "red" }} className="err-msg">
											{errors.additionalInfo}
										</span>
									)}
								</div>
							</div>
						</div>
						<div className="order">
							<div className="order-context">
								<div className="order-context_titles">
									<h2>Product</h2>
									<h2>Subtotal</h2>
								</div>
								<div className="product">
									<h3 className="product-name">
										Asgaard sofa{" "}
										<span>
											X <span>100</span>
										</span>
									</h3>
									<div>
										<span>
											Rs. <span>250,000.00</span>
										</span>
									</div>
								</div>
								<div className="product">
									<h3>Subtotal</h3>
									<div>
										<span>
											Rs. <span>250,000.00</span>
										</span>
									</div>
								</div>
								<div className="product">
									<h3>Total</h3>
									<div>
										<span className="total-price">
											Rs. <span>250,000.00</span>
										</span>
									</div>
								</div>
								<div className="line"></div>
								<div className="order-context_bank-transfer">
									<div className="checkboxs">
										<div className="checkbox">
											<div
												className={`circle ${
													circleClicked ? "circle-active" : ""
												}`}
												onClick={handleClickCircle}
											></div>
											<h3 className={` ${circleClicked ? "title-active" : ""}`}>
												Direct Bank Transfer
											</h3>
										</div>
										{orderInfo && (
											<p className="payment-info">
												Make your payment directly into our bank account. Please
												use your Order ID as the payment reference. Your order
												will not be shipped until the funds have cleared in our
												account.
											</p>
										)}
										<div className="checkbox">
											<div
												className={`bank-circle ${
													bankCircle ? "circle-active" : ""
												}`}
												onClick={handleBankCircle}
											></div>
											<h3 className={` ${bankCircle ? "title-active" : ""}`}>
												Direct Bank Transfer
											</h3>
										</div>
										{bankInfo && (
											<p className="bank-text text">
												Bank ipsum dolor sit, amet consectetur adipisicing elit.
												Recusandae tempora dignissimos eligendi reprehenderit
												doloribus illum! Harum minima suscipit voluptatem natus.
											</p>
										)}
										<div className="checkbox">
											<div
												className={`cash-circle ${
													cashCircle ? "circle-active" : ""
												}`}
												onClick={handleCashCircle}
											></div>
											<h3 className={` ${cashCircle ? "title-active" : ""}`}>
												Cash On Delivery
											</h3>
										</div>
										{cashInfo && (
											<p className="cash-text text">
												Cash ipsum dolor sit amet consectetur adipisicing elit.
												Ex expedita similique excepturi placeat, sunt obcaecati
												voluptatem voluptas sit repellat provident!
											</p>
										)}
									</div>
									<p>
										Your personal data will be used to support your experience
										throughout this website, to manage access to your account,
										and for other purposes described in our{" "}
										<span className="privacy-span">privacy policy.</span>
									</p>
									<div className="order-btn">
										<button type="submit">Place order</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<Features />
		</div>
	);
};

export default Checkout;
