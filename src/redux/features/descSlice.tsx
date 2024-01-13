import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductTypes } from "../../types";

export const fetchDescription = createAsyncThunk(
	"data/fetchDescription",
	async (id: string | undefined) => {
		const res = await axios.get(
			`https://immutable858-001-site1.atempurl.com/api/UserProduct/getById/Description?Id=${id}`
		);
		return res.data;
	}
);

interface descState {
	data: ProductTypes;
	status: string;
	error: null | string | undefined;
}

export const descSlice = createSlice({
	name: "desc",
	initialState: {
		data: {},
		status: "idle",
		error: null,
	} as descState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDescription.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchDescription.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchDescription.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default descSlice.reducer

