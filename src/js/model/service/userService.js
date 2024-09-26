import {ApplicationConstants} from "../../ApplicationConstants.js";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userService = createApi({
    reducerPath: "userService",
    baseQuery: fetchBaseQuery({baseUrl: ApplicationConstants.API_URL}),
    endpoints: (builder) => ({
        findAllUsers: builder.query({
            query: () => "/users"
        }),
        deleteByUserId: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE"
            })
        })
    })
});

export const {useFindAllUsersQuery, useDeleteByUserIdMutation} = userService;
