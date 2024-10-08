//
//  roleRepository.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {createSlice} from "@reduxjs/toolkit";
import {ApplicationConstants} from "../ApplicationConstants.js";
import {findAll, findById, add, remove} from "./data/roleData.js";

const roleRepository = createSlice({
    name: "roleRepository",
    initialState: {
        findAll: { data: [], status: ApplicationConstants.IDLE, error: null },
        findById: { data: [], status: ApplicationConstants.IDLE, error: null },
        add: { data: {}, status: ApplicationConstants.IDLE, error: null },
        remove: { data: {}, status: ApplicationConstants.IDLE, error: null },
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
                state.findById = {data: [], status: ApplicationConstants.LOADING, error: null};
            })
            .addCase(findById.fulfilled, (state, action) => {
                state.findById = {data: action.payload, status: ApplicationConstants.SUCCEEDED, error: null};
            })
            .addCase(findById.rejected, (state, action) => {
                state.findById = {data: [], status: ApplicationConstants.FAILED, error: action.error};
            });

        builder
            .addCase(add.pending, state => {
                state.add = {data: {}, status: ApplicationConstants.LOADING, error: null};
            })
            .addCase(add.fulfilled, (state, action) => {
                const data = [...state.findById.data, action.payload];
                state.findById = {data, status: ApplicationConstants.SUCCEEDED, error: null};
                state.add = {data: action.payload, status: ApplicationConstants.SUCCEEDED, error: null};
            })
            .addCase(add.rejected, (state, action) => {
                state.add = {data: {}, status: ApplicationConstants.FAILED, error: action.error};
            });

        builder
            .addCase(remove.pending, state => {
                state.add = {data: {}, status: ApplicationConstants.LOADING, error: null};
            })
            .addCase(remove.fulfilled, (state, action) => {
                const data = state.findById.data.filter(role => role.id !== action.payload.id);
                state.findById = {data, status: ApplicationConstants.SUCCEEDED, error: null};
                state.add = {data: action.payload, status: ApplicationConstants.SUCCEEDED, error: null};
            })
            .addCase(remove.rejected, (state, action) => {
                state.add = {data: {}, status: ApplicationConstants.FAILED, error: action.error};
            });
    }
});

export default roleRepository.reducer;
