//
//  roleService.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ApplicationConstants} from "../../ApplicationConstants.js";

export const roleService = createApi({
    reducerPath: "roleService",
    baseQuery: fetchBaseQuery({baseUrl: ApplicationConstants.API_URL}),
    tagTypes: ["roles"],

    endpoints: (builder) => ({

        findAll: builder.query({
            query: () => ({
                method: "GET",
                url: "/roles"
            })
        }),

        findById: builder.query({
            query: ({id}) => ({
                method: "GET",
                url: `/users/${id}/roles`
            }),
            providesTags: ["roles"]
        }),

        updateById: builder.mutation({
            query: ({id, roles}) => ({
                method: "PUT",
                url: `/users/${id}/roles`,
                body: roles
            }),
            invalidatesTags: ["roles"]
        })

    })
});

export const { useFindAllQuery,
    useFindByIdQuery,
    useUpdateByIdMutation} = roleService
