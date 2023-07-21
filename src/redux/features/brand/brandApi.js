import { api } from "../../api/apiSlice";

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (data) => ({
        url: `/brand`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),
    getBrands: builder.query({
      query: () => "/brand",
      providesTags: ["brand"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brand/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetBrandsQuery,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} = blogApi;
