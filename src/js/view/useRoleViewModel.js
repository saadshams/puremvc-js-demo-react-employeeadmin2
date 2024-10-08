//
//  useRoleViewModel.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {useSelector, useDispatch} from "react-redux";
import {getConnection} from "../model/connections/database.js";
import {findAll, findById, add, remove} from "../model/data/roleData.js";

const useRoleViewModel = () => {

    const dispatch = useDispatch();

    return {
        findAllSelector: useSelector(state => state.roleRepository.findAll), // Application Data
        findByIdSelector: useSelector(state => state.roleRepository.findById), // User Data
        addSelector: useSelector(state => state.roleRepository.add), // Action Data
        removeSelector: useSelector(state => state.roleRepository.remove),

        findAll: async () => dispatch(findAll({database: await getConnection()})), // Action
        findById: async (id) => dispatch(findById({database: await getConnection(), id})),
        add: async (id, role) => dispatch(add({database: await getConnection(), id, role})),
        remove: async (id, role) => dispatch(remove({database: await getConnection(), id, role}))
    }

}

export default useRoleViewModel;