//
//  UserForm.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/form.module.css"
import {useEffect, useMemo, useState} from "react";
import {ApplicationConstants} from "../../ApplicationConstants";
import {UserVO} from "../../model/valueObject/UserVO.js";

export class UserFormEvents {
	static SAVE   = "events/user/form/save";
	static UPDATE = "events/user/form/update";
	static CANCEL = "events/user/form/cancel";
}

export const UserForm = () => {

	const [departments, setDepartments] = useState([]); // UI Data
	const [user, setUser] = useState(new UserVO()); // UserVO/Service/Input/Form Data
	const [editMode, setEditMode] = useState(false);
	const [error, setError] = useState(null);

	/**
	 * @typedef {Object} UserForm
	 * @property {(departments: DeptEnum[]) => void} setDepartments
	 * @property {(user: UserVO) => void} setUser
	 * @property {(error: string) => void} setError
	 * @property {() => void} reset
	 */
	const component = useMemo(() => ({
		setDepartments: setDepartments,
		setUser: (u) => {
			setEditMode(u.username !== "");
			setUser(u);
		},
		setError: setError,
		reset: () => {
			setEditMode(false);
			setUser(new UserVO());
		}
	}), [setDepartments, setUser, setError]);

	useEffect(() => {
		dispatchEvent(new CustomEvent(ApplicationConstants.USER_FORM_MOUNTED, {detail: component}));
		return () => {
			dispatchEvent(new CustomEvent(ApplicationConstants.USER_FORM_UNMOUNTED));
		}
	}, [component]);

	const onChange = (event) => {
		const {id, value} = event.target;
		setUser(state => ({ // update fields
			...state, [id]: id === "department" ? departments.find(d => d.id === parseInt(value, 10)) : value
		}));
	}

	const onSave = () => {
		delete user.roles; // update user fields only without roles, roles are saved/updated separately.
		const type = editMode === false ? UserFormEvents.SAVE : UserFormEvents.UPDATE;
		dispatchEvent(new CustomEvent(type, {detail: user}));
		setUser(new UserVO());
	}

	const onCancel = () => {
		setEditMode(false);
		setUser(new UserVO());
		dispatchEvent(new CustomEvent(UserFormEvents.CANCEL));
	}

	return (
		<section id="form">
			{error ? (
				<div className={styles.form}>
					<header><h2>User Form</h2></header>
					<main>Error: {error.message}</main>
				</div>
			) : (
				<div className={styles.form}>
					<header>
						<h2>User Form</h2>
					</header>
					<main>
						<ul>
							<li>
								<label htmlFor="first">First Name:</label>
								<input id="first" type="text" value={user.first} onChange={onChange} required/>
							</li>
							<li>
								<label htmlFor="last">Last Name:</label>
								<input id="last" type="text" value={user.last} onChange={onChange} required/>
							</li>
							<li>
								<label htmlFor="email">Email:</label>
								<input id="email" type="email" value={user.email} onChange={onChange} required/>
							</li>
							<li>
								<label htmlFor="username">Username:</label>
								<input id="username" type="text" value={user.username} onChange={onChange} required/>
							</li>
							<li>
								<label htmlFor="password">Password:</label>
								<input id="password" type="password" value={user.password} onChange={onChange} required/>
							</li>
							<li>
								<label htmlFor="confirm">Confirm:</label>
								<input id="confirm" type="password" value={user.confirm} onChange={onChange} required/>
							</li>
							<li>
								<label htmlFor="department">Department:</label>
								<select id="department" value={user.department.id} onChange={onChange}>
									{departments.map(department => (
										<option key={`department_${department.id}`}
										        value={department.id}>{department.name}</option>
									))}
								</select>
							</li>
						</ul>
					</main>
					<footer>
						<button className="primary" disabled={!UserVO.isValid(user)}
						        onClick={() => onSave()}>{editMode === false ? "Save" : "Update"}</button>
						<button className="outline-primary" onClick={() => onCancel()}>Cancel
						</button>
					</footer>
				</div>
			)}
		</section>
	)
};
