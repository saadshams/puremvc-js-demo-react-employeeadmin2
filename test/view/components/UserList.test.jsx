//
//  UserList.test.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {describe, expect, it} from "vitest";
import {act} from "react";
import {ApplicationConstants} from "../../../src/js/ApplicationConstants.js";
import {User} from "../../../src/js/model/valueObject/User.js";
import {Department} from "../../../src/js/model/valueObject/Department.js";
import {UserListEvents, UserList} from "../../../src/js/view/components/UserList.jsx";

// Testing setters and events
describe("UserList", () => {

    it("should render the UserList", () => {
        render(<UserList />);
        expect(screen.getByText(/User List/i)).toBeInTheDocument();
    });

    it("should test mounted event", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_LIST_MOUNTED, resolve, {once: true});
            render(<UserList />);
        });
    });

    it("should test unmounted event", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_LIST_UNMOUNTED, resolve, {once: true});
            const {unmount} = render(<UserList />);
            unmount();
        });
    });

    it("should test UserListNew event", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_LIST_MOUNTED, () => {
                window.addEventListener(UserListEvents.NEW, resolve, {once: true});
                fireEvent.click(screen.getByText("Add"));
            }, {once: true});
            render(<UserList />);
        });
    });

    it("should test setUsers", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_LIST_MOUNTED, async event => {
                let component = event.detail;
                const larry = new User(1, "lstooge","Larry", "Stooge", "larry@stooges.com", "ijk456", new Department(1, "Accounting"), []);
                component.setUsers([larry]);
                await waitFor(() => { expect(screen.getByText("lstooge")).toBeInTheDocument(); });
                resolve();
            }, {once: true});
            render(<UserList />);
        });
    });

    it("should test addUser", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_LIST_MOUNTED, async (event) => {
                const component = event.detail;
                const larry = new User(1, "lstooge","Larry", "Stooge", "larry@stooges.com", "ijk456", new Department(1, "Accounting"), []);
                component.addUser(larry);
                await waitFor(() => { expect(screen.getByText("lstooge")).toBeInTheDocument(); });
                resolve();
            }, {once: true});
            render(<UserList />);
        });
    });

    it("should test updateUser", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_LIST_MOUNTED, async (event) => {
                const component = event.detail;
                const larry = new User(1, "lstooge","Larry", "Stooge", "larry@stooges.com", "ijk456", new Department(1, "Accounting"), []);
                component.addUser(larry);
                await waitFor(() => { expect(screen.getByText("lstooge")).toBeInTheDocument() });

                larry.username = "lstooge1";
                act(() => { component.updateUser(larry) });
                await waitFor(() => { expect(screen.getByText("lstooge1")).toBeInTheDocument() });

                resolve();
            }, {once: true});
            render(<UserList />);
        });
    });

    it("should select user", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_LIST_MOUNTED, async (event) => {

                const component = event.detail;
                const larry = new User(1, "lstooge","Larry", "Stooge", "larry@stooges.com", "ijk456", new Department(1, "Accounting"), []);
                act(() => { component.addUser(larry) });
                await waitFor(() => { expect(screen.getByText("lstooge")).toBeInTheDocument() });

                window.addEventListener(UserListEvents.SELECT, ({detail}) => {
                    expect(detail.username).to.equal(larry.username);
                    resolve();
                }, {once: true});

                fireEvent.click(screen.getByText("lstooge"));
            }, {once: true});
            render(<UserList />);
        });
    });

    it("should delete user", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_LIST_MOUNTED, async (event) => {

                const component = event.detail;
                const larry = new User(1, "lstooge","Larry", "Stooge", "larry@stooges.com", "ijk456", new Department(1, "Accounting"), []);
                act(() => { component.addUser(larry) });
                await waitFor(() => { expect(screen.getByText("lstooge")).toBeInTheDocument() });

                window.addEventListener(UserListEvents.SELECT, async () => {
                    window.addEventListener(UserListEvents.DELETE, ({detail}) => { // delete
                        expect(detail.username).to.equal("lstooge");
                        resolve();
                    }, {once: true});

                    await waitFor(() => {
                        expect(screen.getByText("Delete")).not.toBeDisabled();
                    });

                    act( () => { fireEvent.click(screen.getByText("Delete")) });

                }, {once: true}); // select

                act(() => { fireEvent.click(screen.getByText("lstooge")) });
            }, {once: true}); // mounted

            render(<UserList />);
        });
    });

});
