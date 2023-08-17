import { api } from "../../api/apiSlice";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (data) => ({
        url: `/coupon`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["coupon"],
    }),
    getCoupons: builder.query({
      query: () => "/coupon",
      providesTags: ["coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetCouponsQuery,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
} = orderApi;
