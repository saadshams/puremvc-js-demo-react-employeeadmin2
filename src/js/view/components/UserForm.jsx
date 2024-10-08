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
import {ApplicationConstants} from "../../ApplicationConstants.js";
import useFormViewModel from "../useFormViewModel.js";

/**
 * UserForm component
 *
 * @param {Object} props
 * @param {User} props.user
 * @param {function} props.setUser
 * @returns {JSX.Element}
 */
export const UserForm = ({user, setUser, init, NONE_SELECTED}) => {

	const {findAllDepartmentsSelector, findByIdSelector, saveSelector, updateSelector,
		findAllDepartments, findById, save, update} = useFormViewModel();
	const [formData, setFormData] = useState({...user, confirm: ""}); // Form Data

	useEffect(() => {
		(async () => {
			if (findAllDepartmentsSelector.status === ApplicationConstants.IDLE) {
				await findAllDepartments();
			} else if(findAllDepartmentsSelector.status === ApplicationConstants.SUCCEEDED) {
				if (user.id) {
					await findById(user.id);
				} else {
					reset();
				}
			}
		})();
	}, [findAllDepartmentsSelector.status, user.id]);

	useEffect(() => {
		if (findByIdSelector.status === ApplicationConstants.SUCCEEDED) {
			let data = findByIdSelector.data;
			setFormData({...data, confirm: data.password});
		}
	}, [findByIdSelector.status, findByIdSelector.data]);

	useEffect(() => {
		if (updateSelector.status === ApplicationConstants.SUCCEEDED || saveSelector.status === ApplicationConstants.SUCCEEDED) {
			reset();
		}
	}, [updateSelector.status, saveSelector.status]);

	const onChange = (event) => {
		const {id, value} = event.target;
		setFormData((state) => ({ // update fields
			...state, [id]: id === "department" ? findAllDepartmentsSelector.data.find(d => d.id === parseInt(value)) : value
		}));
	}

	const onSave = async () => {
		user.id ? await update(formData) : await save(formData);
	}

	const reset = () => {
		setUser(init());
		setFormData({...init(), confirm: "", department: NONE_SELECTED});
	}

	const isValid = user => {
		return user.username !== "" && user.first !== "" && user.last !== "" && user.email !== "" &&
			user.password !== "" && user.password === user.confirm && user.department.id !== 0;
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
								<option value={NONE_SELECTED.id}>{NONE_SELECTED.name}</option>
								{findAllDepartmentsSelector.status === ApplicationConstants.SUCCEEDED && findAllDepartmentsSelector.data.map(department => (
									<option key={`department_${department.id}`} value={department.id}>{department.name}</option>
								))}
							</select>
						</li>
					</ul>
				</main>
				<footer>
					<div className={styles.error}>
						{findAllDepartmentsSelector.status === ApplicationConstants.FAILED && findAllDepartmentsSelector.error.message}
						{findByIdSelector.status === ApplicationConstants.FAILED && findByIdSelector.error.message}
						{saveSelector.status === ApplicationConstants.FAILED && saveSelector.error.message}
						{updateSelector.status === ApplicationConstants.FAILED && updateSelector.error.message}
					</div>
					<button className="primary" disabled={!isValid(formData)} onClick={() => onSave()}>
						{user.id ? (updateSelector.status === ApplicationConstants.LOADING ? "Updating..." : "Update") :
							(saveSelector.status === ApplicationConstants.LOADING ? "Saving..." : "Save")}
					</button>
					<button className="outline-primary" onClick={() => reset()}>Cancel</button>
				</footer>
			</div>
		</section>
	)
};

UserForm.propTypes = {
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
	init: PropTypes.func.isRequired,
	NONE_SELECTED: PropTypes.object.isRequired,
};
