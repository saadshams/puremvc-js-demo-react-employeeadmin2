//
//  UserProxy.test.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { describe, expect, beforeEach, it, vi } from "vitest";
import {ApplicationConstants} from "../../src/js/ApplicationConstants.js";
import {UserProxy} from "../../src/js/model/UserProxy.js";
import {User} from "../../src/js/model/valueObject/User.js";
import {Department} from "../../src/js/model/valueObject/Department.js";

globalThis.fetch = vi.fn();

vi.mock("../../src/js/model/valueObject/User.js", () => ({
    User: {
        fromJson: vi.fn()
    }
}));

vi.mock("../../src/js/model/valueObject/Department.js", () => ({
    Department: {
        fromJson: vi.fn(),
        NONE_SELECTED: { id: 0, name: "---None Selected---" }
    }
}));

describe("UserProxy", () => {
    let userProxy;

    beforeEach(() => {
        userProxy = new UserProxy();
        vi.clearAllMocks();
    });

    it("should fetch all users", async () => {
        const mockUsers = [{ id: 1, first: "Larry", last: "Stooge" }];
        const response = { json: vi.fn().mockResolvedValue(mockUsers) };
        fetch.mockResolvedValue({ ...response, status: 200 });

        User.fromJson.mockImplementation(user => user);
        const users = await userProxy.findAllUsers();
        expect(users).toEqual(mockUsers.map(User.fromJson));
        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/users`, { method: "GET" });
    });

    it("findAllUsers Error", async () => {
        const mockError = { message: "Failed to fetch users" };
        const response = { json: vi.fn().mockResolvedValue(mockError) };
        fetch.mockResolvedValue({ ...response, status: 500 });

        await expect(userProxy.findAllUsers()).rejects.toThrow("Failed to fetch users");
    });

    it("should fetch user by ID", async () => {
        const mockUser = { id: 1, first: "Larry", last: "Stooge" };
        const response = { json: vi.fn().mockResolvedValue(mockUser) };
        fetch.mockResolvedValue({ ...response, status: 200 });

        User.fromJson.mockImplementation(user => user);

        const user = await userProxy.findUserById(1);
        expect(user).toEqual(User.fromJson(mockUser));
        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/users/1`, { method: "GET" });
    });

    it("should add a new user", async () => {
        const newUser = { id: 2, first: "Curly", last: "Stooge" };
        const response = { json: vi.fn().mockResolvedValue(newUser) };
        fetch.mockResolvedValue({ ...response, status: 201 });

        User.fromJson.mockImplementation(user => user);

        const user = await userProxy.add(newUser);
        expect(user).toEqual(User.fromJson(newUser));
        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/users`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newUser),
        });
    });

    it("should update a user", async () => {
        const updatedUser = { id: 1, first: "Larry", last: "Stooge" };
        const response = { json: vi.fn().mockResolvedValue(updatedUser) };
        fetch.mockResolvedValue({ ...response, status: 200 });

        User.fromJson.mockImplementation(user => user);

        const user = await userProxy.update(updatedUser);
        expect(user).toEqual(User.fromJson(updatedUser));
        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/users/1`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedUser),
        });
    });

    it("should delete user by ID", async () => {
        fetch.mockResolvedValue({ status: 204 });

        await userProxy.deleteUserById("1");
        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/users/1`, { method: "DELETE" });
    });

    it("should fetch all departments", async () => {
        const mockDepartments = [{ id: 1, name: "Accounting" }];
        const response = { json: vi.fn().mockResolvedValue(mockDepartments) };
        fetch.mockResolvedValue({ ...response, status: 200 });

        Department.fromJson.mockImplementation(department => department);

        const departments = await userProxy.findAllDepartments();
        expect(departments).toEqual(mockDepartments.map(Department.fromJson));
        expect(fetch).toHaveBeenCalledWith(`${ApplicationConstants.API_URL}/departments`, { method: "GET" });
    });

});
