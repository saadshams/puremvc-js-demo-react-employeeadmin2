//
//  User.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Department} from "./Department";
import {Role} from "./Role.js";

export class User {

    /**
     * @param {number} id
     * @param {string} username
     * @param {string} first
     * @param {string} last
     * @param {string} email
     * @param {string} password
     * @param {Department} department
     * @param {Role[]} roles
     */
    constructor(id = 0, username = "", first = "", last= "", email = "", password= "", department = Department.NONE_SELECTED, roles = []) {
        this.id = id;
        this.username = username;
        this.first = first;
        this.last = last;
        this.email = email;
        this.password = password;
        this.confirm = password;
        this.department = department;
        this.roles = roles;
    }

    static fromJson({id, username, first, last, email, password, department, roles}) {
        return new User(id, username, first, last, email, password, Department.fromJson(department), roles ? roles.map(r => Role.fromJson(r)) : []);
    }

    static isValid(user) {
        return user.username !== "" && user.first !== "" && user.last !== "" && user.email !== "" &&
            user.password !== "" && user.password === user.confirm && user.department.id !== 0;
    }

}
