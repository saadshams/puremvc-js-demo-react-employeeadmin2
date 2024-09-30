//
//  userService.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {ApplicationConstants} from "../../ApplicationConstants.js";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userService = createApi({

    reducerPath: "userService",
    baseQuery: fetchBaseQuery({baseUrl: ApplicationConstants.API_URL}),
    tagTypes: ["users", "departments"],

    endpoints: (builder) => ({

        findAll: builder.query({
            query: () => ({
                method: "GET",
                url: "/users"
            }),
            providesTags: ["users"]
        }),

        findById: builder.query({
            query: ({id}) => ({
                method: "GET",
                url: `/users/${id}`
            })
        }),

        save: builder.mutation({
            query: (user) => ({
                method: "POST",
                url: "/users",
                body: user
            }),
            invalidatesTags: ["users"]
        }),

        update: builder.mutation({
            query: (user) => ({
                method: "PUT",
                url: `/users/${user.id}`,
                body: user
            }),
            invalidatesTags: ["users"]
        }),

        deleteById: builder.mutation({
            query: ({id}) => ({
                method: "DELETE",
                url: `/users/${id}`
            }),
            invalidatesTags: ["users"]
        }),

        findAllDepartments: builder.query({
            query: () => ({
                method: "GET",
                url: "/departments"
            }),
            providesTags: ["departments"]
        })
    })
});

export const {
    useFindAllQuery,
    useFindByIdQuery,
    useSaveMutation,
    useUpdateMutation,
    useDeleteByIdMutation,
    useFindAllDepartmentsQuery} = userService;
