//
//  UserRoleMediator.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Mediator} from "@puremvc/puremvc-js-multicore-framework";
import {ApplicationFacade} from "../ApplicationFacade";
import {RoleProxy} from "../model/RoleProxy";
import {UserRoleEvents} from "./components/UserRole.jsx";

export class UserRoleMediator extends Mediator {

    static get NAME() { return "UserRoleMediator" }

    listeners = null;

    constructor(component) {
        super(UserRoleMediator.NAME, component);
        this.listeners = {
            [UserRoleEvents.UPDATE]: event => this.onChange(event.detail)
        };
    }

    onRegister() {
        Object.keys(this.listeners).forEach(key => window.addEventListener(key, this.listeners[key]));

        /** @type {RoleProxy} */
        this.roleProxy = this.facade.retrieveProxy(RoleProxy.NAME);
        this.roleProxy.findAllRoles()
            .then(roles => this.component.setRoles(roles))
            .catch(error => this.component.setError(error));
    }

    onRemove() {
        Object.keys(this.listeners).forEach(key => window.removeEventListener(key, this.listeners[key]));
    }

    listNotificationInterests() {
        return [
            ApplicationFacade.NEW_USER,
            ApplicationFacade.USER_SELECTED,
            ApplicationFacade.USER_DELETED
        ]
    }

    /**
     * @param {Notification} notification
     * @param {User} notification.body
     */
    handleNotification(notification) {
        switch(notification.name) {
            case ApplicationFacade.NEW_USER:
                this.component.reset();
                break;

            case ApplicationFacade.USER_SELECTED:
                this.roleProxy.findRolesByUsername(notification.body.username)
                    .then(result => {
                        notification.body.roles = result.roles;
                        this.component.setUser(notification.body);
                    })
                    .catch(error => this.component.setError(error));
                break;

            case ApplicationFacade.USER_DELETED:
                this.component.reset();
                break;

            default:
                break;
        }
    }

    async onChange(user) {
        await this.roleProxy.updateRolesByUsername(user.username, user.roles);
        this.facade.sendNotification(ApplicationFacade.ROLE_UPDATE, user);
    }

    /** @returns {UserRole} */
    get component() {
        return this.viewComponent;
    }

}
