import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["profileUpdate"],
    }),
    getUsers: builder.query({
      query: () => "/user",
      providesTags: ["profileUpdate"],
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profileUpdate"],
    }),
    getUserAddress: builder.query({
      query: () => "/address",
      providesTags: ["userAddress"],
    }),
    addUserAddress: builder.mutation({
      query: (data) => ({
        url: `/address`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userAddress"],
    }),
    deleteUserAddress: builder.mutation({
      query: (id) => ({
        url: `/address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["userAddress"],
    }),
    updateUserAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/address/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["userAddress"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetUserAddressQuery,
  useAddUserAddressMutation,
  useDeleteUserAddressMutation,
  useUpdateUserAddressMutation,
  useUpdateUserProfileMutation,
  useGetUsersQuery,
} = userApi;
