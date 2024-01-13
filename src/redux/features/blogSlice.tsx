import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { blogTypes } from "../../types";

export const fetchBlog=createAsyncThunk(
    "fetchBlog",
    async({page,count,value,categoryId}:{page:number,count:number,value:string,categoryId?:number | string})=>{
        const res=await axios.get(
            `https://immutable858-001-site1.atempurl.com/api/Blog?Page=${page}&ShowMore.Take=${count}&Prompt=${value}&CategoryId=${categoryId}`
        )
        return res.data
    }
)

export const fetchRecentPosts=createAsyncThunk(
  "fetchRecentPosts",
  async()=>{
      const res=await axios.get(
          `https://immutable858-001-site1.atempurl.com/api/Blog/recent-posts`
      )
      return res.data
  }
)

export const fetchBlogCategories=createAsyncThunk(
  "fetchCategories",
  async()=>{
      const res=await axios.get(
          `https://immutable858-001-site1.atempurl.com/api/Blog/blog-categories`
      )
      return res.data
  }
)





interface BlogState {
    data: blogTypes[]; 
    status: string;
    error: string | null | undefined;
  }
  
  const initialState: BlogState = {
    data: [],
    status: "idle",
    error: null,
  };

const blogSlice= createSlice({
    name:"blog",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
		builder
			.addCase(fetchBlog.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchBlog.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchBlog.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
   

})

const recentPostsSlice= createSlice({
  name:"posts",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
  builder
    .addCase(fetchRecentPosts.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchRecentPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(fetchRecentPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
},
 

})

const blogCategorySlice= createSlice({
  name:"blog",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
  builder
    .addCase(fetchBlogCategories.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchBlogCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(fetchBlogCategories.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
},
 

})



const rootBlogReducer =combineReducers({
  blog:blogSlice.reducer,
  posts:recentPostsSlice.reducer,
  categories:blogCategorySlice.reducer,
})

export default rootBlogReducer;

