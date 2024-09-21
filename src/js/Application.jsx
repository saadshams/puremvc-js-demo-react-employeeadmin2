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
import {UserList} from "./view/components/UserList";
import {UserForm} from "./view/components/UserForm";
import {UserRole} from "./view/components/UserRole";
import {ApplicationFacade} from "./ApplicationFacade";

const Application = () => {

    ApplicationFacade
        .getInstance("EmployeeAdmin", key => new ApplicationFacade(key))
        .startup();

    return (
        <div className="fluid">
            <UserList />
            <UserForm />
            <UserRole />
        </div>
    );

}

export default Application;
