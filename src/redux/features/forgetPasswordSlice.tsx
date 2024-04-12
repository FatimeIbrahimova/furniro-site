import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const baseURL = `${import.meta.env.VITE_APP_BASE_URL}`;

export const postEmailForgetPassword=createAsyncThunk(
    "passwordEmail",
    async (
		values: {
			email: string | undefined;
		},
		{ rejectWithValue }
	) => {
		try {
			const res = await axios.post(
				`${baseURL}/ForgotPassword/SendOTPEmail`,
				values
			);
			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
  )

  export const postOtpConfirm=createAsyncThunk(
    "postOtpConfirm",
    async (
		values: {
			email: string
			otpToken:string
		},
		{ rejectWithValue }
	) => {
		try {
			const res = await axios.post(
				`${baseURL}/ForgotPassword/OtpConfirmation`,
				values
			);
			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
  )

  export const postResetPassword=createAsyncThunk(
    "postResetPassword",
    async (
		values: {
			email: string
			newPassword:string
			repeatNewPassword:string	
		},
		{ rejectWithValue }
	) => {
		try {
			const res = await axios.post(
				`${baseURL}/ForgotPassword/ResetPassword`,
				values
			);
			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
  )



  interface ForgetState{
    data:[]; 
    status: string;
    error: string | null | undefined;
  }
  
  const initialState: ForgetState = {
    data: [],
    status: "idle",
    error: null,
  };

const forgetPasswordSlice= createSlice({
    name:"forgetPassword",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
		builder
			.addCase(postEmailForgetPassword.pending, (state) => {
				state.status = "loading";
			})
			.addCase(postEmailForgetPassword.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(postEmailForgetPassword.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
   

})

const otpConfirmSlice= createSlice({
    name:"otpConfirm",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
		builder
			.addCase(postOtpConfirm.pending, (state) => {
				state.status = "loading";
			})
			.addCase(postOtpConfirm.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(postOtpConfirm.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
   

})

const resetPasswordSlice= createSlice({
    name:"resetPassword",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
		builder
			.addCase(postResetPassword.pending, (state) => {
				state.status = "loading";
			})
			.addCase(postResetPassword.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(postResetPassword.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
   

})




const rootPasswordReducer =combineReducers({
    passwordEmail:forgetPasswordSlice.reducer,
	otpConfirm:otpConfirmSlice.reducer,
	resetPassword:resetPasswordSlice.reducer
  })
  
  export default rootPasswordReducer;