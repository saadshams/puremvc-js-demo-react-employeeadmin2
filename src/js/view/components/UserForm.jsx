//
//  UserForm.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/form.module.css"
import {useEffect, useRef, useState} from "react";
import {User} from "../../model/valueObject/User.js";
import {Department} from "../../model/valueObject/Department.js";
import {useFindAllDepartmentsQuery, useSaveMutation, useUpdateMutation} from "../../model/service/userService.js";
import PropTypes from "prop-types";

/**
 * UserForm component
 *
 * @param {Object} props - The component props
 * @param {User} props.user - The user object
 * @param {function} props.setUser - Function to set the user
 * @returns {JSX.Element} The rendered component
 */
export const UserForm = ({user, setUser}) => {

	const departments = useFindAllDepartmentsQuery(); // Application Data
	const confirm = useRef(null); // Input/Form Data
	const [save] = useSaveMutation();
	const [update] = useUpdateMutation();
	const [error, setError] = useState(null);

	useEffect(() => {
		if (user.id !== 0)
			confirm.current.value = user.password;
	}, [user]);

	const onChange = (event) => {
		const {id, value} = event.target;
		setUser(state => ({ // update fields
			...state, [id]: id === "department" ? departments.data.find(d => d.id === parseInt(value)) : value
		}));
	}

	const onSave = async () => {
		try {
			user.id === 0 ? await save(user).unwrap() : await update(user).unwrap();
			confirm.current.value = "";
			setUser(User.create());
		} catch(e) {
			console.log(e);
		}
	}

	const onCancel = () => {
		setUser(User.create());
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
								<input ref={confirm} id="confirm" type="password" value={user.confirm} onChange={onChange} required/>
							</li>
							<li>
								<label htmlFor="department">Department:</label>
								<select id="department" value={user.department.id} onChange={onChange}>
									<option value={Department.NONE_SELECTED.id}>{Department.NONE_SELECTED.name}</option>
									{departments.isSuccess && departments.data.map(department => (
										<option key={`department_${department.id}`}
										        value={department.id}>{department.name}</option>
									))}
								</select>
							</li>
						</ul>
					</main>
					<footer>
						<button className="primary" disabled={!User.isValid(user, confirm.current)}
						        onClick={() => onSave()}>{user.id === 0 ? "Save" : "Update"}</button>
						<button className="outline-primary" onClick={() => onCancel()}>Cancel
						</button>
					</footer>
				</div>
			)}
		</section>
	)
};

UserForm.propTypes = {
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
};
