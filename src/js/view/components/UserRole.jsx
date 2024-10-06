//
//  UserRole.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/role.module.css"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {getConnection} from "../../model/connections/database.js";
import {ApplicationConstants} from "../../ApplicationConstants.js";
import {findAll, findById, add, remove} from "../../model/data/roleData.js";

/**
 * UserRole component
 *
 * @param {Object} props - The component props
 * @param {User} props.user - The user object
 * @returns {JSX.Element} The rendered component
 */
export const UserRole = ({user}) => {

	const NONE_SELECTED = {id: 0, name: "---None Selected---"};

	const dispatch = useDispatch();
	const findAllSelector = useSelector(state => state.roleDataSlice.findAll); // Application Data
	const findByIdSelector = useSelector(state => state.roleDataSlice.findById); // User Data
	const addSelector = useSelector(state => state.roleDataSlice.add); // Action Data
	const removeSelector = useSelector(state => state.roleDataSlice.remove);
	const [formData, setFormData] = useState(NONE_SELECTED); // Form Data

	useEffect(() => {
		(async () => {
			if(findAllSelector.status === ApplicationConstants.IDLE) {
				dispatch(findAll({database: await getConnection()}));
			} else if (findAllSelector.status === ApplicationConstants.SUCCEEDED) {
				dispatch(findById({database: await getConnection(), id: user.id ? user.id : 0}));
			}
		})();
	}, [dispatch, findAllSelector.status, user.id]);

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
		dispatch(add({database: await getConnection(), id: user.id, role: formData}))
	};

	const onRemove = async () => {
		dispatch(remove({database: await getConnection(), id: user.id, role: formData}))
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
	user: PropTypes.object.isRequired
};
