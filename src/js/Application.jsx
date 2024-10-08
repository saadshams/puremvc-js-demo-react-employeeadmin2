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
import {useState} from "react";
import {Provider} from "react-redux";
import {UserList} from "./view/components/UserList";
import {UserForm} from "./view/components/UserForm";
import {UserRole} from "./view/components/UserRole";
import {StartupUseCase} from "./controller/StartupUseCase.js";
import {appStore} from "./appStore.js";

const Application = () => {

    new StartupUseCase().execute();

    const NONE_SELECTED = {id: 0, name: "---None Selected---"};

    const init = (username = "", first = "", last= "", email = "", password= "", department = NONE_SELECTED, roles = []) => {
        return {username, first, last, email, password, department, roles};
    }

    const [user, setUser] = useState(init()); // Shared Data

    return (
        <div className="fluid">
            <Provider store={appStore}>
                <UserList user={user} setUser={setUser} init={init} />
                <UserForm user={user} setUser={setUser} init={init} NONE_SELECTED={NONE_SELECTED} />
                <UserRole user={user} NONE_SELECTED={NONE_SELECTED} />
            </Provider>
        </div>
    );

}

export default Application;
