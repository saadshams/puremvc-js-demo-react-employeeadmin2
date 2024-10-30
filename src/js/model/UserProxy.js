//
//  UserProxy.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Proxy} from "@puremvc/puremvc-js-multicore-framework";
import {ApplicationConstants} from "../ApplicationConstants";
import {User} from "./valueObject/User";
import {Department} from "./valueObject/Department";
import {firestore} from "./connections/firebase.js";
import {collection, onSnapshot} from "firebase/firestore";
import {ApplicationFacade} from "../ApplicationFacade.js";

export class UserProxy extends Proxy {

    static get NAME() { return "UserProxy" }

    constructor() {
        super(UserProxy.NAME, null);
    }

    async onRegister() {
        onSnapshot(collection(firestore, "users"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            this.sendNotification(ApplicationFacade.LIST_USERS, data);
        });
    }

    onRemove() {
        this.unsubscribe();
    }

    async findAllUsers(){
        const response = await fetch(`${ApplicationConstants.API_URL}/users`, {method: "GET"});
        if (response.status === 200) {
            const json = await response.json();
            return json.map(user => User.fromJson(user));
        } else {
            const error = await response.json();
            throw new Error(error.message);
        }
    }

    async findUserById(id) {
        const response = await fetch(`${ApplicationConstants.API_URL}/users/${id}`, {method: "GET"});
        if (response.status === 200) {
            const json = await response.json();
            return User.fromJson(json);
        } else {
            const error = await response.json();
            throw new Error(error.message);
        }
    }

    async add(user) {
        const response = await fetch(`${ApplicationConstants.API_URL}/users`, { method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        });

        if (response.status === 201) {
            const json = await response.json();
            return User.fromJson(json);
        } else {
            const error = await response.json();
            throw new Error(error.message);
        }
    }

    async update(user) {
        const response = await fetch(`${ApplicationConstants.API_URL}/users/${user.id}`, { method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        });

        if (response.status === 200) {
            const json = await response.json();
            return User.fromJson(json);
        } else {
            const error = await response.json();
            throw new Error(error.message);
        }
    }

    async deleteUserById(id) {
        const response = await fetch(`${ApplicationConstants.API_URL}/users/${id}`, {method: "DELETE"});
        if (response.status !== 204) {
            const error = await response.json();
            throw new Error(error.message);
        }
    }

    async findAllDepartments() {
        const response = await fetch(`${ApplicationConstants.API_URL}/departments`, {method: "GET"});
        if (response.status === 200) {
            const json = await response.json();
            return json.map(department => Department.fromJson(department));
        } else {
            const error = await response.json();
            throw new Error(error.message);
        }
    }

}
