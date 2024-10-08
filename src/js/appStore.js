//
//  appStore.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {configureStore} from "@reduxjs/toolkit";
import userRepository from "./model/userRepository.js";
import roleRepository from "./model/roleRepository.js";

export const appStore = configureStore({
    reducer: {
        userRepository: userRepository,
        roleRepository: roleRepository
    }
});
