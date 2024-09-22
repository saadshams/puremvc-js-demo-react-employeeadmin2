//
//  UserListMediator.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Mediator} from "@puremvc/puremvc-js-multicore-framework";
import {ApplicationFacade} from "../ApplicationFacade";
import {UserProxy} from "../model/UserProxy";
import {UserListEvents} from "./components/UserList.jsx";

export class UserListMediator extends Mediator {

    static get NAME() { return "UserListMediator" }

    listeners = null;

    constructor(component) {
        super(UserListMediator.NAME, component);
        this.listeners = {
            [UserListEvents.NEW]: event => this.onNew(event.detail),
            [UserListEvents.SELECT]: event => this.onSelect(event.detail),
            [UserListEvents.DELETE]: event => this.onDelete(event.detail)
        };
    }

    onRegister() {
        Object.keys(this.listeners).forEach(key => window.addEventListener(key, this.listeners[key]));

        /** @type {UserProxy} */
        this.userProxy = this.facade.retrieveProxy(UserProxy.NAME);
        this.userProxy.findAllUsers()
            .then(users => this.component.setUsers(users))
            .catch(error => this.component.setError(error));
    }

    onRemove() {
        Object.keys(this.listeners).forEach(key => window.removeEventListener(key, this.listeners[key]));
    }

    listNotificationInterests() {
        return [
            ApplicationFacade.USER_SAVED,
            ApplicationFacade.USER_UPDATED,
            ApplicationFacade.CANCEL_SELECTED,
            ApplicationFacade.ROLE_UPDATE
        ]
    }

    /**
     * @param {Notification} notification
     * @param {User} notification.body
     */
    handleNotification(notification) {
        switch(notification.name) {
            case ApplicationFacade.USER_SAVED:
                this.component.forceUpdate();
                break;

            case ApplicationFacade.USER_UPDATED:
                this.component.updateUser(notification.body);
                break;

            case ApplicationFacade.CANCEL_SELECTED:
                this.component.deSelect();
                break;

            case ApplicationFacade.ROLE_UPDATE:
                this.component.updateRoles(notification.body);
                break;

            default:
                break;
        }
    }

    onNew(user) {
        this.facade.sendNotification(ApplicationFacade.NEW_USER, user);
    }

    onSelect(user) {
        this.facade.sendNotification(ApplicationFacade.USER_SELECTED, user);
    }

    async onDelete(user) {
        await this.userProxy.deleteUserById(user.id);
        this.facade.sendNotification(ApplicationFacade.USER_DELETED);
    }

    /** @returns {UserList} */
    get component() {
        return this.viewComponent;
    }
}
