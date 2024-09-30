//
//  UserRole.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/role.module.css"
import {useRef, useState} from "react";
import PropTypes from "prop-types";
import {useFindAllQuery, useUpdateByIdMutation} from "../../model/service/roleService.js";
import {Role} from "../../model/valueObject/Role";

/**
 * UserRole component
 *
 * @param {Object} props - The component props
 * @param {User} props.user - The user object
 * @param {function} props.setUser - Function to set the user
 * @returns {JSX.Element} The rendered component
 */
export const UserRole = ({user, setUser}) => {

	const roles = useFindAllQuery(); // Application Data
	const [update] = useUpdateByIdMutation();
	const [role, setRole] = useState(Role.NONE_SELECTED); // Input/Form Data
	const dropdown = useRef(null);

	const onChange = (event) => {
		setRole(roles.data.find(r => r.id === parseInt(event.target.value)));
	}

	const onAdd = async () => {
		try {
			const data = [...user.roles, roles.data.find(r => r.id === role.id)];
			console.log(user.id, data);
			await update({id: user.id, roles: data}).unwrap();
			dropdown.current.selectedIndex = 0;
		} catch(e) {
			console.log(e);
		}
	};

	const onRemove = () => {
		// setUser(state => {
		// 	const data = {...state, roles: user.roles.filter(r => r.id !== role.id)};
		// 	dispatchEvent(new CustomEvent(component.UPDATE, {detail: data}));
		// 	return data;
		// });
		dropdown.current.selectedIndex = 0;
	};

	return (
		<section id="role">
			{roles.isError ? (
				<div className={styles.role}>
					<header><h2>User Roles</h2></header>
					<main>Error: {roles.error.message}</main>
				</div>
			) : (
				<div className={styles.role}>
					<header>
						<h2>User Roles</h2>
					</header>
					<main>
						<ul>
							{user && user.roles.map(r => (
								<li key={`role_${r.id}`}>{r.name}</li>
							))}
						</ul>
					</main>
					<footer>
						<label htmlFor="roles"></label>
						<select ref={dropdown} id="roles" value={role.id} onChange={onChange} disabled={user === null}>
							<option value={Role.NONE_SELECTED.id}>{Role.NONE_SELECTED.name}</option>
							{roles.isSuccess && roles.data.map(r => (
								<option key={`role_option${r.id}`} value={r.id}>{r.name}</option>
							))}
						</select>
						<button id="add" className="primary" onClick={() => onAdd()}
						        disabled={role === Role.NONE_SELECTED}>Add</button>
						<button id="remove" className="outline-primary" onClick={() => onRemove()}
						        disabled={role === Role.NONE_SELECTED}>Remove</button>
					</footer>
				</div>
			)}
		</section>
	);
};

UserRole.propTypes = {
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
};
