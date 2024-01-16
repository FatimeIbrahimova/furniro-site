import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import SameSection from "../../components/SameSection";
import {
	ResetPasswordSchema,
	forgetPasswordSchema,
	otpSchema,
} from "../../schema/FormSchema";
import "./style.scss";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
	postEmailForgetPassword,
	postOtpConfirm,
	postResetPassword,
} from "../../redux/features/forgetPasswordSlice";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const [otpCode, setOtpCode] = useState(false);
	const [resetPsw, setResetPsw] = useState(false);
	const [enterEmail, setEnterEmail] = useState(true);
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const {
		handleChange,
		values,
		handleSubmit,
		errors,
		touched,
		resetForm,
		setValues,
	} = useFormik({
		initialValues: {
			email: otpCode || resetPsw ? email : "",
			otpToken: "",
			newPassword: "",
			repeatNewPassword: "",
		},
		validationSchema: otpCode
			? otpSchema
			: enterEmail
			? forgetPasswordSchema
			: resetPsw
			? ResetPasswordSchema
			: null,
		onSubmit: (values) => {
			if (otpCode) {
				dispatch(postOtpConfirm(values)).then((confirm) => {
					if (confirm.meta.requestStatus === "rejected") {
						alert(confirm.payload.response.data.Message);
					} else if (confirm.meta.requestStatus === "fulfilled") {
						Swal.fire(confirm.payload).then(() => {
							setOtpCode(false);
							setResetPsw(true);
						});
						resetForm();
					}
				});
			} else if (enterEmail) {
				dispatch(postEmailForgetPassword(values)).then((confirm) => {
					if (confirm.meta.requestStatus === "rejected") {
						alert(confirm?.payload?.response?.data?.Message);
					} else if (confirm.meta.requestStatus === "fulfilled") {
						Swal.fire(confirm?.payload).then(() => {
							setOtpCode(true);
							setEnterEmail(false);
						});
						resetForm();
						setEmail(values.email);
					}
				});
			} else if (resetPsw) {
				dispatch(postResetPassword(values)).then((confirm) => {
					if (confirm.meta.requestStatus === "rejected") {
						alert(confirm?.payload?.response?.data?.Message);
					} else if (confirm.meta.requestStatus === "fulfilled") {
						Swal.fire(confirm?.payload).then(() => {
							navigate("/login");
						});
					}
				});
			}
		},
	});

	useEffect(() => {
		setValues({
			email: otpCode || resetPsw ? email : "",
			otpToken: "",
			newPassword: "",
			repeatNewPassword: "",
		});
	}, [otpCode, email]);

	const handleCancel = () => {
		resetForm();
	};
	return (
		<div className="reset-password">
			<SameSection title1="Password" title2="Password" />
			<div className="reset-password-section">
				<div className="reset-password-form">
					<form onSubmit={handleSubmit}>
						{otpCode && (
							<div className="password-wrapper">
								<h1>Reset your password</h1>
								<span>
									We just sent a 6 digit otp to.Enter that code here to proceed
								</span>

								<div>
									<input
										placeholder="Enter code"
										value={values.otpToken}
										onChange={handleChange}
										name="otpToken"
									/>
									{errors.otpToken && touched.otpToken && (
										<span style={{ color: "red" }}>{errors.otpToken}</span>
									)}
								</div>
								<div className="btn">
									<button type="submit">Confirm</button>
								</div>
							</div>
						)}
						{enterEmail && (
							<>
								<div className="info">
									<i className="fa-solid fa-lock"></i>
									<h4>
										Enter your email address and we'll send you a link to reset
										your password
									</h4>
								</div>
								<div className="form-wrapper">
									<div className="form mail">
										<label>Email address</label>
										<div>
											<input
												type="text"
												placeholder="e.g email@domain.com"
												onChange={handleChange}
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
								<div className="buttons">
									<button type="submit">Submit</button>
									<button type="button" onClick={() => handleCancel()}>
										Cancel
									</button>
								</div>
							</>
						)}
						{resetPsw && (
							<div className="reset-password-wrapper">
								<h1>Reset Password</h1>
								<div>
									<label>New Password</label>
									<input
										type="password"
										onChange={handleChange}
										value={values.newPassword}
										name="newPassword"
									/>
									<br />
									{errors.newPassword && touched.newPassword && (
										<span style={{ color: "red", fontSize: "14px" }}>
											{errors.newPassword}
										</span>
									)}
								</div>
								<div>
									<label>Repeat New Password</label>
									<input
										type="password"
										onChange={handleChange}
										value={values.repeatNewPassword}
										name="repeatNewPassword"
									/>
									<br />
									{errors.repeatNewPassword && touched.repeatNewPassword && (
										<span style={{ color: "red", fontSize: "14px" }}>
											{errors.repeatNewPassword}
										</span>
									)}
								</div>
								<div className="reset-password-btn">
									<button type="submit">Reset Password</button>
								</div>
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
