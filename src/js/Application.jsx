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
import {Provider} from "react-redux";
import {useState} from "react";
import {UserList} from "./view/components/UserList";
import {UserForm} from "./view/components/UserForm";
import {UserRole} from "./view/components/UserRole";
import {appStore} from "./appStore.js"
import {User} from "./model/valueObject/User.js";

const Application = () => {

    const [user, setUser] = useState(User.create()); // Shared Data

    return (
        <div className="fluid">
            <Provider store={appStore}>
                <UserList user={user} setUser={setUser} />
                <UserForm user={user} />
                <UserRole user={user} />
            </Provider>
        </div>
    );

}

export default Application;
