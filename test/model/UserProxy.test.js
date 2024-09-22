//
//  UserProxy.test.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { describe, expect, beforeEach, it } from "vitest";
import {UserProxy} from "../../src/js/model/UserProxy.js";
import {UserVO} from "../../src/js/model/valueObject/UserVO.js";
import {DeptEnum} from "../../src/js/model/enum/DeptEnum.js";

describe("UserProxy", () => {
    let userProxy;

    beforeEach(() => {
        let users = [
            new UserVO("lstooge","Larry", "Stooge", "larry@stooges.com", "ijk456", DeptEnum.ACCT),
            new UserVO("cstooge","Curly", "Stooge", "curly@stooges.com", "xyz987", DeptEnum.SALES ),
            new UserVO("mstooge","Moe", "Stooge", "moe@stooges.com", "abc123", DeptEnum.PLANT )
        ];
        userProxy = new UserProxy(users);
    });

    it("should fetch all users", async () => {
        const users = await userProxy.findAllUsers();
        expect(users).toHaveLength(3);
    });

    it("should fetch user by username", async () => {
        let user = await userProxy.findUserByUsername("lstooge");
        expect(user.username).toEqual("lstooge");

        user = await userProxy.findUserByUsername("cstooge");
        expect(user.username).toEqual("cstooge");

        user = await userProxy.findUserByUsername("mstooge");
        expect(user.username).toEqual("mstooge");

        user = await userProxy.findUserByUsername("sstooge");
        expect(user).toEqual(undefined);
    });

    it("should add a new user", async () => {
        const newUser = new UserVO("sshemp", "Shemp", "Stooge", "shemp@stooges.com", "xyz987", DeptEnum.PLANT);

        await userProxy.add(newUser);
        const user = await userProxy.findUserByUsername("sshemp");
        expect(user).toEqual(newUser);
    });

    it("should update a user", async () => {
        const updatedUser = new UserVO("lstooge","Larry1", "Stooge", "larry@stooges.com", "ijk456",DeptEnum.ACCT)
        await userProxy.update(updatedUser);

        const user = await userProxy.findUserByUsername("lstooge");
        expect(user).toEqual(updatedUser);
    });

    it("should delete user by username", async () => {
        await userProxy.deleteUserByUsername("cstooge");
        expect(await userProxy.findAllUsers()).toHaveLength(2);
    });

    it("should fetch all departments", async () => {
        const departments = await userProxy.findAllDepartments();
        expect(departments).toHaveLength(6);
    });

});
