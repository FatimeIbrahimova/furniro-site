import { NavLink, useNavigate } from "react-router-dom";
import SameSection from "../../components/SameSection";
import "./style.scss";
import { useFormik } from "formik";
import { LoginSchema } from "../../schema/FormSchema";
import { postLogin } from "../../redux/features/loginSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Login: React.FC = () => {
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const data = useSelector((state: RootState) => state.login.data);
	const navigate = useNavigate();
	localStorage.setItem("userId", data.userId);
	localStorage.setItem("token", data.jwtToken);

	const [errMsg, seterror] = useState("");

	const { handleChange, values, handleSubmit, errors, touched } = useFormik({
		initialValues: {
			userName: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			dispatch(postLogin(values)).then((confirm) => {
				if (confirm.meta.requestStatus === "rejected") {
					seterror(
						confirm?.payload?.response?.data?.Message || "An error occurred"
					);
				} else if (confirm.meta.requestStatus === "fulfilled") {
					Swal.fire("Login successfully").then(()=>{
						navigate("/");
						navigate(0)
					})
					seterror("");
				}
			});
		},
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(e);
		seterror("");
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);


	return (
		<div className="login">
			<SameSection title1="login" title2="login" />
			<div className="login-section">
				<div className="login-form">
					<form onSubmit={handleSubmit}>
						<h2>Log in</h2>
						<div className="form-wrapper">
							<div className="form mail">
								<label>userName</label>
								<div>
									<input
										type="text"
										onChange={(e) => handleInputChange(e)}
										value={values.userName}
										name="userName"
									/>
									<br />
									{errors.userName && touched.userName && (
										<span style={{ color: "red" }}>{errors.userName}</span>
									)}
								</div>
							</div>
							<div className="form password">
								<div className="labels">
									<label>Password</label>
									<NavLink to="/password">
										<label className="forget-password">Forget Password?</label>
									</NavLink>
								</div>
								<div>
									<input
										type="password"
										onChange={(e) => handleInputChange(e)}
										value={values.password}
										name="password"
									/>
									<br />
									{errors.password && touched.password && (
										<span style={{ color: "red" }}>{errors.password}</span>
									)}
								</div>
							</div>
						</div>
						<div className="btn-wrapper">
							<span className="error-msg">{errMsg && errMsg}</span>
							<button type="submit">Log in</button>
							<h3>
								Don't have an account?
								<NavLink to="/register">
									<span>Register now</span>
								</NavLink>
							</h3>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
