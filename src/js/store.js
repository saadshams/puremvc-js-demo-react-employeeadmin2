//
//  store.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {configureStore} from "@reduxjs/toolkit";
import userRepository from "./model/userRepository.js";
import {userService} from "./model/service/userService.js";
import {roleService} from "./model/service/roleService.js";

export const store = configureStore({
    reducer: {
        "userRepository": userRepository,
        "userService": userService.reducer,
        "roleService": roleService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userService.middleware)
            .concat(roleService.middleware)
});
