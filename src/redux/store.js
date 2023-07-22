import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import siteReducer from "./features/site/siteSlice";
import blogReducer from "./features/blog/blogSlice";
import couponReducer from "./features/coupon/couponSlice";
import colorReducer from "./features/color/colorSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    site: siteReducer,
    blog: blogReducer,
    coupon: couponReducer,
    color: colorReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
