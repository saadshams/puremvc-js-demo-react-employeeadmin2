import {configureStore} from "@reduxjs/toolkit";
import userSlice from "../data/UserSlice.js"

export const store = configureStore({
    reducer: {
        userSlice
    },
});
