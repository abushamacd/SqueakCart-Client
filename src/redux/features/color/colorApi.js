import { api } from "../../api/apiSlice";

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createColor: builder.mutation({
      query: (data) => ({
        url: `/color`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["color"],
    }),
    getColors: builder.query({
      query: () => "/color",
      providesTags: ["color"],
    }),
    deleteColor: builder.mutation({
      query: (id) => ({
        url: `/color/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["color"],
    }),
    updateColor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/color/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["color"],
    }),
  }),
});

export const {
  useCreateColorMutation,
  useGetColorsQuery,
  useDeleteColorMutation,
  useUpdateColorMutation,
} = blogApi;
