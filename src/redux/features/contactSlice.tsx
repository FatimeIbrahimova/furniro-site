import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const postContact = createAsyncThunk(
	"postContact",
	async (values: {
	  name: string;
	  email: string;
	  subject: string;
	  message: string;
	  userId:string | null,
	  Authorization:string
	}) => {
	  const res = await axios.post(
		"https://immutable858-001-site1.atempurl.com/api/ContactMessage",
		values
	  );
  
	  return res.data;
	}
  );
  
  export const fetchContactInfo=createAsyncThunk(
	"fetchContact",
	async()=>{
		const res=await axios.get(
			`https://immutable858-001-site1.atempurl.com/api/Contact`
		)
		return res.data
		
	}
  )

interface contactState {
    data:[];
    status:string;
    error:null | undefined | string;
}
 

const initialState:contactState = {
	data: [],
	status: "idle",
	error: null,
};

export const contactSlice = createSlice({
	name: "contact",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
        .addCase(postContact.pending, (state) => {
			state.status = "loading";
		})
        .addCase(postContact.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.data = action.payload; 
			
        })
        .addCase(postContact.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
	},
});

export const contactInfoSlice = createSlice({
	name: "contactInfo",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
        .addCase(fetchContactInfo.pending, (state) => {
			state.status = "loading";
		})
        .addCase(fetchContactInfo.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.data = action.payload; 
			
        })
        .addCase(fetchContactInfo.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
	},
});

const rootContactReducer = combineReducers({
	postContact: contactSlice.reducer,
	fetchContact: contactInfoSlice.reducer,
});

export default rootContactReducer;

