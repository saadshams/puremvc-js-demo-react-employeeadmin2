//
//  UserRole.test.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {act} from "react";
import {ApplicationConstants} from "../../../src/js/ApplicationConstants.js";
import {UserVO} from "../../../src/js/model/valueObject/UserVO.js";
import {DeptEnum} from "../../../src/js/model/enum/DeptEnum.js";
import {RoleEnum} from "../../../src/js/model/enum/RoleEnum.js";
import {UserRole} from "../../../src/js/view/components/UserRole.jsx";

describe("UserRole", () => {

    it("should render the UserRole", () => {
        render(<UserRole />);
        expect(screen.getByText(/User Roles/i)).toBeInTheDocument();
    });

    it("should test mounted event", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_ROLE_MOUNTED, resolve, {once: true});
            render(<UserRole />);
        });
    });

    it("should test unmounted event", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_ROLE_UNMOUNTED, resolve, {once: true});
            const {unmount} = render(<UserRole />);
            unmount();
        });
    });

    it("should test setRoles", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_ROLE_MOUNTED,  async event => {
                const component = event.detail;

                act(() => {
                    component.setRoles([new RoleEnum(1, "Administrator"), new RoleEnum(2, "Accounts Payable")]);
                });

                await waitFor(() => {
                    expect(screen.getByText("Administrator")).toBeInTheDocument();
                    expect(screen.getByText("Accounts Payable")).toBeInTheDocument();
                });

                resolve();
            }, {once: true})

            render(<UserRole />);
        });
    });

    it("should add role and update", async () => {
        await new Promise(resolve => {
            window.addEventListener(ApplicationConstants.USER_ROLE_MOUNTED,  async event => {
                const component = event.detail;

                act(() => {
                    component.setRoles([new RoleEnum(1, "Administrator"), new RoleEnum(2, "Accounts Payable")]);
                });

                await waitFor(() => {
                    expect(screen.getByText("Administrator")).toBeInTheDocument();
                    expect(screen.getByText("Accounts Payable")).toBeInTheDocument();
                });

                const larry = new UserVO("lstooge","Larry", "Stooge", "larry@stooges.com", "ijk456", new DeptEnum(1, "Accounting"));
                larry.roles = [];
                act(() => { component.setUser(larry) });

                // change select option and click Add
                fireEvent.change(screen.getByRole("combobox"), { target: { value: 1 } });
                await waitFor(() => { expect(screen.getByText("Add")).not.toBeDisabled(); });
                fireEvent.click(screen.getByText("Add"));

                // confirm a selected option added to the list
                await waitFor(() => {
                    const options = screen.getByRole("list").querySelectorAll("li");
                    const administrator = Array.from(options).find(li => li.textContent === "Administrator");
                    expect(administrator).toBeInTheDocument();
                });

                resolve();
            }, {once: true})

            render(<UserRole />);
        });
    });

});
