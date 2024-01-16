import {
	createSlice,
	createAsyncThunk,
	combineReducers,
} from "@reduxjs/toolkit";
import { ProductTypes } from "../../types";
import axios from "axios";

export const fetchData = createAsyncThunk(
	"data/fetchData",
	async (count: number) => {
		const response = await axios.get(
			`https://immutable858-001-site1.atempurl.com/api/UserProduct/Products?ShowMore.Take=${count}`
		);
		return response.data;
	}
);

export const fetchDataShop = createAsyncThunk(
	"data/fetchDataShop",
	async ({
		page,
		count,
		sortValue,
		categoryNames,
		tagNames,
		productSizes,
		productColors,
		productMinPrice,
		productMaxPrice,
		isNew
	}: {
		page: number;
		count: number;
		sortValue?: any;
		categoryNames?: { label: string; value: number }[];
		tagNames?: { label: string; value: number }[];
		productSizes?:{ label: string; value: number }[];
		productColors?:{ label: string; value: number }[];
		productMinPrice?:number;
		productMaxPrice?:number;
		isNew?:boolean
	}) => {
		let url = `https://immutable858-001-site1.atempurl.com/api/UserProduct/Products?Page=${page}&ShowMore.Take=${count}`;


		if (sortValue !== 'undefined' && sortValue) {
		  url += `&OrderBy=${sortValue}`;
		}
	
		if (categoryNames && categoryNames.length > 0) {
			url += categoryNames?.map((item:any) => `&CategoryNames=${item.label}`).join("")
			console.log(url);
			
		}
		if(tagNames && tagNames.length>0){
			url += tagNames?.map((item:any) => `&ProductTags=${item.label}`).join("")
		}
	
		if (productSizes && productSizes.length > 0) {
			url += productSizes?.map((item:any) => `&ProductSizes=${item.label}`).join("")
			console.log(url);
		}
		if (productColors && productColors.length > 0) {
			url += productColors?.map((item:any) => `&ProductColors=${item.label.replace(/#/g, '%23')}`).join("")

		}
		if(productMinPrice){
			url+=`&MinPrice=${productMinPrice}`
		}
		if(productMaxPrice){
			url+=`&MaxPrice=${productMaxPrice}`
		}
		if(isNew){
			url+=`&IsNew=${isNew}`
		}
		const response = await axios.get(url);
	
		return response.data;
	
	}
);

export const fetchDataDetail = createAsyncThunk(
	"data/fetchProductDetail",
	async (id: string | undefined) => {
		if (id) {
			const res = await axios.get(
				`https://immutable858-001-site1.atempurl.com/api/UserProduct/getById/ProductPage?Id=${id}&SizeId=2`
			);
			return res.data;
			
		}
	}
);


  

export const fetchRelatedData = createAsyncThunk(
	"data/fetchRelatedData",
	async ({ id, count }: { id: string | undefined; count: number }) => {
		if(id){
			const res = await axios.get(
				`https://immutable858-001-site1.atempurl.com/api/UserProduct/RelatedProducts?ShowMore.Take=${count}&MainProductId=${id}`
			);
			return res.data;
		}
	}
);
export const fetchSearchData = createAsyncThunk(
	"data/fetchSearchData",
	async ({ value, count }: { value: string; count: number }) => {
		const res = await axios.get(
			`https://immutable858-001-site1.atempurl.com/api/UserProduct/Products?Prompt=${value}&ShowMore.TakeProduct=${count}`
		);
		return res.data;
	}
);

interface dataState {
	data: ProductTypes[];
	status: string;
	error: null | string | undefined;
}

interface dataDetailState {
	data: ProductTypes;
	status: string;
	error: null | string | undefined;
	colorId:number
}

const dataSlice = createSlice({
	name: "data",
	initialState: {
		data: [],
		status: "idle",
		error: null,
	} as dataState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});
const dataDetailSlice = createSlice({
	name: "detailData",
	initialState: {
		data: {},
		status: "idle",
		error: null,
		colorId:0,
		selectedProductImage: ""
	} as dataDetailState,
	reducers: {
		setColorIds: (state, action) => {
			state.colorId = action.payload;
		  }
		  
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDataDetail.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchDataDetail.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
				state.colorId = action.payload?.colors?.[0]?.id || 0;
			})
			.addCase(fetchDataDetail.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});
const dataShopSlice = createSlice({
	name: "dataShop",
	initialState: {
		data: [],
		status: "idle",
		error: null,
	} as dataState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDataShop.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchDataShop.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchDataShop.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});
const relatedDataSlice = createSlice({
	name: "detailData",
	initialState: {
		data: {},
		status: "idle",
		error: null,
	} as dataDetailState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRelatedData.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchRelatedData.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchRelatedData.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});
const searchSlice = createSlice({
	name: "search",
	initialState: {
		data: [],
		status: "idle",
		error: null,
	} as dataState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSearchData.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchSearchData.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchSearchData.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

const rootReducer = combineReducers({
	data: dataSlice.reducer,
	detailData: dataDetailSlice.reducer,
	dataShop: dataShopSlice.reducer,
	relatedData: relatedDataSlice.reducer,
	searchData: searchSlice.reducer,
});


export default rootReducer;
export const { setColorIds } = dataDetailSlice.actions;
