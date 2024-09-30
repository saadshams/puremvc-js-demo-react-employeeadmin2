//
//  Role.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

/**
 * @typedef {Object} Role
 * @property {number} id
 * @property {string} name
 */
export class Role {

	static NONE_SELECTED = Role.create(0, "---None Selected---");

	static create(id = 0, name = "") {
		return {id, name};
	}

}
