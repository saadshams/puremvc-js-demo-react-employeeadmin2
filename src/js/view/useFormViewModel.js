//
//  useFormViewModel.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {useDispatch, useSelector} from "react-redux";
import {getConnection} from "../model/connections/database.js";
import {findAllDepartments, findById, save, update} from "../model/data/userData.js";

const useFormViewModel = () => {

    const dispatch = useDispatch();

    return {
        findAllDepartmentsSelector: useSelector(state => state.userRepository.findAllDepartments), // Application Data
        findByIdSelector: useSelector(state => state.userRepository.findById), // User Data
        saveSelector: useSelector(state => state.userRepository.save), // Action Data
        updateSelector: useSelector(state => state.userRepository.update),

        findAllDepartments: async () => dispatch(findAllDepartments({database: await getConnection()})), // Action
        findById: async (id) => dispatch(findById({database: await getConnection(), id})),
        save: async (user) => dispatch(save({database: await getConnection(), user})),
        update: async (user) => dispatch(update({database: await getConnection(), user})),
    }
}

export default useFormViewModel;