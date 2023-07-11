import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { api } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
