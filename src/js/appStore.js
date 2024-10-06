//
//  appStore.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {configureStore} from "@reduxjs/toolkit";
import userDataSlice from "./model/data/userDataSlice.js";
import roleDataSlice from "./model/data/roleDataSlice.js";

export const appStore = configureStore({
    reducer: {
        userDataSlice: userDataSlice,
        roleDataSlice: roleDataSlice
    }
});
