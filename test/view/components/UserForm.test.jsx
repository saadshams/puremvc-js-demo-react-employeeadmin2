//
//  UserForm.test.jsx
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
import {UserFormEvents, UserForm} from "../../../src/js/view/components/UserForm.jsx";

describe("UserForm", () => {

    it("should render the UserForm", () => {
        render(<UserForm />);
        expect(screen.getByText(/User Form/i)).toBeInTheDocument();
    });

    it("should test mounted event", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_FORM_MOUNTED, resolve, {once: true});
            render(<UserForm />);
        });
    });

    it("should test unmounted event", async () => {
        await new Promise(resolve => {
             window.addEventListener(ApplicationConstants.USER_FORM_UNMOUNTED, resolve, {once: true});
             const {unmount} = render(<UserForm />);
             unmount();
        });
    });

    it("should test setDepartments", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_FORM_MOUNTED, async event => {
                const component = event.detail;

                act(() => {
                    const departments = [new Department(1, "Accounting"), new Department(2, "Sales")];
                    component.setDepartments(departments);
                });

                await waitFor(() => {
                    const options = screen.getAllByRole("option");
                    expect(options).toHaveLength(3); // including default option NONE_SELECTED
                    expect(options[1]).toHaveTextContent("Accounting");
                    expect(options[2]).toHaveTextContent("Sales");
                });

                resolve();
            }, {once: true});
            render(<UserForm />);
        });
    });

    it("should test setUser", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_FORM_MOUNTED, async event => {
                const component = event.detail;
                const departments = [new Department(1, "Accounting"), new Department(2, "Sales")];
                const larry = new User(1, "lstooge","Larry", "Stooge", "larry@stooges.com",
                    "ijk456", new Department(1, "Accounting"), []);

                act(() => {
                    component.setDepartments(departments);
                    component.setUser(larry);
                });

                await waitFor(() => {
                    const options = screen.getAllByRole("option");
                    expect(options).toHaveLength(3); // including default option
                    expect(screen.getByLabelText("First Name:").value).toBe(larry.first);
                    expect(screen.getByLabelText("Last Name:").value).toBe(larry.last);
                    expect(screen.getByLabelText("Email:").value).toBe(larry.email);
                    expect(screen.getByLabelText("Username:").value).toBe(larry.username);
                    expect(screen.getByLabelText("Password:").value).toBe(larry.password);
                    expect(screen.getByLabelText("Confirm:").value).toBe(larry.password);
                    expect(parseInt(screen.getByRole("combobox").value)).toBe(departments[0].id);
                });

                resolve();
            }, {once: true});

            render(<UserForm />);
        });
    });

    it("should test save user", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_FORM_MOUNTED, async event => {
                const component = event.detail;

                act(() => {
                    const departments = [new Department(1, "Accounting"), new Department(2, "Sales")];
                    component.setDepartments(departments);
                    component.setUser(new User());
                });

                fireEvent.change(screen.getByLabelText("First Name:"), { target: { value: "Shemp" } });
                fireEvent.change(screen.getByLabelText("Last Name:"), { target: { value: "Stooge" } });
                fireEvent.change(screen.getByLabelText("Email:"), { target: { value: "shemp@stooges.com" } });
                fireEvent.change(screen.getByLabelText("Username:"), { target: { value: "sshemp" } });
                fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "xyz987" } });
                fireEvent.change(screen.getByLabelText("Confirm:"), { target: { value: "xyz987" } });

                await waitFor(() => {
                    const options = screen.getAllByRole("option");
                    expect(options).toHaveLength(3); // including default option
                });

                fireEvent.change(screen.getByLabelText("Department:"), { target: { value: '1' } });
                window.addEventListener(UserFormEvents.SAVE, resolve, {once: true});
                fireEvent.click(screen.getByText("Save"));

            }, {once: true});

            render(<UserForm />);
        });
    });

    it("should test update user", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_FORM_MOUNTED, async event => {
                const component = event.detail;
                const departments = [new Department(1, "Accounting"), new Department(2, "Sales")];
                const larry = new User(1, "lstooge","Larry", "Stooge", "larry@stooges.com",
                    "ijk456", new Department(1, "Accounting"), []);

                act(() => {
                    component.setDepartments(departments);
                    component.setUser(larry);
                });

                await waitFor(async () => {
                    expect(screen.getAllByRole("option")).toHaveLength(3); // including default option
                    fireEvent.change(screen.getByLabelText("Username:"), {target: {value: "lstooge1"}});
                });

                window.addEventListener(UserFormEvents.UPDATE, (event) => {
                    expect(event.detail.username).toBe("lstooge1");
                    resolve();
                }, {once: true});

                fireEvent.click(screen.getByText("Update"));
            }, {once: true});

            render(<UserForm />);
        });
    });

    it("should test cancel user", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_FORM_MOUNTED, () => {
                window.addEventListener(UserFormEvents.CANCEL, resolve, {once: true});
                fireEvent.click(screen.getByText("Cancel"));
            }, {once: true});

            render(<UserForm />);
        });
    });

});
