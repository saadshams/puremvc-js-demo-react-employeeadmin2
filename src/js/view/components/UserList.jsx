//
//  UserList.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import styles from "../../../css/list.module.css"
import {useState} from "react";
import { useFindAllUsersQuery, useDeleteByUserIdMutation } from "../../model/service/userService.js";

export const UserList = () => {

    const {data, isLoading, error} = useFindAllUsersQuery();
    const [selectedUser, setSelectedUser] = useState(null); // Input/Form Data

    const onNew = () => {
        // dispatchEvent(new CustomEvent(component.NEW, {detail: new User()}));
        setSelectedUser(null);
    }

    const onSelect = (user) => {
        // dispatchEvent(new CustomEvent(component.SELECT, {detail: user}));
        setSelectedUser(user);
    }

    const onDelete = (user) => {
        // dispatchEvent(new CustomEvent(component.DELETE, {detail: user}))
        // setUsers(state => state.filter(u => u.id !== user.id));
        setSelectedUser(null);
    }

    return (
        <section id="list">
            {isLoading ? (
                <div className={styles.list}>
                    <header><h2>User List</h2></header>
                    <main>Loading...</main>
                </div>
            ) : error ? (
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
                            {data.map(user => (
                                <li key={`user_${user.id}`}>
                                    <input type="radio" id={`users_radio${user.id}`} name="users" value={user.id}
                                           onChange={() => onSelect(user)}
                                           checked={selectedUser !== null && selectedUser.id === user.id}/>

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
                        <button id="add" className="primary" onClick={() => onNew()}>Add</button>
                        <button id="delete" className="outline-primary" onClick={() => onDelete(selectedUser)}
                                data-disabled={selectedUser === null}>Delete</button>
                    </footer>
                </div>
            )}
        </section>
    );
};
