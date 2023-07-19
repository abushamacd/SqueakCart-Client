import { api } from "../../api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => ({
        url: `/contact`,
        method: "POST",
        body: data,
      }),
    }),
    getContacts: builder.query({
      query: () => "/contact",
    }),
    getContact: builder.query({
      query: (id) => `/contact/${id}`,
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactsQuery,
  useGetContactQuery,
} = authApi;
