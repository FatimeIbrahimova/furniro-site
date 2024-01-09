import { combineReducers, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductTypes } from '../../types'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export const postWishlist = createAsyncThunk(
	"postWishlist",
	async (
		values: {
			productId: string | undefined;
			colorId: number | undefined;
			userId:number | null;
		},
		{ rejectWithValue }
	) => {
		try {
			const res = await axios.post(
				"http://immutable858-001-site1.atempurl.com/api/Favorite",
				values
			);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);
const token=localStorage.getItem("token")
export const fetchWishlist = createAsyncThunk(
	"fetchWishlist",
	async (userId: number | any) => {
		const res = await axios.get(
			`http://immutable858-001-site1.atempurl.com/api/Favorite?UserId=${userId}`,{
				headers: {
					'accept': '*/*',
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				  },
			}
		);
		console.log(res.data);

		return res.data;
	}
);

export const removeWishlist = createAsyncThunk(
	"removeWishlist",
	async (
		wishlistItem: { productId: number; colorId: number; userId: string | null },
		{ rejectWithValue }
	) => {
		try {
			const res = await axios.delete(
				"http://immutable858-001-site1.atempurl.com/api/Favorite",
				{ data: wishlistItem,headers: {
					'accept': '*/*',
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				  }, }
			);
			console.log(res.data);

			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);


interface WishlistState {
    likedProducts: ProductTypes[];
    data: [];
	status: string;
	error: null | undefined | string;
  }
  
  const initialState: WishlistState = {
    likedProducts: [],
    data: [],
	status: "idle",
	error: null,
  };


export const wishlistSlice= createSlice({
   name:"wishlist",
   initialState,
   reducers: {
    toggleLike: (state, action: PayloadAction<ProductTypes>) => {
        const likedProduct = action.payload;
  
        const isLiked = state.likedProducts.some((product) => product.id === likedProduct.id);
  
        if (isLiked) {
          state.likedProducts = state.likedProducts.filter((product) => product.id !== likedProduct.id);
        } else {
          state.likedProducts = [...state.likedProducts, likedProduct];
        }
      },
      removeFromWishlist: (state, action: PayloadAction<ProductTypes>) => {
        toast.error('Product removed from wishlist!', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        state.likedProducts = state.likedProducts.filter(item => item.id !== action.payload);

      },
   },
   extraReducers: (builder) => {
		builder
			.addCase(postWishlist.pending, (state) => {
				state.status = "loading";
			})
			.addCase(postWishlist.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(postWishlist.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
})

export const fetchWishlistSlice = createSlice({
	name: "fetchWishlist",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWishlist.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchWishlist.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchWishlist.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const deleteWishlistSlice = createSlice({
	name: "deleteWishlist",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(removeWishlist.pending, (state) => {
				state.status = "loading";
			})
			.addCase(removeWishlist.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(removeWishlist.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

const rootWishlistReducer = combineReducers({
	postWishlist: wishlistSlice.reducer,
  fetchWishlist:fetchWishlistSlice.reducer,
  deleteWishlist:deleteWishlistSlice.reducer
});

export default rootWishlistReducer;

export const { toggleLike,removeFromWishlist} = wishlistSlice.actions;
