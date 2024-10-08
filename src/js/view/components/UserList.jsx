//
//  UserList.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/list.module.css"
import {useEffect} from "react";
import PropTypes from "prop-types";
import {ApplicationConstants} from "../../ApplicationConstants.js";
import useListViewModel from "../useListViewModel.js";

/**
 * UserList component
 *
 * @param {Object} props
 * @param {User} props.user
 * @param {function} props.setUser
 * @returns {JSX.Element}
 */
export const UserList = ({user, setUser, init}) => {

    const {findAllSelector, deleteByIdSelector, findAll, deleteById} = useListViewModel();

    useEffect(() => {
        (async () => {
            if (findAllSelector.status === ApplicationConstants.IDLE) {
                await findAll();
            }
        })();
    }, [findAll, findAllSelector]);

    useEffect(() => {
        if (deleteByIdSelector.status === ApplicationConstants.SUCCEEDED) {
            setUser(init());
        }
    }, [deleteByIdSelector.status, setUser]);

    const onNew = () => {
        setUser(init());
    }

    const onSelect = (user) => {
        setUser(user);
    }

    const onDelete = async (user) => {
        await deleteById(user.id);
        setUser(init());
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
                        {findAllSelector.status === ApplicationConstants.SUCCEEDED && findAllSelector.data.map(u => (
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
                        {findAllSelector.error && findAllSelector.error.message}
                        {deleteByIdSelector.error && deleteByIdSelector.error.message}
                    </div>
                    <button id="add" className="primary" onClick={() => onNew()}>Add</button>
                    <button id="delete" className="outline-primary" onClick={() => onDelete(user)}
                            disabled={user.id === undefined}>Delete</button>
                </footer>
            </div>
        </section>
    );
};

UserList.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired,
};
