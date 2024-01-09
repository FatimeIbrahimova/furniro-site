import { NavLink, useNavigate } from "react-router-dom";
import SameSection from "../../components/SameSection";
import "./style.scss";
import { RegisterSchema } from "../../schema/FormSchema";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
	clearRegisterError,
	postRegister,
} from "../../redux/features/registerSlice";
import { useState } from "react";


const Register: React.FC = () => {
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const navigate = useNavigate();

	const [errMsg, seterror] = useState("");

	const { handleChange, values, handleSubmit, errors, touched } =
		useFormik({
			initialValues: {
				userName: "",
				firstName: "",
				lastName: "",
				email: "",
				password: "",
			},
			validationSchema: RegisterSchema,
			onSubmit: (values) => {
				dispatch(postRegister(values)).then((confirm) => {
					if (confirm.meta.requestStatus === "rejected") {
						seterror(
							confirm?.payload?.response?.data?.Message || "An error occurred"
						); 
					} else if (confirm.meta.requestStatus === "fulfilled") {
						alert("Register Completed")
						navigate("/login");
						seterror("");
					}
				});
			},
		});


	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(clearRegisterError());
		handleChange(e);
		seterror("");
	};

	return (
		<div className="register">
			<SameSection title1="Register" title2="Register" />
			<div className="register-section">
				<div className="register-form">
					<form action="" onSubmit={handleSubmit}>
						<h2>Sign up</h2>
						<div className="form-wrapper">
							<div className="form-container">
								<div className="userName-firstName form-wrapper-inputs">
									<div className="form">
										<label>userName</label>
										<div>
											<input
												type="text"
												onChange={(e)=>handleInputChange(e)}
												value={values.userName}
												name="userName"
											/>
											<br />
											{errors.userName && touched.userName && (
												<span style={{ color: "red" }}>{errors.userName}</span>
											)}
										</div>
									</div>
									<div className="form">
										<label>First Name</label>
										<div>
											<input
												type="text"
												onChange={(e)=>handleInputChange(e)}
												value={values.firstName}
												name="firstName"
											/>
											<br />
											{errors.firstName && touched.firstName && (
												<span style={{ color: "red" }}>{errors.firstName}</span>
											)}
										</div>
									</div>
								</div>
								<div className="lastName-email form-wrapper-inputs">
									<div className="form">
										<label>Last Name</label>
										<div>
											<input
												type="text"
												name="lastName"
												onChange={(e)=>handleInputChange(e)}
												value={values.lastName}
											/>
											<br />
											{errors.lastName && touched.lastName && (
												<span style={{ color: "red" }}>{errors.lastName}</span>
											)}
										</div>
									</div>
									<div className="form mail">
										<label>Email address</label>
										<div>
											<input
												type="text"
												onChange={(e)=>handleInputChange(e)}
												value={values.email}
												name="email"
											/>
											<br />
											{errors.email && touched.email && (
												<span style={{ color: "red" }}>{errors.email}</span>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="form password">
								<label>Password</label>
								<div>
									<input
										type="password"
										onChange={(e)=>handleInputChange(e)}
										value={values.password}
										name="password"
									/>
									<br />
									{errors.password && (
										<span style={{ color: "red" }}>{errors.password}</span>
									)}
								</div>
							</div>
						</div>
						<div className="btn-wrapper">
							<span className="error-msg">{errMsg && errMsg}</span>
							<button type="submit">Sign up</button>
							<h3>
								Already have an account?
								<NavLink to="/login">
									<span>Login</span>
								</NavLink>
							</h3>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
