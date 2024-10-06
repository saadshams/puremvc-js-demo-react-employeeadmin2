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
            request.onerror = event => reject(event.target.error);
        });
    }
);

export const findById = createAsyncThunk("roles/findById",
    /**
     * @param {{ database: IDBDatabase, id: Number }} payload
     * @returns {Promise<User>}
     */
    async ({database, id}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readonly");
            transaction.onerror = event => reject(event.target.error);

            const store = transaction.objectStore("users");
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result ? request.result.roles : []);
            request.onerror = event => reject(event.target.error);
        });
    }
);

export const add = createAsyncThunk("roles/add",
    /**
     * @param {{ database: IDBDatabase, id: Number, role: Role }} payload
     * @returns {Promise<Role>}
     */
    async ({database, id, role}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readwrite");
            transaction.onerror = event => reject(event.target.error);

            const store = transaction.objectStore("users");
            let request = store.get(id);
            request.onsuccess = () => {
                const data = request.result;
                data.roles = [...data.roles, role];
                request = store.put(data);
                request.onsuccess = () => resolve(role);
                request.onerror = event => reject(event.target.error);
            }
            request.onerror = event => reject(event.target.error);
        });
    }
);

export const remove = createAsyncThunk("roles/remove",
    /**
     * @param {{ database: IDBDatabase, id: Number, role: Role }} payload
     * @returns {Promise<Role>}
     */
    async ({database, id, role}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readwrite");
            transaction.onerror = event => reject(event.target.error);

            const store = transaction.objectStore("users");
            let request = store.get(id);
            request.onsuccess = () => {
                const data = request.result;
                data.roles = data.roles.filter(r => r.id !== role.id);
                request = store.put(data);
                request.onsuccess = () => resolve(role);
                request.onerror = event => reject(event.target.error);
            }
            request.onerror = event => reject(event.target.error);
        });
    }
);
