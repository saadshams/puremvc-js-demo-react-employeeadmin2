//
//  roleSlice.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {createSlice} from "@reduxjs/toolkit";
import {ApplicationConstants} from "../../ApplicationConstants.js";
import {findAll, save} from "./roleData.js";

const roleSlice = createSlice({
    name: "roleSlice",
    initialState: {
        findAll: {data: [], status: ApplicationConstants.IDLE, error: null},
        save: { status: ApplicationConstants.IDLE, error: null },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findAll.pending, state => {
                state.findAll.status = ApplicationConstants.LOADING;
            })
            .addCase(findAll.fulfilled, (state, action) => {
                state.findAll.status = ApplicationConstants.SUCCEEDED;
                state.findAll.data = action.payload;
            })
            .addCase(findAll.rejected, (state, action) => {
                state.findAll.status = ApplicationConstants.FAILED;
                state.findAll.error = action.error.message;
            });

        builder
            .addCase(save.pending, state => {
                state.save.status = ApplicationConstants.LOADING;
            })
            .addCase(save.fulfilled, (state, action) => {
                state.save.status = ApplicationConstants.SUCCEEDED;
                state.findAll.data.push(action.payload);
            })
            .addCase(save.rejected, (state, action) => {
                state.save.status = ApplicationConstants.FAILED;
                state.save.error = action.error.message;
            });
    }
});

export default roleSlice.reducer;
