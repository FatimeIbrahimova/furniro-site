import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postLogin = createAsyncThunk(
    "postLogin",
    async (values: {
      userName: string;
      password: string;
    },{rejectWithValue}) => {
      try {
        const res = await axios.post(
          "http://immutable858-001-site1.atempurl.com/api/ApplicationUser/Login",
          values
        );
  
        console.log("Response Data:", res.data);
  
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
            console.log("payload",action.payload);
            
			
        })
        .addCase(postLogin.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            console.log( state.error);
            
        })
        .addCase(clearLoginError, (state) => {
          state.error = null; 
        });
	},
});

export const clearLoginError = createAction('login/clearError');
export default loginSlice.reducer