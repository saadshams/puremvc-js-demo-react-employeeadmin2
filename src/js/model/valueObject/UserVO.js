//
//  UserVO.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {DeptEnum} from "../enum/DeptEnum.js";

export class UserVO {

    /**
     * @param {string} username
     * @param {string} first
     * @param {string} last
     * @param {string} email
     * @param {string} password
     * @param {DeptEnum} department
     */
    constructor(username = "", first = "", last= "", email = "", password= "", department = DeptEnum.NONE_SELECTED) {
        this.username = username;
        this.first = first;
        this.last = last;
        this.email = email;
        this.password = password;
        this.confirm = password;
        this.department = department;
    }

    static isValid(user) {
        return user.username !== "" && user.first !== "" && user.last !== "" && user.email !== "" &&
            user.password !== "" && user.password === user.confirm && user.department.id !== 0;
    }

}
