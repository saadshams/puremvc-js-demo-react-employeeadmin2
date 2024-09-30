//
//  RoleProxy.test.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { beforeEach, describe, expect, it, vi } from "vitest";
import {ApplicationConstants} from "../../src/js/ApplicationConstants.js";
import {RoleProxy} from "../../src/js/model/RoleProxy.js";
import {Role} from "../../src/js/model/valueObject/Role.js";

vi.mock("../../src/js/model/valueObject/Role.js", () => ({
    Role: {
        NONE_SELECTED: {id: 0, name: "---None Selected---"},
        fromJson: vi.fn((json) => json)
    }
}));

globalThis.fetch = vi.fn();

describe("RoleProxy", () => {
    let roleProxy;

    beforeEach(() => {
        roleProxy = new RoleProxy();
        vi.clearAllMocks();
    });

    it("should fetch all roles", async () => {
        const mockRoles = [{id: 1, name: "Accounting"}, {id: 2, name: "Sales"}];
        fetch.mockResolvedValueOnce({
            status: 200,
            json: vi.fn().mockResolvedValue(mockRoles)
        });

        const result = await roleProxy.findAllRoles();
        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/roles`, { method: "GET" });
        expect(Role.fromJson).toHaveBeenCalledTimes(2);
        expect(result.length).toEqual(2);
        expect(result[0]).toEqual(mockRoles[0]);
        expect(result[1]).toEqual(mockRoles[1]);
    });

    it("should throw error for fetch all roles", async () => {
        const mockError = {message: "Failed to fetch roles"};
        fetch.mockResolvedValueOnce({
            status: 500,
            json: vi.fn().mockResolvedValue(mockError)
        });

        await expect(roleProxy.findAllRoles()).rejects.toThrow("Failed to fetch roles");
        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/roles`, {method: "GET"});
    });

    it("should fetch and return roles by user id", async () => {
        const mockRoles = [{id: 1, name: "Administrator"}, {id: 2, name: "Accounts Payable"}];
        const id = 1;
        fetch.mockResolvedValueOnce({
            status: 200,
            json: vi.fn().mockResolvedValue(mockRoles)
        });

        const result = await roleProxy.findRolesById(id);

        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/users/${id}/roles`, { method: "GET" });
        expect(Role.fromJson).toHaveBeenCalledTimes(2);
        expect(result[0]).toEqual(mockRoles[0]);
        expect(result[1]).toEqual(mockRoles[1]);
    });

    it("should throw an error if fetching roles by user id fails", async () => {
        const mockError = { message: "Failed to fetch roles for user" };
        const id = 123;
        fetch.mockResolvedValueOnce({
           status: 404,
            json: vi.fn().mockResolvedValue(mockError)
        });

        await expect(roleProxy.findRolesById(id)).rejects.toThrow("Failed to fetch roles for user");
        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/users/${id}/roles`, { method: "GET" });
    });

    it("should update roles for a user by id", async () => {
        const mockRoles = [{id: 1, name: "Administrator"}, {id: 2, name: "Accounts Payable"}];
        const id = 1;
        fetch.mockResolvedValue({
            status: 200,
            json: vi.fn().mockResolvedValue(mockRoles)
        });

        const result = await roleProxy.updateRolesById(id, mockRoles);
        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/users/${id}/roles`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(mockRoles),
        });
        expect(Role.fromJson).toHaveBeenCalledTimes(2);
        expect(result[0]).toEqual(mockRoles[0]);
        expect(result[1]).toEqual(mockRoles[1]);
    });

    it("should throw an error if updating roles for a user id fails", async () => {
        const mockError = { message: "Failed to update roles for user" };
        const id = 123;
        const mockRoles = [{id: 1, name: "Administrator"}, {id: 2, name: "Accounts Payable"}];

        fetch.mockResolvedValue({
            status: 500,
            json: vi.fn().mockResolvedValue(mockError)
        });

        await expect(roleProxy.updateRolesById(id, mockRoles)).rejects.toThrow("Failed to update roles for user");
        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/users/${id}/roles`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(mockRoles)
        });
    });

});
