//
//  userData.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {createAsyncThunk} from "@reduxjs/toolkit";

/** @returns {Promise<IDBDatabase>} */
export const getConnection = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("employeeadmin", 1);
        request.onupgradeneeded = event => {
            const database = event.target.result;
            if(!database.objectStoreNames.contains("users")) {
                database.createObjectStore("users", {keyPath: "id", autoIncrement: true});
            }
        };
        request.onerror = event => reject(event.target.error);
        request.onsuccess = event => resolve(event.target.result);
    });
}

export const findAll = createAsyncThunk("users/findAll",
    /**
     * @param {IDBDatabase} database
     * @returns {Promise<User[]>}
     */
    async (database) => {
        const transaction = database.transaction("users", "readonly");
        const store = transaction.objectStore("users");

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }
);

export const findById = createAsyncThunk("users/findById",
    /**
     * @param {{ database: IDBDatabase, id: Number }} payload
     * @returns {Promise<User>}
     */
    async (database, id) => {
        const transaction = database.transaction('users', 'readonly');
        const store = transaction.objectStore('users');

        return new Promise((resolve, reject) => {
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }
);

export const save = createAsyncThunk("users/save",
    /**
     * @param {{ database: IDBDatabase, user: User }} payload
     * @returns {Promise<User[]>}
     */
    async ({database, user}) => {
        const transaction = database.transaction("users", "readwrite");
        const store = transaction.objectStore("users");

        return new Promise((resolve, reject) => {
            const request = store.add(user);
            request.onsuccess = () => resolve(user);
            request.onerror = (event) => reject(event.target.error);
        });
    }
);

export const update = createAsyncThunk("users/update",
    /**
     * @param {{ database: IDBDatabase, user: User }} payload
     * @returns {Promise<User[]>}
     */
    async ({database, user}) => {
        const transaction = database.transaction("users", "readwrite");
        const store = transaction.objectStore("users");
        return new Promise((resolve, reject) => {
            const getRequest = store.get(user.id);
            getRequest.onsuccess = () => {
                const data = getRequest.result;
                Object.assign(data, user);
                const putRequest = store.put(data);
                putRequest.onsuccess = () => resolve(data);
                putRequest.onerror = event => reject(event.target.error);
            }
            getRequest.onerror = event => reject(event.target.error);
        });
    }
);

export const deleteById = createAsyncThunk("users/deleteById",
    /**
     * @param {{ database: IDBDatabase, id: Number }} payload
     * @returns {Promise<Number>}
     */
    async ({database, id}) => {
        const transaction = database.transaction("users", "readwrite");
        const store = transaction.objectStore("users");
        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onsuccess = () => resolve(id);
            request.onerror = (event) => reject(event.target.error);
        });
    }
);
