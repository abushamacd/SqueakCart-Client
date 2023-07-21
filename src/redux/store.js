import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import siteReducer from "./features/site/siteSlice";
import blogReducer from "./features/blog/blogSlice";
import couponReducer from "./features/coupon/couponSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    site: siteReducer,
    blog: blogReducer,
    coupon: couponReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
