//
//  UserRole.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/role.module.css"
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {ApplicationConstants} from "../../ApplicationConstants.js";
import useRoleViewModel from "../useRoleViewModel.js";

/**
 * UserRole component
 *
 * @param {Object} props - The component props
 * @param {User} props.user - The user object
 * @returns {JSX.Element} The rendered component
 */
export const UserRole = ({user, NONE_SELECTED}) => {

	const {findAllSelector, findByIdSelector, addSelector, removeSelector,
		findAll, findById, add, remove} = useRoleViewModel();
	const [formData, setFormData] = useState(NONE_SELECTED); // Form Data

	useEffect(() => {
		(async () => {
			if(findAllSelector.status === ApplicationConstants.IDLE) {
				await findAll();
			} else if (findAllSelector.status === ApplicationConstants.SUCCEEDED) {
				await findById(user.id ? user.id : 0);
			}
		})();
	}, [findAllSelector.status, user.id]);

	useEffect(() => {
		(async () => {
			if (addSelector.status === ApplicationConstants.SUCCEEDED ||
				removeSelector.status === ApplicationConstants.SUCCEEDED) {
				reset();
			}
		})();
	}, [addSelector.status, removeSelector.status]);

	const onChange = (event) => {
		setFormData(findAllSelector.data.find(role => role.id === parseInt(event.target.value)));
	}

	const onAdd = async () => {
		await add(user.id, formData);
	};

	const onRemove = async () => {
		await remove(user.id, formData);
	};

	const reset = () => {
		setFormData(NONE_SELECTED);
	}

	return (
		<section id="role">
			<div className={styles.role}>
				<header>
					<h2>User Roles</h2>
				</header>
				<main>
					<ul>
						{findByIdSelector.status === ApplicationConstants.SUCCEEDED && findByIdSelector.data.map(role => (
							<li key={`role_${role.id}`}>{role.name}</li>
						))}
					</ul>
				</main>
				<footer>
					<label htmlFor="roles"></label>
					<select id="roles" value={formData.id} onChange={onChange}>
						<option value={NONE_SELECTED.id}>{NONE_SELECTED.name}</option>
						{findAllSelector.status === ApplicationConstants.SUCCEEDED && findAllSelector.data.map(role => (
							<option key={`role_option${role.id}`} value={role.id}>{role.name}</option>
						))}
					</select>

					<button id="add" className="primary" onClick={() => onAdd()}
					        disabled={formData.id === NONE_SELECTED.id}>Add</button>
					<button id="remove" className="outline-primary" onClick={() => onRemove()}
					        disabled={formData.id === NONE_SELECTED.id}>Remove</button>

					<div className={styles.error}>
						{findAllSelector.status === ApplicationConstants.FAILED && findAllSelector.error.message}
						{findByIdSelector.status === ApplicationConstants.FAILED && findByIdSelector.error.message}
						{addSelector.status === ApplicationConstants.FAILED && addSelector.error.message}
						{removeSelector.status === ApplicationConstants.FAILED && removeSelector.error.message}
					</div>
				</footer>
			</div>
		</section>
	);
};

UserRole.propTypes = {
	user: PropTypes.object.isRequired,
	NONE_SELECTED: PropTypes.object.isRequired,
};
