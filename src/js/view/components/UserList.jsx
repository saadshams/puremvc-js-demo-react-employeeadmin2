//
//  UserList.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/list.module.css"
import {useEffect, useMemo, useState} from "react";
import {ApplicationConstants} from "../../ApplicationConstants";
import {UserVO} from "../../model/valueObject/UserVO.js";

export class UserListEvents {
    static NEW   = "events/user/list/new";
    static SELECT= "events/user/list/select";
    static DELETE= "events/user/list/delete";
}

export const UserList = () => {

    const [users, setUsers] = useState([]); // UserVO/Service Data
    const [selectedUser, setSelectedUser] = useState(null); // Input/Form Data
    const [error, setError] = useState(null);

    /**
     * @typedef {Object} UserList
     * @property {(users: UserVO[]) => void} setUsers
     * @property {(user: UserVO) => void} addUser
     * @property {(user: UserVO) => void} updateUser
     * @property {(user: UserVO) => void} updateRoles
     * @property {() => void} deSelect
     * @property {() => void} forceUpdate
     * @property {(error: string) => void} setError
     */
    const component = useMemo(() => ({
        setUsers: setUsers,
        addUser: (user) =>  {
            setUsers(state => [...state, user]);
        },
        updateUser: (user) => {
            setUsers(state => state.map(u => u.username === user.username ? user : u));
            setSelectedUser(null);
        },
        updateRoles: (user) => {
            setUsers(state => state.map(u => u.username === user.username ? user : u));
        },
        deSelect: () => {
            setSelectedUser(null);
        },
        setError: setError
    }), [setUsers, setSelectedUser, setError]);

    useEffect(() => {
        dispatchEvent(new CustomEvent(ApplicationConstants.USER_LIST_MOUNTED, {detail: component}));
        return () => {
            dispatchEvent(new CustomEvent(ApplicationConstants.USER_LIST_UNMOUNTED));
        }
    }, [component]);

    const onNew = () => {
        dispatchEvent(new CustomEvent(UserListEvents.NEW, {detail: new UserVO()}));
        setSelectedUser(null);
    }

    const onSelect = (user) => {
        dispatchEvent(new CustomEvent(UserListEvents.SELECT, {detail: user}));
        setSelectedUser(user);
    }

    const onDelete = (user) => {
        dispatchEvent(new CustomEvent(UserListEvents.DELETE, {detail: user}))
        setUsers(state => state.filter(u => u.username !== user.username));
        setSelectedUser(null);
    }

    return (
        <section id="list">
            {error ? (
                <div className={styles.list}>
                    <header><h2>User List</h2></header>
                    <main>Error: {error.message}</main>
                </div>
            ) : (
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
                            {users.map(user => (
                                <li key={`user_${user.username}`}>
                                    <input type="radio" id={`users_radio${user.username}`} name="users" value={user.username}
                                           onChange={() => onSelect(user)}
                                           checked={selectedUser !== null && selectedUser.username === user.username}/>

                                    <label htmlFor={`users_radio${user.username}`}>
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
                        <button id="add" className="primary" onClick={() => onNew()}>Add</button>
                        <button id="delete" className="outline-primary" onClick={() => onDelete(selectedUser)}
                                data-disabled={selectedUser === null}>Delete</button>
                    </footer>
                </div>
            )}
        </section>
    );
};
