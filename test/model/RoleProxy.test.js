//
//  RoleProxy.test.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { beforeEach, describe, expect, it } from "vitest";
import {RoleProxy} from "../../src/js/model/RoleProxy.js";
import {RoleEnum} from "../../src/js/model/enum/RoleEnum.js";
import {RoleVO} from "../../src/js/model/valueObject/RoleVO.js";

describe("RoleProxy", () => {
    let roleProxy;

    beforeEach(() => {
        let roles = [
            new RoleVO( "lstooge", [RoleEnum.PAYROLL, RoleEnum.EMP_BENEFITS]),
            new RoleVO( "cstooge", [RoleEnum.ACCT_PAY, RoleEnum.ACCT_RCV, RoleEnum.GEN_LEDGER]),
            new RoleVO( "mstooge", [RoleEnum.INVENTORY, RoleEnum.PRODUCTION, RoleEnum.SALES, RoleEnum.SHIPPING])
        ];
        roleProxy = new RoleProxy(roles);
    });

    it("should fetch all roles", async () => {
        const result = await roleProxy.findAllRoles();
        expect(result).toHaveLength(15);
    });

    it("should fetch and return roles by user id", async () => {
        const username = "lstooge";
        const result = await roleProxy.findRolesByUsername(username);
        expect(result.username).toEqual(username);
        expect(result.roles.length).toEqual(2);
        expect(result.roles[0]).toEqual(RoleEnum.PAYROLL);
        expect(result.roles[1]).toEqual(RoleEnum.EMP_BENEFITS);
    });

    it("should return empty roles for a non-existent username", async () => {
        const username = "sshemp";
        await expect(await roleProxy.findRolesByUsername(username)).toEqual(new RoleVO("sshemp", []))
    });

    it("should update roles for a user by id", async () => {
        const roles = [{id: 1, name: "Administrator"}, {id: 2, name: "Accounts Payable"}];
        const username = "lstooge";
        const result = await roleProxy.updateRolesByUsername(username, roles);
        expect(result.username).toEqual(username);
        expect(result.roles).toHaveLength(2);
        expect(result.roles[0]).toEqual(roles[0]);
        expect(result.roles[1]).toEqual(roles[1]);
    });

    it("should add if username doesn't exists", async () => {
        const username = "sshemp";
        const roles = [{id: 1, name: "Administrator"}, {id: 2, name: "Accounts Payable"}];
        const result = await roleProxy.updateRolesByUsername(username, roles);
        expect(result.username).toEqual(username);
        expect(result.roles).toHaveLength(2);
        expect(result.roles[0]).toEqual(roles[0]);
        expect(result.roles[1]).toEqual(roles[1]);
    });

});
