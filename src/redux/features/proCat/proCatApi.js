import { api } from "../../api/apiSlice";

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProCat: builder.mutation({
      query: (data) => ({
        url: `/proCat`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pro_cat"],
    }),
    getProCats: builder.query({
      query: () => "/proCat",
      providesTags: ["pro_cat"],
    }),
    deleteProCat: builder.mutation({
      query: (id) => ({
        url: `/proCat/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["pro_cat"],
    }),
    updateProCat: builder.mutation({
      query: ({ id, data }) => ({
        url: `/proCat/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["pro_cat"],
    }),
    uploadProCatImage: builder.mutation({
      query: (data) => ({
        url: `/proCat/upload-img`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [""],
    }),
    deleteProCatImage: builder.mutation({
      query: (id) => ({
        url: `/proCat/delete-img/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [""],
    }),
  }),
});

export const {
  useCreateProCatMutation,
  useGetProCatsQuery,
  useDeleteProCatMutation,
  useUpdateProCatMutation,
  useUploadProCatImageMutation,
  useDeleteProCatImageMutation,
} = blogApi;
