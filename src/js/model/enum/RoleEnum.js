//
//  RoleEnum.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

export class RoleEnum {

	static NONE_SELECTED = new RoleEnum(0, "---None Selected---");
	static ADMIN = new RoleEnum(1, "Administrator");
	static ACCT_PAY= new RoleEnum(2, "Accounts Payable");
	static ACCT_RCV= new RoleEnum(3, "Accounts Receivable");
	static EMP_BENEFITS= new RoleEnum(4, "Employee Benefits");
	static GEN_LEDGER= new RoleEnum(5, "General Ledger");
	static PAYROLL= new RoleEnum(6, "Payroll");
	static INVENTORY= new RoleEnum(7, "Inventory");
	static PRODUCTION= new RoleEnum(8, "Production");
	static QUALITY_CTL= new RoleEnum(9, "Quality Control");
	static SALES= new RoleEnum(10, "Sales");
	static ORDERS= new RoleEnum(11, "Orders");
	static CUSTOMERS= new RoleEnum(12, "Customers");
	static SHIPPING= new RoleEnum(13, "Shipping");
	static RETURNS= new RoleEnum(14, "Returns");

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
			RoleEnum.ADMIN,
			RoleEnum.ACCT_PAY,
			RoleEnum.ACCT_RCV,
			RoleEnum.EMP_BENEFITS,
			RoleEnum.GEN_LEDGER,
			RoleEnum.PAYROLL,
			RoleEnum.INVENTORY,
			RoleEnum.PRODUCTION,
			RoleEnum.QUALITY_CTL,
			RoleEnum.SALES,
			RoleEnum.ORDERS,
			RoleEnum.CUSTOMERS,
			RoleEnum.SHIPPING,
			RoleEnum.RETURNS
		];
	}

	static get comboList() {
		let cList = RoleEnum.list;
		cList.unshift(RoleEnum.NONE_SELECTED);
		return cList;
	}

}
