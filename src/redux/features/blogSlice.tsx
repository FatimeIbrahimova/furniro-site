import {
	combineReducers,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { blogTypes } from "../../types";

const baseURL = `${import.meta.env.VITE_APP_BASE_URL}`;

export const fetchBlog = createAsyncThunk(
	"fetchBlog",
	async ({
		page,
		count,
		value,
		categoryId,
	}: {
		page: number;
		count: number;
		value?: string;
		categoryId?: number | string;
	}) => {
		let url = `${baseURL}/Blog?Page=${page}&ShowMore.Take=${count}`;
		if (value) {
			url += `&Prompt=${value}`;
		}
		if (categoryId) {
			url += `&CategoryId=${categoryId}`;
		}
		const res = await axios.get(url);
		return res.data;
	}
);

export const fetchRecentPosts = createAsyncThunk(
	"fetchRecentPosts",
	async () => {
		const res = await axios.get(
			`${baseURL}/Blog/recent-posts`
		);
		return res.data;
	}
);

export const fetchBlogCategories = createAsyncThunk(
	"fetchCategories",
	async () => {
		const res = await axios.get(
			`${baseURL}/Blog/blog-categories`
		);
		return res.data;
	}
);

interface BlogState {
	data: blogTypes[];
	status: string;
	error: string | null | undefined;
}

const initialState: BlogState = {
	data: [],
	status: "idle",
	error: null,
};

const blogSlice = createSlice({
	name: "blog",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBlog.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchBlog.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchBlog.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

const recentPostsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecentPosts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchRecentPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchRecentPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

const blogCategorySlice = createSlice({
	name: "blog",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBlogCategories.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchBlogCategories.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchBlogCategories.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

const rootBlogReducer = combineReducers({
	blog: blogSlice.reducer,
	posts: recentPostsSlice.reducer,
	categories: blogCategorySlice.reducer,
});

export default rootBlogReducer;
