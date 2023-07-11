import { api } from "../../api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/user`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation } = authApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1" }),
//   //   tagTypes: ["comments"],
//   endpoints: (builder) => ({
//     signUp: builder.mutation({
//       query: (data) => ({
//         url: `/user`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const { useSignUpMutation } = api;
