//
//  UserRole.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/role.module.css"
import {useState} from "react";
import PropTypes from "prop-types";
import {useFindAllQuery, useFindByIdQuery, useUpdateByIdMutation} from "../../model/service/roleService.js";
import {Role} from "../../model/valueObject/Role";

/**
 * UserRole component
 *
 * @param {Object} props - The component props
 * @param {User} props.user - The user object
 * @returns {JSX.Element} The rendered component
 */
export const UserRole = ({user}) => {

	const roles = useFindAllQuery(); // Application Data
	const findById = useFindByIdQuery(user); // User Data
	const [formData, setFormData] = useState(Role.NONE_SELECTED); // Form Data

	const [update] = useUpdateByIdMutation(); // Actions

	const onChange = (event) => {
		setFormData(roles.data.find(r => r.id === parseInt(event.target.value)));
	}

	const onAdd = async () => {
		const data = [...findById.data, roles.data.find(r => r.id === formData.id)];
		await update({id: user.id, roles: data}).unwrap();
		reset();
	};

	const onRemove = async () => {
		const data = findById.data.filter(r => r.id !== formData.id);
		await update({id: user.id, roles: data}).unwrap();
		reset();
	};

	const reset = () => {
		setFormData(Role.NONE_SELECTED);
	}

	return (
		<section id="role">
			<div className={styles.role}>
				<header>
					<h2>User Roles</h2>
				</header>
				<main>
					<ul>
						{findById.data && findById.data.map(r => (
							<li key={`role_${r.id}`}>{r.name}</li>
						))}
					</ul>
				</main>
				<footer>
					<label htmlFor="roles"></label>
					<select id="roles" value={formData.id} onChange={onChange}>
						<option value={Role.NONE_SELECTED.id}>{Role.NONE_SELECTED.name}</option>
						{roles.isSuccess && roles.data.map(r => (
							<option key={`role_option${r.id}`} value={r.id}>{r.name}</option>
						))}
					</select>
					<button id="add" className="primary" onClick={() => onAdd()}
					        disabled={formData === Role.NONE_SELECTED}>Add</button>
					<button id="remove" className="outline-primary" onClick={() => onRemove()}
					        disabled={formData === Role.NONE_SELECTED}>Remove</button>
					<div className={styles.error}>
						{roles.isError && roles.error.message}
						{findById.isError && findById.error.message}
					</div>
				</footer>
			</div>
		</section>
	);
};

UserRole.propTypes = {
	user: PropTypes.object.isRequired
};
