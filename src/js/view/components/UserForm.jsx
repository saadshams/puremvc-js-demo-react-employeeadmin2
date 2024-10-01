//
//  UserForm.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/form.module.css"
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {User} from "../../model/valueObject/User.js";
import {Department} from "../../model/valueObject/Department.js";
import {useFindByIdQuery, useSaveMutation, useUpdateMutation, useFindAllDepartmentsQuery} from "../../model/service/userService.js";

/**
 * UserForm component
 *
 * @param {Object} props - The component props
 * @param {User} props.user - The user object
 * @returns {JSX.Element} The rendered component
 */
export const UserForm = ({user}) => {

	const departments = useFindAllDepartmentsQuery(); // Application Data
	const findById = useFindByIdQuery({id: user.id}, {skip: user.id === 0}); // User Data
	const [formData, setFormData] = useState({...User.create(), confirm: ""}); // Form Data

	const [save, saveStatus] = useSaveMutation(); // Actions
	const [update, updateStatus] = useUpdateMutation();

	useEffect(() => {
		if (user.id !== 0 && findById.data) {
			setFormData({...findById.data, confirm: findById.data.password});
		} else {
			reset();
		}
	}, [findById.data, user.id]);

	const onChange = (event) => {
		const {id, value} = event.target;
		setFormData((state) => ({ // update fields
			...state, [id]: id === "department" ? departments.data.find(d => d.id === parseInt(value)) : value
		}));
	}

	const onSave = async () => {
		user.id === 0 ? await save(formData).unwrap() : await update(formData).unwrap();
		setFormData({...User.create(), confirm: ""});
	}

	const reset = () => {
		setFormData({...User.create(), confirm: ""});
	}

	return (
		<section id="form">
			<div className={styles.form}>
				<header>
					<h2>User Form</h2>
				</header>
				<main>
					<ul>
						<li>
							<label htmlFor="first">First Name:</label>
							<input id="first" type="text" value={formData.first} onChange={onChange} required/>
						</li>
						<li>
							<label htmlFor="last">Last Name:</label>
							<input id="last" type="text" value={formData.last} onChange={onChange} required/>
						</li>
						<li>
							<label htmlFor="email">Email:</label>
							<input id="email" type="email" value={formData.email} onChange={onChange} required/>
						</li>
						<li>
							<label htmlFor="username">Username:</label>
							<input id="username" type="text" value={formData.username} onChange={onChange} required/>
						</li>
						<li>
							<label htmlFor="password">Password:</label>
							<input id="password" type="password" value={formData.password} onChange={onChange} required/>
						</li>
						<li>
							<label htmlFor="confirm">Confirm:</label>
							<input id="confirm" type="password" value={formData.confirm} onChange={onChange} required/>
						</li>
						<li>
							<label htmlFor="department">Department:</label>
							<select id="department" value={formData.department.id} onChange={onChange} required>
								<option value={Department.NONE_SELECTED.id}>{Department.NONE_SELECTED.name}</option>
								{departments.isSuccess && departments.data.map(department => (
									<option key={`department_${department.id}`} value={department.id}>{department.name}</option>
								))}
							</select>
						</li>
					</ul>
				</main>
				<footer>
					<div className={styles.error}>
						{departments.error && departments.error.message}
						{findById.isError && findById.error.message}
						{saveStatus.error && saveStatus.error.message}
						{updateStatus.error && updateStatus.error.message}
					</div>
					<button className="primary" disabled={!User.isValid(formData)} onClick={() => onSave()}>
						{user.id === 0 ? (saveStatus.isLoading ? "Saving..." : "Save") : (updateStatus.isLoading ? "Updating..." : "Update")}
					</button>
					<button className="outline-primary" onClick={() => reset()}>Cancel</button>
				</footer>
			</div>
		</section>
	)
};

UserForm.propTypes = {
	user: PropTypes.object.isRequired
};
