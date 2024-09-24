import {createSlice} from "@reduxjs/toolkit";
import {UserService} from "../service/UserService.js";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UserService.findAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UserService.findAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(UserService.findAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            });
    },
});

export default userSlice.reducer
