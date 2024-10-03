//
//  StartupUseCase.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {getConnection} from "../model/connections/database.js";
import {save, saveDepartment} from "../model/data/userData.js";
import {save as saveRole} from "../model/data/roleData.js";

export class StartupUseCase {

    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    execute() {
        (async () => {
            const database = await getConnection();

            const departments = [
                {id: 1, name: "Accounting"}, {id: 2, name: "Sales"},
                {id: 3, name: "Plant"}, {id: 4, name: "Shipping"},
                {id: 5, name: "Quality Control"}
            ]
            await Promise.all(departments.map(department => this.dispatch(saveDepartment({database, department}))));

            const users = [
                {id: 1, username: "lstooge", first: "Larry", last: "Stooge", email: "larry@stooges.com", password: "ijk456", department: {id: 1, name: "Accounting"}},
                {id: 2, username: "cstooge", first: "Curly", last: "Stooge", email: "curly@stooges.com", password: "xyz987", department: {id: 2, name: "Sales"}},
                {id: 3, username: "mstooge", first: "Moe", last: "Stooge", email: "moe@stooges.com", password: "abc123", department: {id: 3, name: "Plant"}}
            ];
            await Promise.all(users.map(user => this.dispatch(save({database, user}))));

            const roles = [
                {id: 1, name: "Administrator"},
                {id: 2, name: "Accounts Payable"},
                {id: 3, name: "Accounts Receivable"},
                {id: 4, name: "Employee Benefits"},
                {id: 5, name: "Payroll"},
                {id: 6, name: "Inventory"},
                {id: 7, name: "Production"},
                {id: 8, name: "Quality Control"},
                {id: 9, name: "Sales"},
                {id: 10, name: "Orders"},
                {id: 11, name: "Customers"},
                {id: 12, name: "Shipping"},
                {id: 13, name: "Returns"},
            ];
            await Promise.all(roles.map(role => this.dispatch(saveRole({database, role}))));
        })();
    }

}
