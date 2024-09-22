//
//  UserFormMediator.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {Mediator} from "@puremvc/puremvc-js-multicore-framework";
import {ApplicationFacade} from "../ApplicationFacade";
import {UserProxy} from "../model/UserProxy";
import {UserFormEvents} from "./components/UserForm.jsx";

export class UserFormMediator extends Mediator {

    static get NAME() { return "UserFormMediator" }

    listeners = null;

    constructor(component) {
        super(UserFormMediator.NAME, component);
        this.listeners = {
            [UserFormEvents.SAVE]: event => this.onSave(event.detail),
            [UserFormEvents.UPDATE]: event => this.onUpdate(event.detail),
            [UserFormEvents.CANCEL]: event => this.onCancel(event.detail)
        };
    }

    onRegister() {
        Object.keys(this.listeners).forEach(key => window.addEventListener(key, this.listeners[key]));

        /** @type {UserProxy} */
        this.userProxy = this.facade.retrieveProxy(UserProxy.NAME);
        this.userProxy.findAllDepartments()
            .then(departments => this.component.setDepartments(departments))
            .catch(error => this.component.setError(error));
    }

    onRemove() {
        Object.keys(this.listeners).forEach(key => window.removeEventListener(key, this.listeners[key]));
    }

    listNotificationInterests() {
        return [
            ApplicationFacade.NEW_USER,
            ApplicationFacade.USER_DELETED,
            ApplicationFacade.USER_SELECTED
        ];
    }

    /**
     * @param {Notification} notification
     * @param {User} notification.body
     */
    handleNotification(notification) {
        switch (notification.name) {
            case ApplicationFacade.NEW_USER:
                this.component.setUser(notification.body);
                break;

            case ApplicationFacade.USER_DELETED:
                this.component.reset();
                break;

            case ApplicationFacade.USER_SELECTED:
                this.userProxy.findUserByUsername(notification.body.username)
                    .then(user => this.component.setUser(user))
                    .catch(error => this.component.setError(error));
                break;

            default:
                break;
        }
    }

    async onSave(user) {
        await this.userProxy.add(user);
        this.facade.sendNotification(ApplicationFacade.USER_SAVED, user);
    }

    async onUpdate(user) {
        await this.userProxy.update(user);
        this.facade.sendNotification(ApplicationFacade.USER_UPDATED, user);
    }

    onCancel() {
        this.facade.sendNotification(ApplicationFacade.CANCEL_SELECTED);
    }

    /** @returns {UserForm} */
    get component() {
        return this.viewComponent;
    }

}
