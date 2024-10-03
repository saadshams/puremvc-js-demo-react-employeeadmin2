//
//  UserList.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/list.module.css"
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getConnection, findAll, deleteById} from "../../model/data/userData.js";
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
    const {users, status, error} = useSelector((state) => state.userData);

    useEffect(() => {
        (async () => {
            if (status === ApplicationConstants.IDLE) {
                const database = await getConnection();
                dispatch(findAll({database}));
            }
        })();
    }, [dispatch, status]);

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
                    <h2>User List</h2>
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
                        {status === "succeeded" && users.map(u => (
                            <li key={`user_${u.id}`}>
                                <input type="radio" id={`users_radio${u.id}`} name="users" value={u.id}
                                       onChange={() => onSelect(u)}
                                       checked={user.id === u.id}/>

                                <label htmlFor={`users_radio${u.id}`}>
                                    <span>{u.last}, {u.first}</span>
                                    <span>{u.username}</span>
                                    <span>{u.first}</span>
                                    <span>{u.last}</span>
                                    <span>{u.email}</span>
                                    <span>{u.password}</span>
                                    <span>{u.department.name}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </main>
                <footer>
                    <div className={styles.error}>
                        {error && error.message}
                        {/*{deleteStatus.error && deleteStatus.error.message}*/}
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
