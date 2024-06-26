import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = `${import.meta.env.VITE_APP_BASE_URL}`;

export const postLogin = createAsyncThunk(
    "postLogin",
    async (values: {
      userName: string;
      password: string;
    },{rejectWithValue}) => {
      try {
        const res = await axios.post(
          `${baseURL}/ApplicationUser/Login`,
          values
        );
  
        return res.data;
      } catch (error) {
        return rejectWithValue(error)

      }
    }
  );
  

interface loginState {
  data: {
    userId: string;
    jwtToken: string;
    refreshToken:string;
  };
    status:string;
    error:null | undefined | string;
}
 

const initialState:loginState = {
	data: {userId:"",jwtToken:"",refreshToken:""},
	status: "idle",
	error: null,
};


export const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
        .addCase(postLogin.pending, (state) => {
			state.status = "loading";
		})
        .addCase(postLogin.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.data = action.payload; 
            
			
        })
        .addCase(postLogin.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
           
            
        })
        .addCase(clearLoginError, (state) => {
          state.error = null; 
        });
	},
});

export const clearLoginError = createAction('login/clearError');
export default loginSlice.reducer