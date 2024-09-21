//
//  RoleProxy.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Proxy} from "@puremvc/puremvc-js-multicore-framework";
import {ApplicationConstants} from "../ApplicationConstants";
import {Role} from "./valueObject/Role";

export class RoleProxy extends Proxy {

	static get NAME() { return "RoleProxy" }

	constructor() {
		super(RoleProxy.NAME, null);
	}

	async findAllRoles() {
		const response = await fetch(`${ApplicationConstants.API_URL}/roles`, {method: "GET"});
		if (response.status === 200) {
			const json = await response.json();
			return json.map(role => Role.fromJson(role));
		} else {
			const error = await response.json();
			throw new Error(error.message);
		}
	}

	async findRolesById(id) {
		const response = await fetch(`${ApplicationConstants.API_URL}/users/${id}/roles`, {method: "GET"});
		if (response.status === 200) {
			const json = await response.json();
			return json.map(role => Role.fromJson(role));
		} else {
			const error = await response.json();
			throw new Error(error.message);
		}
	}

	async updateRolesById(id, roles) {
		const response = await fetch(`${ApplicationConstants.API_URL}/users/${id}/roles`, { method: "PUT",
			headers: {"content-type": "application/json"},
			body: JSON.stringify(roles)
		});

		if (response.status === 200) {
			const json = await response.json();
			return json.map(role => Role.fromJson(role));
		} else {
			const error = await response.json();
			throw new Error(error.message);
		}
	}

}
