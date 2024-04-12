import {
	createSlice,
	createAsyncThunk,
} from "@reduxjs/toolkit";
import { gridTypes } from "../../types";
import axios from "axios";

const baseURL = `${import.meta.env.VITE_APP_BASE_URL}`;

export const fetchGrid = createAsyncThunk(
	"data/fetchFrid",
	async () => {
		const res = await axios.get(
			`${baseURL}/Home`
		);
		return res.data;
	}
);

interface dataState {
	data: gridTypes[];
	status: string;
	error: null | string | undefined;
}

export const gridSlice = createSlice({
	name: "grid",
	initialState: {
		data: [],
		status: "idle",
		error: null,
	} as dataState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGrid.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchGrid.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchGrid.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default gridSlice.reducer

