//
//  RoleProxy.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Proxy} from "@puremvc/puremvc-js-multicore-framework";
import {RoleEnum} from "./enum/RoleEnum.js";
import {RoleVO} from "./valueObject/RoleVO.js";

export class RoleProxy extends Proxy {

	static get NAME() { return "RoleProxy" }

	constructor(data) {
		super(RoleProxy.NAME, data);
	}

	findAllRoles() {
		return new Promise(resolve => {
			resolve(RoleEnum.comboList);
		});
	}

	findRolesByUsername(username) {
		return new Promise(resolve => {
			let result = this.roles.find(r => r.username === username);
			resolve(result ? result : new RoleVO(username, []));
		});
	}

	updateRolesByUsername(username, roles) {
		return new Promise(resolve => {
			if (this.roles.find(r => r.username === username)) {
				this.data = this.roles.map(r => r.username === username ? new RoleVO(username, roles) : r);
			} else {
				this.roles.push(new RoleVO(username, roles));
			}
			resolve(this.roles.find(r => r.username === username));
		});
	}

	/** @returns {RoleVO[]} */
	get roles() {
		return this.data;
	}

}
