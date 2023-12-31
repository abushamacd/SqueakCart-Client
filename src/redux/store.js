import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import siteReducer from "./features/site/siteSlice";
import blogReducer from "./features/blog/blogSlice";
import couponReducer from "./features/coupon/couponSlice";
import colorReducer from "./features/color/colorSlice";
import productReducer from "./features/product/productSlice";
import proCatReducer from "./features/proCat/proCatSlice";
import brandReducer from "./features/brand/brandSlice";
import orderReducer from "./features/order/orderSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    site: siteReducer,
    blog: blogReducer,
    coupon: couponReducer,
    color: colorReducer,
    product: productReducer,
    proCat: proCatReducer,
    brand: brandReducer,
    order: orderReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
