import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { token },
      } = getState();
      headers.set("authorization", token ? token : "");
      return headers;
    },
  }),
  tagTypes: ["userAddress", "profileUpdate"],
  endpoints: () => ({}),
});
