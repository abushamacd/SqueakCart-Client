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
      query: () => ({
        url: `/cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["profileUpdate"],
    }),
    updateQuantity: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cart/cartQuantity/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profileUpdate", "user"],
    }),
    removeFromCart: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profileUpdate", "user"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useClearCartMutation,
  useUpdateQuantityMutation,
  useRemoveFromCartMutation,
} = cartApi;
