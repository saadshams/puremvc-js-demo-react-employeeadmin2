//
//  StartupCommand.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {SimpleCommand} from "@puremvc/puremvc-js-multicore-framework";
import {ApplicationConstants} from "../ApplicationConstants";
import {ApplicationFacade} from "../ApplicationFacade";
import {UserProxy} from "../model/UserProxy";
import {RoleProxy} from "../model/RoleProxy";

export class StartupCommand extends SimpleCommand {

    execute(notification) {
        this.facade.registerProxy(new UserProxy());
        this.facade.registerProxy(new RoleProxy());

        [
            ApplicationConstants.USER_LIST_MOUNTED, ApplicationConstants.USER_LIST_UNMOUNTED,
            ApplicationConstants.USER_FORM_MOUNTED, ApplicationConstants.USER_FORM_UNMOUNTED,
            ApplicationConstants.USER_ROLE_MOUNTED, ApplicationConstants.USER_ROLE_UNMOUNTED
        ].forEach(type =>
            window.addEventListener(type, event =>
                this.facade.sendNotification(ApplicationFacade.REGISTER, event.detail, type)
            )
        );
    }

}
