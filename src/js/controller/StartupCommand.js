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
import {UserVO} from "../model/valueObject/UserVO.js";
import {DeptEnum} from "../model/enum/DeptEnum.js";
import {RoleVO} from "../model/valueObject/RoleVO.js";
import {RoleEnum} from "../model/enum/RoleEnum.js";

export class StartupCommand extends SimpleCommand {

    execute(notification) {
        let users = [
            new UserVO("lstooge","Larry", "Stooge", "larry@stooges.com", "ijk456", DeptEnum.ACCT),
            new UserVO("cstooge","Curly", "Stooge", "curly@stooges.com", "xyz987", DeptEnum.SALES),
            new UserVO("mstooge","Moe", "Stooge", "moe@stooges.com", "abc123", DeptEnum.PLANT)
        ];

        let roles = [
            new RoleVO( "lstooge", [RoleEnum.PAYROLL, RoleEnum.EMP_BENEFITS]),
            new RoleVO( "cstooge", [RoleEnum.ACCT_PAY, RoleEnum.ACCT_RCV, RoleEnum.GEN_LEDGER]),
            new RoleVO( "mstooge", [RoleEnum.INVENTORY, RoleEnum.PRODUCTION, RoleEnum.SALES, RoleEnum.SHIPPING])
        ];

        this.facade.registerProxy(new UserProxy(users));
        this.facade.registerProxy(new RoleProxy(roles));

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
