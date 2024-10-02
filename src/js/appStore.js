//
//  appStore.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {configureStore} from "@reduxjs/toolkit";
import userRepository from "./model/data/userSlice.js";
import {userService} from "./model/service/userService.js";
import {roleService} from "./model/service/roleService.js";
import counterRepository from "./model/data/counterData.js";

export const appStore = configureStore({
    reducer: {
        counterRepository: counterRepository,
        [userRepository.name]: userRepository,
        [userService.reducerPath]: userService.reducer,
        [roleService.reducerPath]: roleService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userService.middleware)
            .concat(roleService.middleware)
});
