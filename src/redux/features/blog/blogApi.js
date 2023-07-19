import { api } from "../../api/apiSlice";

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBlogCat: builder.mutation({
      query: (data) => ({
        url: `/blogCat`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog_cat"],
    }),
    getBlogCats: builder.query({
      query: () => "/blogCat",
      providesTags: ["blog_cat"],
    }),
    deleteBlogCat: builder.mutation({
      query: (id) => ({
        url: `/blogCat/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog_cat"],
    }),
  }),
});

export const {
  useCreateBlogCatMutation,
  useGetBlogCatsQuery,
  useDeleteBlogCatMutation,
} = blogApi;
