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
    uploadBlogImage: builder.mutation({
      query: (data) => ({
        url: `/blog/upload-img`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [""],
    }),
    deleteBlogImage: builder.mutation({
      query: (id) => ({
        url: `/blog/delete-img/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [""],
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: `/blog`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
    getBlogs: builder.query({
      query: () => "/blog",
      providesTags: ["blog"],
    }),
    deleteBlog: builder.mutation({
      query: ({ id }) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useCreateBlogCatMutation,
  useGetBlogCatsQuery,
  useDeleteBlogCatMutation,
  useUploadBlogImageMutation,
  useDeleteBlogImageMutation,
  useCreateBlogMutation,
  useGetBlogsQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
