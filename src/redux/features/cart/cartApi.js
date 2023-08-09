import { api } from "../../api/apiSlice";

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: `/cart`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profileUpdate", "user"],
    }),
    clearCart: builder.mutation({
      query: (data) => ({
        url: `/cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["profileUpdate"],
    }),
  }),
});

export const { useAddToCartMutation, useClearCartMutation } = cartApi;
