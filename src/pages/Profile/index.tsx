import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { RootState } from "../../redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
	fetchProfile,
	deleteProfile,
	updateProfile,
	resetPassword,
} from "../../redux/features/profileSlice";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ResetSchema } from "../../schema/FormSchema";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const [resetPw, setResetPw] = useState(false);
	const [profile, setProfile] = useState(true);
	const navigate = useNavigate();
	const profileData = useSelector(
		(state: RootState) => state.profile.profile.data
	);
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();

	const userId = localStorage.getItem("userId");

	const [btn, setBtn] = useState(false);
	useEffect(() => {
		dispatch(fetchProfile(userId));
	}, []);
	const c = profileData.userName;

	const deleteUser = () => {
		dispatch(deleteProfile(c));
		localStorage.removeItem("token")
		localStorage.removeItem("userId")
		alert("User Deleted Successfully");
		navigate("/login");
	};

	const [state, setState] = useState({
		email: "",
		firstName: "",
		userName: "",
		lastName: "",
		id: userId,
	});
	useEffect(() => {
		setState({
			email: profileData?.email,
			firstName: profileData.firstName,
			userName: profileData.userName,
			lastName: profileData.lastName,
			id: userId,
		});
	}, [profileData, userId]);

	const handleInputChange = (e: any) => {
		e.preventDefault();
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const updateUser = () => {
		setBtn(true);
		setProfile(true);
	};

	const saveProfile = async () => {
		await dispatch(updateProfile(state));
		dispatch(fetchProfile(userId));
		alert("Edit Successfully");
		setBtn(false);
	};

	const resetPasswordData = useSelector(
		(state: RootState) => state.profile.resetPassword.data
	);

	const handleResetClick = () => {
		setResetPw(true);
		setProfile(false);
	};

	const handleProfileClick = () => {
		setResetPw(false);
		setProfile(true);
		setBtn(false);
	};

	const [errMsg, seterror] = useState("");
	const { handleChange, values, handleSubmit, errors, resetForm, touched } =
		useFormik({
			initialValues: {
				currentPassword: "",
				newPassword: "",
				repeatNewPassword: "",
				id: userId,
			},
			validationSchema: ResetSchema,
			onSubmit: (values: any) => {
				dispatch(resetPassword(values)).then((confirm) => {
					if (confirm.meta.requestStatus === "rejected") {
						console.log("Confirm: ", confirm);
						seterror(
							confirm?.payload?.response?.data?.Message || "An error occurred"
						);
					} else if (confirm.meta.requestStatus === "fulfilled") {
						resetForm();
						seterror("");
					}
				});
			},
		});
	useEffect(() => {
		if (resetPasswordData.isSuccess) {
			alert(resetPasswordData.message);
			setResetPw(false);
			setProfile(true);
		}
	}, [resetPasswordData.isSuccess]);
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(e);
		seterror("");
	};
	return (
		<div className="profile-page">
			<div className="profile-page-wrapper">
				<div className="profile-page-wrapper-links">
					<ul>
						<li onClick={() => handleProfileClick()}>
							<i className="fa-regular fa-user"></i>Profile
						</li>
						<li onClick={() => updateUser()}>
							{" "}
							<i className="fa-solid fa-user-pen"></i>Edit Profile
						</li>
						<li onClick={() => handleResetClick()}>
							<i className="fa-solid fa-unlock-keyhole"></i>Reset Password
						</li>
						<li onClick={() => deleteUser()}>Logout</li>
					</ul>
					<div className="line"></div>
				</div>
				{profile && (
					<>
						<div className="profile-page-wrapper_profil-info">
							<div className="profile-page-wrapper_profil-info-leftside">
								<div className="profile-page-wrapper_profil-info-leftside-image">
									<img
										src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
										alt="profile-img"
									/>
								</div>
								<h3>
									{profileData.firstName} {profileData.lastName}
								</h3>
								<span className="mail">{profileData.email}</span>
							</div>
							<div className="profile-page-wrapper_profil-info-rightside">
								<div className="input-div">
									<span className="info-title">userName</span>
									<span>:</span>
									{btn ? (
										<input
											className="profile-infos info"
											value={state.userName}
											onChange={(e) => handleInputChange(e)}
											name="userName"
										/>
									) : (
										<h3 className="profile-infos">{profileData.userName}</h3>
									)}
								</div>
								<div className="input-div div2">
									<span className="info-title">firstName</span>
									<span>:</span>
									{btn ? (
										<input
											className="profile-infos info"
											value={state.firstName}
											onChange={(e) => handleInputChange(e)}
											name="firstName"
										/>
									) : (
										<h3 className="profile-infos">{profileData.firstName}</h3>
									)}
								</div>
								<div className="input-div">
									<span className="info-title">lastName</span>
									<span>:</span>
									{btn ? (
										<input
											className="profile-infos info"
											value={state.lastName}
											onChange={(e) => handleInputChange(e)}
											name="lastName"
										/>
									) : (
										<h3 className="profile-infos">{profileData.lastName}</h3>
									)}
								</div>
								<div className="input-div div2">
									<span className="info-title">email</span>
									<span>:</span>
									{btn ? (
										<input
											className="profile-infos info"
											value={state.email}
											onChange={(e) => handleInputChange(e)}
											name="email"
										/>
									) : (
										<h3 className="profile-infos">{profileData.email}</h3>
									)}
								</div>
								<div className="input-div">
									<span className="info-title">Status</span>
									<span>:</span>
									<h3 className="profile-infos">Active</h3>
								</div>
							</div>
						</div>
						<div className={`update-btn ${btn ? "active" : ""}`}>
							<button onClick={() => saveProfile()}>Save Changes</button>
						</div>
					</>
				)}
				{resetPw && (
					<div className="reset-password">
						<form action="" onSubmit={handleSubmit}>
							<div>
								<label>Currrent Password</label>
								<input
									type="password"
									onChange={(e) => handlePasswordChange(e)}
									value={values.currentPassword}
									name="currentPassword"
								/>
								<br />
								{errors.currentPassword && touched.currentPassword && (
									<span className="error-msg">{`${errors.currentPassword}`}</span>
								)}
							</div>
							<div>
								<label>New Password</label>
								<input
									type="password"
									onChange={(e) => handlePasswordChange(e)}
									value={values.newPassword}
									name="newPassword"
								/>
								<br />
								{errors.newPassword && touched.newPassword && (
									<span className="error-msg">{`${errors.newPassword}`}</span>
								)}
							</div>
							<div>
								<label>Repeat New Password</label>
								<input
									type="password"
									onChange={(e) => handlePasswordChange(e)}
									value={values.repeatNewPassword}
									name="repeatNewPassword"
								/>
								<br />
								{errors.repeatNewPassword && touched.repeatNewPassword && (
									<span className="error-msg">{`${errors.repeatNewPassword}`}</span>
								)}
							</div>

							<div className="reset-btn">
								<span className="error-msg">{errMsg && errMsg}</span>
								<button type="submit">Reset</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
