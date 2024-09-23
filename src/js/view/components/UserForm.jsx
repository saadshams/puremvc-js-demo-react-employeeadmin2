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
import {User} from "../../model/valueObject/User";
import {Department} from "../../model/valueObject/Department.js";

export const UserForm = () => {

	const [departments, setDepartments] = useState([]); // UI Data
	const [user, setUser] = useState(new User()); // User/Service/Input/Form Data
	const [error, setError] = useState(null);

	/**
	 * @typedef {Object} UserForm
	 * @property {string} SAVE
	 * @property {string} UPDATE
	 * @property {string} CANCEL
	 * @property {(departments: Department[]) => void} setDepartments
	 * @property {(user: User) => void} setUser
	 * @property {(error: string) => void} setError
	 * @property {() => void} reset
	 */
	const component = useMemo(() => ({
		SAVE: "events/user/form/save",
		UPDATE: "events/user/form/update",
		CANCEL: "events/user/form/cancel",

		setDepartments: setDepartments,
		setUser: setUser,
		setError: setError,
		reset: () => {
			setUser(new User());
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
			...state, [id]: id === "department" ? departments.find(d => d.id === parseInt(value)) : value
		}));
	}

	const onSave = () => {
		delete user.roles; // update user fields only without roles, roles are saved/updated separately.
		const type = user.id === 0 ? component.SAVE : component.UPDATE;
		dispatchEvent(new CustomEvent(type, {detail: user}));
		setUser(new User());
	}

	const onCancel = () => {
		setUser(new User());
		dispatchEvent(new CustomEvent(component.CANCEL));
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
									<option value={Department.NONE_SELECTED.id}>{Department.NONE_SELECTED.name}</option>
									{departments.map(department => (
										<option key={`department_${department.id}`}
										        value={department.id}>{department.name}</option>
									))}
								</select>
							</li>
						</ul>
					</main>
					<footer>
						<button className="primary" disabled={!User.isValid(user)}
						        onClick={() => onSave()}>{user.id === 0 ? "Save" : "Update"}</button>
						<button className="outline-primary" onClick={() => onCancel()}>Cancel
						</button>
					</footer>
				</div>
			)}
		</section>
	)
};
