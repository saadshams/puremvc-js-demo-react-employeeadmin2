//
//  User.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Department} from "./Department.js";

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} first
 * @property {string} last
 * @property {string} email
 * @property {string} password
 * @property {string} confirm
 * @property {Department} department
 * @property {Role[]} roles
 */
export class User {

    static create(id = 0, username = "", first = "", last= "", email = "", password= "", department = Department.NONE_SELECTED, roles = []) {
        return {id, username, first, last, email, password, department, roles};
    }

    static isValid(user) {
        return user.username !== "" && user.first !== "" && user.last !== "" && user.email !== "" &&
            user.password !== "" && user.password === user.confirm && user.department.id !== 0;
    }

}
