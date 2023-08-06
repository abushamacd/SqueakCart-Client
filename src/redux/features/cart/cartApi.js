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
  }),
});

export const { useAddToCartMutation } = cartApi;
