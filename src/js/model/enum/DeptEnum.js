//
//  DeptEnum.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

export class DeptEnum {

	static NONE_SELECTED = new DeptEnum(0, "---None Selected---");
	static ACCT = new DeptEnum(1, "Accounting");
	static SALES = new DeptEnum(2, "Sales");
	static PLANT = new DeptEnum(3, "Plant");
	static SHIPPING = new DeptEnum(4, "Shipping");
	static QC = new DeptEnum(5, "Quality Control");

	/**
	 * @param {number} id
	 * @param {string} name
	 */
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}

	static get list() {
		return [
			DeptEnum.ACCT,
			DeptEnum.SALES,
			DeptEnum.PLANT,
			DeptEnum.SHIPPING,
			DeptEnum.QC
		];
	}

	static get comboList() {
		let cList = DeptEnum.list;
		cList.unshift(DeptEnum.NONE_SELECTED);
		return cList;
	}

}
