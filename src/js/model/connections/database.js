//
//  database.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {ApplicationConstants} from "../../ApplicationConstants.js";

let connection = null;

/** @returns {Promise<IDBDatabase>} */
export const getConnection = () => {
    if (connection)
        return Promise.resolve(connection);

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(ApplicationConstants.DATABASE, 1);
        request.onerror = event => reject(event.target.error);
        request.onsuccess = event => {
            connection = event.target.result;
            resolve(connection);
        };
    });
}
