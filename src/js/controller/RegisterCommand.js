//
//  RegisterCommand.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {SimpleCommand} from "@puremvc/puremvc-js-multicore-framework";
import {ApplicationConstants} from "../ApplicationConstants";
import {UserListMediator} from "../view/UserListMediator";
import {UserFormMediator} from "../view/UserFormMediator";
import {UserRoleMediator} from "../view/UserRoleMediator";

export class RegisterCommand extends SimpleCommand {

    execute(notification) {
        switch (notification.type) {
            case ApplicationConstants.USER_LIST_MOUNTED:
                this.facade.registerMediator(new UserListMediator(notification.body));
                break;
            case ApplicationConstants.USER_LIST_UNMOUNTED:
                this.facade.removeMediator(UserListMediator.NAME);
                break;
            case ApplicationConstants.USER_FORM_MOUNTED:
                this.facade.registerMediator(new UserFormMediator(notification.body));
                break;
            case ApplicationConstants.USER_FORM_UNMOUNTED:
                this.facade.removeMediator(UserFormMediator.NAME);
                break;
            case ApplicationConstants.USER_ROLE_MOUNTED:
                this.facade.registerMediator(new UserRoleMediator(notification.body));
                break;
            case ApplicationConstants.USER_ROLE_UNMOUNTED:
                this.facade.removeMediator(UserRoleMediator.NAME);
                break;
            default:
                console.log(notification.type);
        }
    }

}
