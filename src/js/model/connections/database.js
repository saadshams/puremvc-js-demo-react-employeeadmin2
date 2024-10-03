//
//  database.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {ApplicationConstants} from "../../ApplicationConstants.js";

/** @returns {Promise<IDBDatabase>} */
export const getConnection = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(ApplicationConstants.DATABASE, 1);
        request.onupgradeneeded = event => {
            const database = event.target.result;
            if(database.objectStoreNames.contains("users") === false) {
                database.createObjectStore("users", {keyPath: "id", autoIncrement: true});
            }
            if(database.objectStoreNames.contains("departments") === false) {
                database.createObjectStore("departments", {keyPath: "id", autoIncrement: true});
            }
            if(database.objectStoreNames.contains("roles") === false) {
                database.createObjectStore("roles", {keyPath: "id", autoIncrement: true});
            }
        };
        request.onerror = event => reject(event.target.error);
        request.onsuccess = event => resolve(event.target.result);
    });
}