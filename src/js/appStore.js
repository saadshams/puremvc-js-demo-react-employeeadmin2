//
//  appStore.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./model/data/userSlice.js";
import roleSlice from "./model/data/roleSlice.js";
import {userService} from "./model/service/userService.js";
import {roleService} from "./model/service/roleService.js";

export const appStore = configureStore({
    reducer: {
        userSlice: userSlice,
        roleSlice: roleSlice,
        [userService.reducerPath]: userService.reducer,
        [roleService.reducerPath]: roleService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userService.middleware)
            .concat(roleService.middleware)
});
