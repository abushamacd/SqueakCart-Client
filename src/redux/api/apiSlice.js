import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { token },
      } = getState();
      headers.set("authorization", token ? token : "");
      return headers;
    },
  }),
  tagTypes: [
    "user",
    "profileUpdate",
    "contact",
    "blog_cat",
    "blog",
    "coupon",
    "brand",
    "pro_cat",
    "color",
  ],
  endpoints: () => ({}),
});
