//
//  apiStore.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {configureStore} from "@reduxjs/toolkit";
import {userService} from "./userService.js";
import {roleService} from "./roleService.js";

export const apiStore = configureStore({
    reducer: {
        [userService.reducerPath]: userService.reducer,
        [roleService.reducerPath]: roleService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userService.middleware)
            .concat(roleService.middleware)
});
