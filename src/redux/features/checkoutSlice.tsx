import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { countryAndProvinceTypes} from "../../types"

export const fetchCountries=createAsyncThunk(
    "fetchCountry",
    async()=>{
        const res=await axios.get(
            `http://immutable858-001-site1.atempurl.com/api/Country`
        )
        return res.data
    }
)

export const fetchProvinces=createAsyncThunk(
    "fetchProvince",
    async(id:number)=>{
        const res=await axios.get(
            `http://immutable858-001-site1.atempurl.com/api/Province/GetRelatedProvince/${id}`
        )
        return res.data
    }
)

export const postCheckout = createAsyncThunk(
    "postCheckout",
    async (values: {
      appUserId: string | null;
      firstName: string;
      lastName: string;
      companyName: string;
      countryId: number | undefined;
      streetAddress: string;
      city: string;
      provinceId: number | undefined;
      zipcode: string;
      phone: string;
      emailAddress: string;
      additionalInfo: string;
    }, {rejectWithValue}) => {
      try {
        const res = await axios.post(
          "http://immutable858-001-site1.atempurl.com/api/Checkout",
          values
        );
        return res.data;
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  );

interface countryState {
    data: countryAndProvinceTypes[]; 
    status: string;
    error: string | null | undefined;
  }
  
  const initialState: countryState = {
    data: [],
    status: "idle",
    error: null,
  };

const countrySlice= createSlice({
    name:"country",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
		builder
			.addCase(fetchCountries.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCountries.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchCountries.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
   

})

const provinceSlice= createSlice({
    name:"province",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
		builder
			.addCase(fetchProvinces.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProvinces.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchProvinces.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
   

})

export const checkoutSlice = createSlice({
	name: "register",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
        .addCase(postCheckout.pending, (state) => {
			state.status = "loading";
		})
        .addCase(postCheckout.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.data = action.payload; 
            
			
        })
        .addCase(postCheckout.rejected, (state, action) => {
            state.status = "failed";
            // state.error = action.error;
            // console.log( action.error.message);
            console.log( {action});
            console.log( {data:state.data});
            
        })
	},
});

const rootCheckoutReducer =combineReducers({
    country:countrySlice.reducer,
    province:provinceSlice.reducer,
    checkout:checkoutSlice.reducer
  })
  
  export default rootCheckoutReducer;