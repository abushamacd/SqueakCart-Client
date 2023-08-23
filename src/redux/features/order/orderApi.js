import { api } from "../../api/apiSlice";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createIntent: builder.mutation({
      query: (total) => ({
        url: `order/createIntent`,
        method: "POST",
        body: total,
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/order`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    getUserOrders: builder.query({
      query: () => "/order/user",
      providesTags: ["order"],
    }),
    getOrders: builder.query({
      query: () => "/order",
      providesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation({
      query: ({ id }) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateIntentMutation,
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
