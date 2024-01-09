import SameSection from "../../components/SameSection";
import "./style.scss";
import AddressSvg from "../../images/Vector.svg";
import PhoneSvg from "../../images/bxs_phone.svg";
import TimeSvg from "../../images/bi_clock-fill.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux";
import { useFormik } from "formik";
import { ContactSchema } from "../../schema/FormSchema";
import Features from "../../components/Features";
import { fetchContactInfo } from "../../redux/features/contactSlice";
import Swal from "sweetalert2";
import { ContactInfo } from "../../types";

const Contact: React.FC = () => {
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const info = useSelector(
		(state: RootState) => state.contact.fetchContact.data
	);
	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		dispatch(fetchContactInfo());
	}, []);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);

	const { handleChange, values, handleSubmit, errors, touched,resetForm } = useFormik({
		initialValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
			userId: userId,
		},
		validationSchema: ContactSchema,
		onSubmit: async (values) => {
			try {
				const response = await fetch(
					"http://immutable858-001-site1.atempurl.com/api/ContactMessage",
					{
						method: "POST",
						headers: {
							Accept: "/",
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
						body: JSON.stringify(values),
					}
				);
				if (response.ok) {
					const responseData = await response.json();

					Swal.fire({
						icon: "success",
						title: responseData.message,
						showConfirmButton: false,
						timer: 1500,
					});
					resetForm()
				} else {
					const data = await response.json();
					throw new Error(data.Message || "An error occurred");
				}
			} catch (error) {
				console.error("Error in postContact:", error);
			}
		},
	});

	return (
		<div className="contact-page">
			<SameSection title1="Contact" title2="Contact" />
			<div className="contact-page_contact-form">
				<div className="contact-page_contact-form-title">
					<h3>Get In Touch With Us</h3>
					<p>
						For More Information About Our Product & Services. Please Feel Free
						To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
						Not Hesitate!
					</p>
				</div>
				<div className="container">
					<div className="container-info">
						{info?.map((item: ContactInfo) => (
							<div key={item.id}>
								<div className="address">
									<div>
										<img src={AddressSvg} alt="img" className="address-icon" />
									</div>
									<div>
										<h3>Address</h3>
										<span>{item.address}</span>
									</div>
								</div>
								<div className="address">
									<div>
										<img src={PhoneSvg} alt="img" />
									</div>
									<div>
										<h3>Phone</h3>
										<span>Mobile: {item.mobile}</span>
										<span>Hotline: {item.hotline}</span>
									</div>
								</div>
								<div className="address">
									<div>
										{" "}
										<img src={TimeSvg} alt="img" />
									</div>
									<div>
										<h3>Working Time</h3>
										<span>{item.weekdayWorkingTime}</span>
										<span>{item.weekendWorkingTime}</span>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="container-form">
						<form action="" onSubmit={handleSubmit}>
							<div className="input">
								<label>Your name</label>
								<input
									type="text"
									placeholder="Abc"
									name="name"
									onChange={handleChange}
									value={values.name}
								/>
								<br />
								{errors.name && touched.name && (
									<span style={{ color: "red" }}>{errors.name}</span>
								)}
							</div>
							<div className="input">
								<label>Email address</label>
								<input
									type="text"
									placeholder="Abc@def.com"
									name="email"
									onChange={handleChange}
									value={values.email}
								/>
								<br />
								{errors.email && touched.email && (
									<span style={{ color: "red" }}>{errors.email}</span>
								)}
							</div>
							<div className="input">
								<label>Subject</label>
								<input
									type="text"
									placeholder="This is an optional"
									name="subject"
									onChange={handleChange}
									value={values.subject}
								/>
							</div>
							<div className="input">
								<label>Message</label>
								<input
									type="text"
									placeholder="Hi! i’d like to ask about"
									className="message"
									name="message"
									onChange={handleChange}
									value={values.message}
								/>
								<br />
								{/* <ErrorMessage name="message">
                                {(msg) => (formik.touched.message && <span style={{ color: "red" }}>{msg}</span>)}
								</ErrorMessage> */}
								{errors.message && touched.message && (
									<span style={{ color: "red" }}>{errors.message}</span>
								)}
							</div>
							<div className="submit-btn">
								<button type="submit">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Features />
		</div>
	);
};

export default Contact;
