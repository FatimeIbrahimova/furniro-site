import "./style.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchDescription } from "../../../redux/features/descSlice";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { commentSchema } from "../../../schema/FormSchema";
import {
	deleteReview,
	fetchReview,
	postReview,
} from "../../../redux/features/reviewSlice";
import { fetchProfile } from "../../../redux/features/profileSlice";
import Swal from "sweetalert2";
import { reviewState } from "../../../types";

const AboutProduct = () => {
	const { id } = useParams();
	const [desc, setDesc] = useState<boolean>(true);
	const [addInfo, setAddInfo] = useState<boolean>(false);
	const [review, setReview] = useState<boolean>(false);
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const descData = useSelector((state: RootState) => state.desc.data);
	const reviews: any = useSelector(
		(state: RootState) => state.review.fetchReview.data as reviewState[]
	);
	const [rate, setRate] = useState(1);
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		dispatch(fetchDescription(id));
	}, [id]);

	const [userProfiles, setUserProfiles] = useState<reviewState[]>([]);

	const showDesc = () => {
		setDesc(true);
		setAddInfo(false);
		setReview(false);
	};

	const showAddInfo = () => {
		setAddInfo(true);
		setDesc(false);
		setReview(false);
	};

	const showReview = () => {
		setReview(true);
		setAddInfo(false);
		setDesc(false);
	};

	const {
		handleChange,
		values,
		handleSubmit,
		errors,
		resetForm,
		touched,
		setValues,
	} = useFormik({
		initialValues: {
			text: "",
			productId: id,
			appUserId: userId,
			rate: rate,
		},
		validationSchema: commentSchema,
		onSubmit: (values) => {
			dispatch(postReview(values)).then((confirm) => {
				if (confirm.meta.requestStatus === "rejected") {
					console.log("Confirm: ", confirm);
				} else if (confirm.meta.requestStatus === "fulfilled") {
					Swal.fire("Comment Completed");
					resetForm();
					setRate(1);
				}
			});
		},
	});

	useEffect(() => {
		const fetchUserProfiles = async () => {
			const profiles: any = await Promise.all(
				reviews?.productReviews?.map(async (item: reviewState) => {
					const userProfile = await dispatch(fetchProfile(item.appUserId));
					return { ...item, userProfile };
				}) || []
			);
			setUserProfiles(profiles);
		};

		fetchUserProfiles();
	}, [reviews]);
	useEffect(() => {
		dispatch(fetchReview({ productId: id, count: 100 }));
		dispatch(fetchProfile(userId));
	}, [dispatch, values]);

	const handleDelete = (productId: number, appUserId: number) => {
		const values = {
			id: productId,
			productId: id,
			appUserId: appUserId,
		};
		dispatch(deleteReview(values)).then((confirm) => {
			if (confirm.meta.requestStatus === "fulfilled") {
				Swal.fire(confirm.payload.message).then(() =>
					dispatch(fetchReview({ productId: id, count: 100 }))
				);
			}
		});
	};

	//star
	const handleStarClick = (clickedRate: number) => {
		setRate(clickedRate);
	};

	useEffect(() => {
		setValues({
			text: "",
			productId: id,
			appUserId: userId,
			rate: rate,
		});
	}, [rate]);
	const renderStars = () => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			const className = i <= rate ? "filled-star" : "empty-star";
			stars.push(
				<span key={i} className={className} onClick={() => handleStarClick(i)}>
					&#9734;
				</span>
			);
		}
		return stars;
	};
	

	return (
		<div className="about-product">
			<div className="about-product_title">
				<h2 onClick={showDesc} className={desc ? "active-desc" : ""}>
					Description
				</h2>
				<h2 onClick={showAddInfo} className={addInfo ? "active-info" : ""}>
					Additional Information
				</h2>
				<h2 onClick={showReview} className={review ? "active-review" : ""}>
					Reviews [{reviews.totalReviewCount}]
				</h2>
			</div>
			{desc && (
				<div className="description">
					<div className="description-text_container">
						<p>{descData.introduction}</p>
					</div>
					<div className="description-imgs_container">
						{descData.imageFiles?.map((item: string, index: number) => (
							<div className="img" key={index}>
								<img src={item} alt="img" />
							</div>
						))}
					</div>
				</div>
			)}
			{addInfo && (
				<div className="add-info">
					<div className="container">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
							soluta non dolorum molestias fugiat minus unde? Odio, earum
							cupiditate tenetur, animi laborum quia assumenda alias, adipisci
							hic reprehenderit beatae id.
						</p>
					</div>
				</div>
			)}
			{review && (
				<div className="review">
					<div className="container">
						<div className="container-wrapper">
							<form onSubmit={handleSubmit}>
								<div className="stars">{renderStars()}</div>
								<input
									type="text"
									placeholder="Add a comment"
									value={values.text}
									onChange={handleChange}
									name="text"
								/>
								<br />
								{errors.text && touched.text && (
									<span style={{ color: "red" }}>{errors.text}</span>
								)}
								<div className="submit-comment">
									<button type="submit">Comment</button>
								</div>
								<div className="all-reviews">
									{userProfiles?.map((item: reviewState) => (
										<div className="review-wrapper" key={item.id}>
											<div className="review-wrapper-user">
												<i className="fa-solid fa-user"></i>
												<h2>
													{" "}
													{item.userProfile.payload.firstName}
													{item.userProfile.payload.lastName}
												</h2>
											</div>
											<div className="comment-info">
												<p>{item.text}</p>
												<div className="rate">{item.rate}</div>
											</div>
											{item.appUserId == userId && (
												<div className="delete-btn">
													<button
														onClick={() =>
															handleDelete(item.id, item.userProfile.payload.id)
														}
														type="button"
													>
														Delete
													</button>
												</div>
											)}
										</div>
									))}
								</div>
								{reviews.totalReviewCount === 0 && (
									<p className="no-comment">No comment</p>
								)}
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AboutProduct;
