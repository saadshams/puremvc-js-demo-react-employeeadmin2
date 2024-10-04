//
//  Application.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import "../css/_base.css"
import "../css/_layout.css";
import "../css/_theme.css"
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {UserList} from "./view/components/UserList";
import {UserForm} from "./view/components/UserForm";
import {UserRole} from "./view/components/UserRole";
import {User} from "./model/valueObject/User.js";
import {StartupUseCase} from "./controller/StartupUseCase.js";

const Application = () => {

    const [user, setUser] = useState(User.create()); // Shared Data
    const dispatch = useDispatch();

    useEffect( () => {
        (async () => {
            await new StartupUseCase(dispatch).execute();
        })();
    }, [dispatch]);

    return (
        <div className="fluid">
            <UserList user={user} setUser={setUser} />
            <UserForm user={user} />
            <UserRole user={user} />
        </div>
    );

}

export default Application;
