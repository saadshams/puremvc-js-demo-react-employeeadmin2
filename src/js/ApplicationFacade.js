//
//  ApplicationFacade.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Facade} from "@puremvc/puremvc-js-multicore-framework";
import {StartupCommand} from "./controller/StartupCommand";
import {RegisterCommand} from "./controller/RegisterCommand";

export class ApplicationFacade extends Facade {
    static STARTUP = "startup"
    static REGISTER = "register"

    static NEW_USER = "newUser";
    static CANCEL_SELECTED = "cancelSelected"

    static USER_SELECTED = "userSelected";
    static USER_SAVED = "userSaved";
    static USER_UPDATED = "userUpdated";
    static USER_DELETED = "userDeleted";

    static ROLE_UPDATE = "roleUpdate";

    initializeController() {
        super.initializeController();
        this.registerCommand(ApplicationFacade.STARTUP, () => new StartupCommand());
        this.registerCommand(ApplicationFacade.REGISTER, () => new RegisterCommand());
    }

    /**
     *
     * @param {string} key
     * @param {function(string):ApplicationFacade} factory
     * @returns {ApplicationFacade}
     */
    static getInstance(key, factory) {
        return Facade.getInstance(key, factory);
    }

    startup() {
        this.sendNotification(ApplicationFacade.STARTUP);
    }

}
