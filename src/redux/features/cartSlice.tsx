import {
	PayloadAction,
	combineReducers,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { ProductTypes } from "../../types";
import axios from "axios";
const token=localStorage.getItem("token")
export const postCart = createAsyncThunk(
	"postCart",
	async (
		values: {
			productId: string | undefined;
			colorId: number | undefined;
			userId:string | null;
			count: number;
		},
		{ rejectWithValue }
	) => {
		try {
			const res = await axios.post(
				"https://immutable858-001-site1.atempurl.com/api/Cart/addToCart",
				values,{
					headers: {
						'accept': '*/*',
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					  },
				}
			);

			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchCart = createAsyncThunk(
	"fetchCart",
	async (userId: number | any) => {
		const res = await axios.get(
			`https://immutable858-001-site1.atempurl.com/api/Cart/getAllCartItems/${userId}`,{
				headers: {
					'accept': '*/*',
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				  },
			}
		);
		return res.data;
	}
);

export const removeCart = createAsyncThunk(
	"removeCart",
	async (
		cartItem: { productId: number; colorId: number; userId: string | null },
		{ rejectWithValue }
	) => {
		try {
			const res = await axios.delete(
				"https://immutable858-001-site1.atempurl.com/api/Cart/remove",
				{ data: cartItem ,headers: {
					'accept': '*/*',
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				  },}
			);
			console.log(res.data);
			
			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const clearCart = createAsyncThunk(
	"clearCart",
	async (userId: string | null, { rejectWithValue }) => {
		try {
			const res = await axios.post(
				"https://immutable858-001-site1.atempurl.com/api/Cart/ClearCart",
				{ appUserId: userId } 
			);
			console.log(res.data);

			return res.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

interface CartState {
	items: ProductTypes[];
	data: [];
	status: string;
	error: null | undefined | string;
}

const initialState: CartState = {
	items: [],
	data: [],
	status: "idle",
	error: null,
};

interface CartState1 {
	data: {message:any};
	status: string;
	error: null | undefined | string;
}

const initialState1: CartState1 = {
	data: {message:""},
	status: "idle",
	error: null,
};



export const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addToCart: (
			state,
			action: PayloadAction<{
				item: ProductTypes;
				size?: string;
				color?: string;
				count?: number | any;
				image?: string;
			}>
		) => {
			const { item, size, color, count, image } = action.payload;

			const existingItemIndex = (state.items ?? []).findIndex(
				(cartItem) =>
					cartItem.id === item.id &&
					cartItem.sizes === size &&
					cartItem.colors === color &&
					cartItem.imageFiles === image
			);

			const existingItem = (state.items ?? []).find(
				(cartItem) =>
					cartItem.id === item.id &&
					cartItem.sizes === size &&
					cartItem.colors === color
			);
			console.log("existt", existingItem);

			if (existingItemIndex !== -1) {
				state.items[existingItemIndex].count += count || 1;
			} else {
				const newItem = {
					...item,
					ProductSizes: size,
					ProductColors: color,
					count: count || 1,
					ProductImages: image,
				};
				state.items.push(newItem);
			}
		},
		removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload;
			state.items = state.items.filter((item) => item.id !== id);
		},
	},
	// reducers:{},
	extraReducers: (builder) => {
		builder
			.addCase(postCart.pending, (state) => {
				state.status = "loading";
			})
			.addCase(postCart.fulfilled, (state, action) => {
				// console.log("Fulfilled action payload:", action.payload);
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(postCart.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const fetchCartSlice = createSlice({
	name: "fetchCart",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				// console.log("Fulfilled action payload:", action.payload);
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchCart.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const removeCartSlice = createSlice({
	name: "removeCart",
	initialState: initialState1,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(removeCart.pending, (state) => {
				state.status = "loading";
			})
			.addCase(removeCart.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(removeCart.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const clearAllCartSlice = createSlice({
	name: "clearAll",
	initialState: initialState1,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(clearCart.pending, (state) => {
				state.status = "loading";
			})
			.addCase(clearCart.fulfilled, (state, action) => {
				// console.log("Fulfilled action payload:", action.payload);
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(clearCart.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

const rootCartReducer = combineReducers({
	postCart: cartSlice.reducer,
	fetchCart: fetchCartSlice.reducer,
	removeCart: removeCartSlice.reducer,
	clearAllCart: clearAllCartSlice.reducer,
});

export default rootCartReducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
