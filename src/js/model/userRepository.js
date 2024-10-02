//
//  userRepository.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {createSlice} from "@reduxjs/toolkit";
import {findAll, save, update, deleteById} from "./data/userData.js";

export const userRepository = createSlice({
    name: "userRepository",
    initialState: {
        list: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findAll.pending, state => {
                state.status = "loading";
            })
            .addCase(findAll.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(findAll.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

        builder
            .addCase(save.fulfilled, (state, action) => {
                state.list.push(action.payload);
            });

        builder
            .addCase(update.fulfilled, (state, action) => {
                const index = state.list.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });

        builder
            .addCase(deleteById.fulfilled, (state, action) => {
                state.list = state.list.filter(user => user.id !== action.payload);
            })
    }
});

export default userRepository.reducer;
