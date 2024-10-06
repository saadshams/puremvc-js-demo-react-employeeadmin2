//
//  StartupUseCase.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {ApplicationConstants} from "../ApplicationConstants.js";

export class StartupUseCase {

    execute() {
        const request = indexedDB.open(ApplicationConstants.DATABASE, 1);
        request.onerror = event => console.error(event.target.error);
        // request.onsuccess = event => console.log(event.target.result);

        request.onupgradeneeded = event => {
            const database = event.target.result;

            Object.keys(this.stores).forEach(key => {
                if (database.objectStoreNames.contains(key) === false) {
                    database.createObjectStore(key, {keyPath: "id", autoIncrement: true});
                }
            });

            const transaction = event.target.transaction;
            transaction.oncomplete = () => {
                const transaction = database.transaction(Object.keys(this.stores), "readwrite");
                Object.entries(this.stores).forEach(([key, value]) => {
                    let store = transaction.objectStore(key);
                    value.forEach(item => store.add(item));
                });
            }
            transaction.onerror = event => console.error(event.target.error);
        };
    }

    departments = [
        {id: 1, name: "Accounting"},
        {id: 2, name: "Sales"},
        {id: 3, name: "Plant"},
        {id: 4, name: "Shipping"},
        {id: 5, name: "Quality Control"}
    ];

    roles = [
        {id: 1, name: "Administrator"},
        {id: 2, name: "Accounts Payable"},
        {id: 3, name: "Accounts Receivable"},
        {id: 4, name: "Employee Benefits"},
        {id: 5, name: "General Ledger"},
        {id: 6, name: "Payroll"},
        {id: 7, name: "Inventory"},
        {id: 8, name: "Production"},
        {id: 9, name: "Quality Control"},
        {id: 10, name: "Sales"},
        {id: 11, name: "Orders"},
        {id: 12, name: "Customers"},
        {id: 13, name: "Shipping"},
        {id: 14, name: "Returns"}
    ];

    users = [
        {id: 1, username: "lstooge", first: "Larry", last: "Stooge", email: "larry@stooges.com", password: "ijk456",
            department: this.departments[0], roles: [this.roles[3], this.roles[5]]},
        {id: 2, username: "cstooge", first: "Curly", last: "Stooge", email: "curly@stooges.com", password: "xyz987",
            department: this.departments[1], roles: [this.roles[1], this.roles[2]]},
        {id: 3, username: "mstooge", first: "Moe", last: "Stooge", email: "moe@stooges.com", password: "abc123",
            department: this.departments[2], roles: [this.roles[7], this.roles[9], this.roles[12]]}
    ];

    stores = {
        "departments": this.departments,
        "roles": this.roles,
        "users": this.users
    };

}
