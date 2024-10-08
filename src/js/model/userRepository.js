//
//  userRepository.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {createSlice} from "@reduxjs/toolkit";
import {ApplicationConstants} from "../ApplicationConstants.js";
import {deleteById, findAll, findAllDepartments, findById, save, update} from "./data/userData.js";

const userRepository = createSlice({
    name: "userRepository",
    initialState: {
        findAll: { data: [], status: ApplicationConstants.IDLE, error: null },
        findById: { data: {}, status: ApplicationConstants.IDLE, error: null },
        save: { status: ApplicationConstants.IDLE, error: null },
        update: { status: ApplicationConstants.IDLE, error: null },
        deleteById: { status: ApplicationConstants.IDLE, error: null },
        findAllDepartments: { data: [], status: ApplicationConstants.IDLE, error: null },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findAll.pending, state => {
                state.findAll = {data: [], status: ApplicationConstants.LOADING, error: null};
            })
            .addCase(findAll.fulfilled, (state, action) => {
                state.findAll = {data: action.payload, status: ApplicationConstants.SUCCEEDED, error: null};
            })
            .addCase(findAll.rejected, (state, action) => {
                state.findAll = {data: [], status: ApplicationConstants.FAILED, error: action.error};
            });

        builder
            .addCase(findById.pending, state => {
                state.findById = {data: {}, status: ApplicationConstants.LOADING, error: null};
            })
            .addCase(findById.fulfilled, (state, action) => {
                state.findById = {data: action.payload, status: ApplicationConstants.SUCCEEDED, error: null};
            })
            .addCase(findById.rejected, (state, action) => {
                state.findById = {data: {}, status: ApplicationConstants.FAILED, error: action.error};
            });

        builder
            .addCase(save.pending, state => {
                state.save = {data: {}, status: ApplicationConstants.LOADING, error: null};
            })
            .addCase(save.fulfilled, (state, action) => {
                const data = [...state.findAll.data, action.payload];
                state.findAll = {data, status: ApplicationConstants.SUCCEEDED, error: null};
                state.save = {data: action.payload, status: ApplicationConstants.SUCCEEDED, error: null};
            })
            .addCase(save.rejected, (state, action) => {
                state.save = {data: {}, status: ApplicationConstants.FAILED, error: action.error};
            });

        builder
            .addCase(update.pending, state => {
                state.update = {data: {}, status: ApplicationConstants.LOADING, error: null};
            })
            .addCase(update.fulfilled, (state, action) => {
                const data = state.findAll.data.map(user => user.id === action.payload.id ? action.payload : user);
                state.findAll = {data, status: ApplicationConstants.SUCCEEDED, error: null};
                state.update = {data: action.payload, status: ApplicationConstants.SUCCEEDED, error: null};
            })
            .addCase(update.rejected, (state, action) => {
                state.update = {data: {}, status: ApplicationConstants.FAILED, error: action.error};
            });

        builder
            .addCase(deleteById.pending, state => {
                state.deleteById = {data: {}, status: ApplicationConstants.LOADING, error: null};
            })
            .addCase(deleteById.fulfilled, (state, action) => {
                const data = state.findAll.data.filter(user => user.id !== action.payload);
                state.findAll = {data, status: ApplicationConstants.SUCCEEDED, error: null};
                state.deleteById = {data: action.payload, status: ApplicationConstants.SUCCEEDED, error: null};
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.deleteById = {data: {}, status: ApplicationConstants.FAILED, error: action.error};
            });

        builder
            .addCase(findAllDepartments.pending, state => {
                state.findAllDepartments = {data: {}, status: ApplicationConstants.LOADING, error: null};
            })
            .addCase(findAllDepartments.fulfilled, (state, action) => {
                state.findAllDepartments = {data: action.payload, status: ApplicationConstants.SUCCEEDED, error: null};
            })
            .addCase(findAllDepartments.rejected, (state, action) => {
                state.findAllDepartments = {data: {}, status: ApplicationConstants.FAILED, error: action.error};
            });
    }
});

export default userRepository.reducer;
