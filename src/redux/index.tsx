import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './features/dataSlice';
import gridReducer from "./features/gridSlice";
import  descReducer  from "./features/descSlice";
import rootBlogReducer from "./features/blogSlice";
import rootCheckoutReducer from "./features/checkoutSlice";
import registerReducer from "./features/registerSlice";
import loginReducer from "./features/loginSlice";
import filterRootReducer from "./features/filterSlice";
import rootProfileReducer from "./features/profileSlice";

import rootCartReducer from "./features/cartSlice";
import rootContactReducer from "./features/contactSlice";
import rootWishlistReducer from "./features/wishlistSlice";
import rootPasswordReducer from "./features/forgetPasswordSlice";
import rootReviewReducer from "./features/reviewSlice";

export const store =configureStore({
    reducer:{
        wishlist: rootWishlistReducer,
        cart:rootCartReducer,
        data: dataReducer,
        grid:gridReducer,
        desc:descReducer,
        blogPage:rootBlogReducer,
        checkoutPage:rootCheckoutReducer,
        contact:rootContactReducer,
        register:registerReducer,
        login:loginReducer,
        profile:rootProfileReducer,
        filterFeatures:filterRootReducer,
        password:rootPasswordReducer,
        review:rootReviewReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;