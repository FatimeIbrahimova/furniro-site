import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postRegister = createAsyncThunk(
	"postRegister",
	async (
		values: {
			userName: string;
			firstName: string;
			lastName: string;
			email: string;
			password: string;
		},
		{ rejectWithValue }
	) => {
		try {
			const res = await axios.post(
				"https://immutable858-001-site1.atempurl.com/api/ApplicationUser/CreateUser",
				values
			);

			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

interface registerState {
	data: [];
	status: string;
	error: null | undefined | string;
}

const initialState: registerState = {
	data: [],
	status: "idle",
	error: null,
};

export const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postRegister.pending, (state) => {
				state.status = "loading";
			})
			.addCase(postRegister.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(postRegister.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(clearRegisterError, (state) => {
				state.error = null;
			});
	},
});

export const clearRegisterError = createAction("register/clearError");
export default registerSlice.reducer;
