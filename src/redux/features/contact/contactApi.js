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
  }),
});

export const { useCreateContactMutation } = authApi;
