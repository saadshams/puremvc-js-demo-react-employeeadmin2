//
//  userData.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {createAsyncThunk} from "@reduxjs/toolkit";

export const findAll = createAsyncThunk("users/findAll",
    /**
     * @param {{database: IDBDatabase}} payload
     * @returns {Promise<User[]>}
     */
    async ({database}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readonly");
            transaction.onerror = event => reject(event.target.error);

            const store = transaction.objectStore("users");
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = event => reject(event.target.error);
        });
    }
);

export const findById = createAsyncThunk("users/findById",
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
            request.onsuccess = () => resolve(request.result);
            request.onerror = event => reject(event.target.error);
        });
    }
);

export const save = createAsyncThunk("users/save",
    /**
     * @param {{ database: IDBDatabase, user: User }} payload
     * @returns {Promise<User>}
     */
    async ({database, user}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readwrite");
            transaction.onerror = event => reject(event.target.error);

            const store = transaction.objectStore("users");
            const request = store.add(user);
            request.onsuccess = event => {
                resolve({...user, id: event.target.result});
            }
            request.onerror = event => reject(event.target.error);
        });
    }
);

export const update = createAsyncThunk("users/update",
    /**
     * @param {{ database: IDBDatabase, user: User }} payload
     * @returns {Promise<User[]>}
     */
    async ({database, user}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readwrite");
            transaction.onerror = event => reject(event.target.error);

            const store = transaction.objectStore("users");
            let request = store.get(user.id);
            request.onsuccess = () => {
                const data = request.result;
                Object.assign(data, user);
                request = store.put(data);
                request.onsuccess = () => resolve(data);
                request.onerror = event => reject(event.target.error);
            }
            request.onerror = event => reject(event.target.error);
        });
    }
);

export const deleteById = createAsyncThunk("users/deleteById",
    /**
     * @param {{ database: IDBDatabase, id: Number }} payload
     * @returns {Promise<Number>}
     */
    async ({database, id}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readwrite");
            transaction.onerror = event => reject(event.target.error);

            const store = transaction.objectStore("users");
            const request = store.delete(id);
            request.onsuccess = () => resolve(id);
            request.onerror = event => reject(event.target.error);
        });
    }
);

export const findAllDepartments = createAsyncThunk("users/findAllDepartments",
    /**
     * @param {{database: IDBDatabase}} payload
     * @returns {Promise<User[]>}
     */
    async ({database}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("departments", "readonly");
            transaction.onerror = event => reject(event.target.error);

            const store = transaction.objectStore("departments");
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = event => reject(event.target.error);
        });
    }
);
