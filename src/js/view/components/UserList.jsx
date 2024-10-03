//
//  Userdata.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/list.module.css"
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getConnection} from "../../model/connections/database.js";
import {findAll, deleteById} from "../../model/data/userData.js";
import PropTypes from "prop-types";
import {ApplicationConstants} from "../../ApplicationConstants.js";
import {User} from "../../model/valueObject/User.js";

/**
 * UserList component
 *
 * @param {Object} props - The component props
 * @param {User} props.user - The user object
 * @param {function} props.setUser - Function to set the user
 * @returns {JSX.Element} The rendered component
 */
export const UserList = ({user, setUser}) => {

    const dispatch = useDispatch();
    const findAllSelector = useSelector(state => state.userSlice.findAll);
    const deleteByIdSelector = useSelector(state => state.userSlice.deleteById);

    useEffect(() => {
        (async () => {
            if (findAllSelector.status === ApplicationConstants.IDLE) {
                const database = await getConnection();
                dispatch(findAll({database}));
            }
        })();
    }, [dispatch, findAllSelector]);

    const onNew = () => {
        setUser(User.create());
    }

    const onSelect = (user) => {
        setUser(user);
    }

    const onDelete = async (user) => {
        const database = await getConnection();
        dispatch(deleteById({database, id: user.id}));
        setUser(User.create());
    }

    return (
        <section id="list">
            <div className={styles.list}>
                <header>
                    <h2>User data</h2>
                </header>
                <main>
                    <ul>
                        <li>
                            <span>Name</span>
                            <span>Username</span>
                            <span>First</span>
                            <span>Last</span>
                            <span>Email</span>
                            <span>Password</span>
                            <span>Department</span>
                        </li>
                        {findAllSelector.status === ApplicationConstants.SUCCEEDED && findAllSelector.data.map(user => (
                            <li key={`user_${user.id}`}>
                                <input type="radio" id={`users_radio${user.id}`} name="users" value={user.id}
                                       onChange={() => onSelect(user)}
                                       checked={user.id === user.id}/>

                                <label htmlFor={`users_radio${user.id}`}>
                                    <span>{user.last}, {user.first}</span>
                                    <span>{user.username}</span>
                                    <span>{user.first}</span>
                                    <span>{user.last}</span>
                                    <span>{user.email}</span>
                                    <span>{user.password}</span>
                                    <span>{user.department.name}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </main>
                <footer>
                    <div className={styles.error}>
                        {findAllSelector.error && findAllSelector.error.message}
                        {deleteByIdSelector.error && deleteByIdSelector.error.message}
                    </div>
                    <button id="add" className="primary" onClick={() => onNew()}>Add</button>
                    <button id="delete" className="outline-primary" onClick={() => onDelete(user)}
                            disabled={user.id === 0}>Delete</button>
                </footer>
            </div>
        </section>
    );
};

UserList.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
};
