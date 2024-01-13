import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const token=localStorage.getItem("token")
export const postReview=createAsyncThunk(
    "postReview",
    async (
		values: {
			productId: string | undefined,
            appUserId:string | null,
            rate:number,
            text:string
		},
		{ rejectWithValue }
	) => {
		try {
			const res = await axios.post(
				"https://immutable858-001-site1.atempurl.com/api/Review",
				values,{
					headers: {
						'accept': '*/*',
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					  },
				}
			);
			console.log(res);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
  )

  export const fetchReview = createAsyncThunk(
	"fetchReview",
	async ({productId, count }: { productId: string | undefined; count: number }) => {
		const res = await axios.get(
			`https://immutable858-001-site1.atempurl.com/api/Review/ProductReviews?ProductId=${productId}&ShowMore.Take=${count}`
		);

		return res.data;
	}
);

export const deleteReview = createAsyncThunk(
	"deleteReview",
	async (values:{
		productId: string | undefined,
		id:number,
		appUserId:number,
	}) => {
		const res = await axios.delete(
			"https://immutable858-001-site1.atempurl.com/api/Review",
			{ data: values,headers: {
				'accept': '*/*',
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			  }, }
		);
console.log(res);

		return res.data;
	}
);



  interface ReviewState {
    data:[]; 
    status: string;
    error: string | null | undefined;
  }
  
  const initialState: ReviewState = {
    data: [],
    status: "idle",
    error: null,
  };

const postReviewSlice= createSlice({
    name:"postReview",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
		builder
			.addCase(postReview.pending, (state) => {
				state.status = "loading";
			})
			.addCase(postReview.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(postReview.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
})


const fetchReviewSlice= createSlice({
    name:"fetchReview",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
		builder
			.addCase(fetchReview.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchReview.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchReview.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
})

const deleteReviewSlice= createSlice({
    name:"deleteReview",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
		builder
			.addCase(deleteReview.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteReview.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(deleteReview.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
})


const rootReviewReducer =combineReducers({
    review:postReviewSlice.reducer,
    fetchReview:fetchReviewSlice.reducer,
    deleteReview:deleteReviewSlice.reducer
  })
  
  export default rootReviewReducer;