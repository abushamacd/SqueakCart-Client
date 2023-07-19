import { api } from "../../api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => ({
        url: `/contact`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
    getContacts: builder.query({
      query: () => "/contact",
      providesTags: ["contact"],
    }),
    getContact: builder.query({
      query: (id) => `/contact/${id}`,
    }),
    updateContact: builder.mutation({
      query: ({ id, data }) => ({
        url: `/contact/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: ({ id }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactsQuery,
  useGetContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = authApi;
