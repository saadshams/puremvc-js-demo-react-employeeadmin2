//
//  UserProxy.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Proxy} from "@puremvc/puremvc-js-multicore-framework";
import {DeptEnum} from "./enum/DeptEnum.js";

export class UserProxy extends Proxy {

    static get NAME() { return "UserProxy" }
a
    constructor(data) {
        super(UserProxy.NAME, data);
    }

    async findAllUsers(){
        return new Promise(resolve => {
            resolve(this.users);
        });
    }

    findUserByUsername(username) {
        return new Promise(resolve => {
            resolve(this.users.find(u => u.username === username));
        });
    }

    add(user) {
        this.users.push(user);
    }

    update(user) {
        this.users = this.users.map(u => u.username === user.username ? user : u);
    }

    deleteUserByUsername(username) {
        this.users = this.users.filter(u => u.username !== username);
    }

    async findAllDepartments() {
        return new Promise(resolve => {
            resolve(DeptEnum.comboList);
        });
    }

    /** @returns {User[]} */
    get users() {
        return this.data;
    }

    set users(value) {
        this.data = value;
    }

}
