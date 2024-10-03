//
//  userSlice.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {createSlice} from "@reduxjs/toolkit";
import {ApplicationConstants} from "../../ApplicationConstants.js";
import {findAll, findById, save, saveDepartment, update, deleteById} from "./userData.js";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        findAll: { data: [], status: ApplicationConstants.IDLE, error: null },
        findById: { data: {}, status: ApplicationConstants.IDLE, error: null },
        save: { status: ApplicationConstants.IDLE, error: null },
        update: { status: ApplicationConstants.IDLE, error: null },
        deleteById: { status: ApplicationConstants.IDLE, error: null },
        departments: { data: [], status: ApplicationConstants.IDLE, error: null },
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
            .addCase(findById.pending, state => {
                state.findById.status = ApplicationConstants.LOADING;
            })
            .addCase(findById.fulfilled, (state, action) => {
                state.findById.status = ApplicationConstants.SUCCEEDED;
                state.findById.user = action.payload;
            })
            .addCase(findById.rejected, (state, action) => {
                state.findById.status = ApplicationConstants.FAILED;
                state.findById.error = action.error.message;
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

        builder
            .addCase(update.pending, state => {
                state.update.status = ApplicationConstants.LOADING;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.update.status = ApplicationConstants.SUCCEEDED;
                const index = state.findAll.data.findIndex(user => user.id === action.payload.id);
                if (index !== -1) state.findAll.data[index] = action.payload;
            })
            .addCase(update.rejected, (state, action) => {
                state.update.status = ApplicationConstants.FAILED;
                state.update.error = action.error.message;
            });

        builder
            .addCase(deleteById.pending, state => {
                state.deleteById.status = ApplicationConstants.LOADING;
            })
            .addCase(deleteById.fulfilled, (state, action) => {
                state.deleteById.status = ApplicationConstants.SUCCEEDED;
                state.findAll.data = state.findAll.data.filter(user => user.id !== action.payload);
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.deleteById.status = ApplicationConstants.FAILED;
                state.deleteById.error = action.error.message;
            });

        builder
            .addCase(saveDepartment.pending, state => {
                state.departments.status = ApplicationConstants.LOADING;
            })
            .addCase(saveDepartment.fulfilled, (state, action) => {
                state.departments.status = ApplicationConstants.SUCCEEDED;
                state.departments.data.push(action.payload);
            })
            .addCase(saveDepartment.rejected, (state, action) => {
                state.departments.status = ApplicationConstants.FAILED;
                state.departments.error = action.error.message;
            });
    }
});

export default userSlice.reducer;
