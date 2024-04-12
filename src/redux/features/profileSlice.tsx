import {
	combineReducers,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const baseURL = `${import.meta.env.VITE_APP_BASE_URL}`;

export const fetchProfile = createAsyncThunk(
	"fetchProfile",
	async (id: string | null) => {
		const res = await axios.get(
			`${baseURL}/ApplicationUser/${id}`
		);

		return res.data;
	}
);

export const deleteProfile = createAsyncThunk(
	"deleteProfile",
	async (userName: string | undefined, { rejectWithValue }) => {
		try {
			const res = await axios.put(
				`${baseURL}/ApplicationUser/DeleteUser`,
				userName,
				{
					headers: {
						accept: "*/*",
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const updateProfile = createAsyncThunk(
	"updateProfile",
	async (state: any) => {
		try {
			const res = await axios.put(
				`${baseURL}/ApplicationUser/UpdateUser`,
				state,
				{
					headers: {
						accept: "*/*",
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			return res.data;
		} catch (error) {
			throw error;
		}
	}
);

export const resetPassword = createAsyncThunk(
	"resetPassword",
	async (statePassword: any, { rejectWithValue }) => {
		try {
			const res = await axios.put(
				`${baseURL}/ApplicationUser/ChangePassword`,
				statePassword,
				{
					headers: {
						accept: "*/*",
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

interface profileState {
	data: {
		email: string;
		firstName: string;
		userName: string;
		lastName: string;
		id: number | string;
		isSuccess: boolean;
		message: string;
	};
	status: string;
	error: null | undefined | string;
}

const initialState: profileState = {
	data: {
		email: "",
		firstName: "",
		userName: "",
		lastName: "",
		id: "",
		isSuccess: false,
		message: "",
	},
	status: "idle",
	error: null,
};

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProfile.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProfile.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchProfile.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const deleteProfileSlice = createSlice({
	name: "deleteProfile",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(deleteProfile.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteProfile.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(deleteProfile.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const updateProfileSlice = createSlice({
	name: "updateProfile",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateProfile.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const resetPasswordSlice = createSlice({
	name: "resetPassword",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(resetPassword.pending, (state) => {
				state.status = "loading";
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

const rootProfileReducer = combineReducers({
	profile: profileSlice.reducer,
	profileDelete: deleteProfileSlice.reducer,
	profileUpdate: updateProfileSlice.reducer,
	resetPassword: resetPasswordSlice.reducer,
});

export default rootProfileReducer;
