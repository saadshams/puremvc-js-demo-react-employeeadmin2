//
//  roleData.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {createAsyncThunk} from "@reduxjs/toolkit";

export const findAll = createAsyncThunk("roles/findAll",
    /**
     * @param {{database: IDBDatabase}} payload
     * @returns {Promise<Role[]>}
     */
    async ({database}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("roles", "readonly");
            transaction.onerror = event => reject(event.target.error);

            const store = transaction.objectStore("roles");
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }
);

export const save = createAsyncThunk("roles/save",
    /**
     * @param {{ database: IDBDatabase, role: Role }} payload
     * @returns {Promise<Role>}
     */
    async ({database, role}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("roles", "readwrite");
            transaction.onerror = (event) => reject(event.target.error);

            const store = transaction.objectStore("roles");
            const request = store.add(role);
            request.onsuccess = () => resolve(role);
            request.onerror = (event) => reject(event.target.error);
        });
    }
);