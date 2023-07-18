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
  }),
});

export const { useCreateContactMutation, useGetContactsQuery } = authApi;
