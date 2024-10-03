//
//  userData.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApplicationConstants} from "../../ApplicationConstants.js";

/** @returns {Promise<IDBDatabase>} */
export const getConnection = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("employeeadmin", 1);
        request.onupgradeneeded = event => {
            const database = event.target.result;
            if(!database.objectStoreNames.contains("users")) {
                database.createObjectStore("users", {keyPath: "id", autoIncrement: true});
            }
            if(!database.objectStoreNames.contains("departments")) {
                database.createObjectStore("departments", {keyPath: "id", autoIncrement: true});
            }
        };
        request.onerror = event => reject(event.target.error);
        request.onsuccess = event => resolve(event.target.result);
    });
}

export const findAll = createAsyncThunk("users/findAll",
    /**
     * @param {{database: IDBDatabase}} payload
     * @returns {Promise<User[]>}
     */
    async ({database}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readonly");
            const store = transaction.objectStore("users");
            transaction.onerror = (event) => reject(event.target.error);

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
    async ({database, id}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readonly");
            const store = transaction.objectStore("users");
            transaction.onerror = (event) => reject(event.target.error);

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
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readwrite");
            const store = transaction.objectStore("users");
            transaction.onerror = (event) => reject(event.target.error);

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
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readwrite");
            const store = transaction.objectStore("users");
            transaction.onerror = (event) => reject(event.target.error);

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
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("users", "readwrite");
            const store = transaction.objectStore("users");
            transaction.onerror = (event) => reject(event.target.error);

            const request = store.delete(id);
            request.onsuccess = () => resolve(id);
            request.onerror = (event) => reject(event.target.error);
        });
    }
);

export const saveDepartment = createAsyncThunk("departments/save",
    /**
     * @param {{ database: IDBDatabase, department: Department }} payload
     * @returns {Promise<Department>}
     */
    async ({database, department}) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("departments", "readwrite");
            const store = transaction.objectStore("departments");
            transaction.onerror = (event) => reject(event.target.error);

            const request = store.add(department);
            request.onsuccess = () => resolve(department);
            request.onerror = (event) => reject(event.target.error);
        });
    }
);

const userData = createSlice({
    name: "userData",
    initialState: {
        users: [],
        status: ApplicationConstants.IDLE,
        error: null,
        departments: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findAll.pending, state => {
                state.status = ApplicationConstants.LOADING;
            })
            .addCase(findAll.fulfilled, (state, action) => {
                state.status = ApplicationConstants.SUCCEEDED;
                state.users = action.payload;
            })
            .addCase(findAll.rejected, (state, action) => {
                state.status = ApplicationConstants.FAILED;
                state.error = action.error.message;
            });

        builder
            .addCase(save.fulfilled, (state, action) => {
                state.users.push(action.payload);
            });

        builder
            .addCase(update.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1)
                    state.users[index] = action.payload;
            });

        builder
            .addCase(deleteById.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            });

        builder.addCase(saveDepartment.fulfilled, (state, action) => {
            state.departments.push(action.payload);
        });
    }
});

export default userData.reducer;
