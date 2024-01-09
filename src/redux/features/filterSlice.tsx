import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductTypes } from "../../types";

export const fetchCategory = createAsyncThunk(
	"data/fetchCategory",
	async () => {
		const res = await axios.get(
			`http://immutable858-001-site1.atempurl.com/api/Category/getAll`
		);
		return res.data;
	}
);

export const fetchTags = createAsyncThunk(
	"data/fetchtags",
	async () => {
		const res = await axios.get(
			`http://immutable858-001-site1.atempurl.com/api/Tag/getAll`
		);
		return res.data;
	}
);

export const fetchSizes = createAsyncThunk(
	"data/fetchSizes",
	async () => {
		const res = await axios.get(
			`http://immutable858-001-site1.atempurl.com/api/Size/getAll`
		);
		return res.data;
	}
);

export const fetchColors = createAsyncThunk(
	"data/fetchColors",
	async () => {
		const res = await axios.get(
			`http://immutable858-001-site1.atempurl.com/api/Color/getAll`
		);
		return res.data;
	}
);

interface filterState {
	data: ProductTypes;
	status: string;
	error: null | string | undefined;
}

export const categorySlice = createSlice({
	name: "category",
	initialState: {
		data: {},
		status: "idle",
		error: null,
	} as filterState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategory.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCategory.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchCategory.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const tagSlice = createSlice({
	name: "tag",
	initialState: {
		data: {},
		status: "idle",
		error: null,
	} as filterState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTags.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchTags.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchTags.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const sizeSlice = createSlice({
	name: "size",
	initialState: {
		data: {},
		status: "idle",
		error: null,
	} as filterState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSizes.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchSizes.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchSizes.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const colorSlice = createSlice({
	name: "size",
	initialState: {
		data: {},
		status: "idle",
		error: null,
	} as filterState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchColors.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchColors.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchColors.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

const filterRootReducer=combineReducers({
    categories:categorySlice.reducer,
    tags:tagSlice.reducer,
	sizes:sizeSlice.reducer,
	colors:colorSlice.reducer
})

export default filterRootReducer

