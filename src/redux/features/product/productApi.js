import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/product/upload-img`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [""],
    }),
    deleteProductImage: builder.mutation({
      query: (id) => ({
        url: `/product/delete-img/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [""],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/product`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    getProducts: builder.query({
      query: ({ data }) => `/product${data}`,
      providesTags: ["product"],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
      providesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useUploadProductImageMutation,
  useDeleteProductImageMutation,
  useCreateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductQuery,
} = productApi;
