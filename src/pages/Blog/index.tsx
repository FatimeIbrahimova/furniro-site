import SameSection from "../../components/SameSection";
import "./style.scss";
import Svg1 from "../../images/dashicons_admin-users.svg";
import Svg2 from "../../images/uis_calender.svg";
import Svg3 from "../../images/ci_tag.svg";
import SvgSearch from "../../images/akar-icons_search.svg";
import { useEffect, useState } from "react";
import Features from "../../components/Features";
import Pagination from "../../components/Pagination";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import {
	fetchBlog,
	fetchBlogCategories,
	fetchRecentPosts,
} from "../../redux/features/blogSlice";
import Loading from "../../components/Loading";


const Blog: React.FC = () => {
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	//blogs
	const blog = useSelector((state: RootState) => state.blogPage.blog.data);
	const status = useSelector((state: RootState) => state.blogPage.blog.status);
	const statusCategories = useSelector((state: RootState) => state.blogPage.categories.status);
	const statusPosts = useSelector((state: RootState) => state.blogPage.posts.status);
	const blogsData = blog[0]?.blogs;
	
	//recent posts
	const posts = useSelector((state: RootState) => state.blogPage.posts.data);
	//categories
	const categories = useSelector(
		(state: RootState) => state.blogPage.categories.data
	);

	const [value, setValue] = useState("");
	const [categoryId, setCategoryId] = useState<number | undefined>(undefined);


	useEffect(() => {
		dispatch(fetchRecentPosts());
		dispatch(fetchBlogCategories());
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setValue(inputValue);
	};
	useEffect(() => {
		if (value === "") {
			dispatch(fetchBlog({ page: 1, count: 3, value: "", categoryId: "" }));
		} else {
			dispatch(fetchBlog({ page: 1, count: 3, value: value, categoryId: "" }));
		}
	}, [value, dispatch]);

	const handleCategoryClick = (categoryId: number) => {
		setCategoryId(categoryId)
		dispatch(
			fetchBlog({ page: 1, count: 3, value: "", categoryId: categoryId })
		);
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);
	
	return (
		<div className="blog-page">
			<SameSection title1="Blog" title2="Blog" />
			<div className="blog-section">
				<div className="blog-section-container">
					<div className="blog-section-container_leftside">
						{status === "loading" && (
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: "800px",
								}}
							>
								<Loading />
							</div>
						)}

						{blogsData?.map((item) => (
							<div className="blog" key={item.id}>
								<div className="blog-img">
									<img src={item.imageUrls} alt="img"/>
								</div>
								<div className="blog-infos">
									<div className="info">
										<img src={Svg1} alt="img" loading="lazy" />
										<span>{item.adminInfo.roleName}</span>
									</div>
									<div className="info">
										<img src={Svg2} alt="img" />
										<span>{item.createdDate}</span>
									</div>
									<div className="info">
										<img src={Svg3} alt="img" />
										<span>{item.category.categoryName}</span>
									</div>
								</div>
								<div className="blog-desc">
									<h2>{item.header}</h2>
									<p>{item.text}</p>
									<button>Read more</button>
									<div className="line"></div>
								</div>
							</div>
						))}
					</div>
					<div className="blog-section-container_rightside">
						<div className="blog-filter">
							{statusCategories === "succeeded"&& (
								<>
								<div className="blog-filter-search">
								<input
									type="text"
									value={value}
									onChange={(e) => handleChange(e)}
								/>
								<img src={SvgSearch} alt="img" className="icon" />
							</div>
								<h2>Categories</h2>
							<div className="blog-filter-categories">
								{categories?.map((category) => (
									<div
										className="category"
										key={category.id}
										onClick={() => handleCategoryClick(category.id)}
									>
										<h3>{category.categoryName}</h3>
										<span>{category.blogCount}</span>
									</div>
								))}
							</div>
								</>
							)}
						</div>
						{statusPosts === "succeeded" && (
							<>
							<div className="posts">
							<h2>Recent Posts</h2>
							<div className="posts-container">
								{posts?.map((item) => (
									<div className="post" key={item.id}>
										<div className="post-img">
											<img src={item.imageUrls?.[0]} alt="img" loading="lazy" />
										</div>
										<div className="post-info">
											<h3>{item.header}</h3>
											<span>{item.createdDate}</span>
										</div>
									</div>
								))}
							</div>
						</div>
							</>
						)}
					</div>
				</div>
				
					<Pagination  blog={blog} value={value} categoryId={categoryId}/>
			
			</div>
			{status === "failed" && (
				<div className="blog-section-container">Failed</div>
			)}
			<Features />
		</div>
	);
};

export default Blog;
