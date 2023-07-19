import { api } from "../../api/apiSlice";

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["profileUpdate"],
    }),
    createBlogCat: builder.mutation({
      query: (data) => ({
        url: `/blogCat`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog_cat"],
    }),
  }),
});

export const { useCreateBlogCatMutation } = blogApi;
