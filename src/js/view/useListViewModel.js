//
//  useListViewModel.js
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import {useDispatch, useSelector} from "react-redux";
import {getConnection} from "../model/connections/database.js";
import {findAll, deleteById} from "../model/data/userData.js";

const useListViewModel = () => {

    const dispatch = useDispatch();

    return {
        findAllSelector: useSelector(state => state.userRepository.findAll), // Application Data
        deleteByIdSelector: useSelector(state => state.userRepository.deleteById), // Action Data

        findAll: async () => dispatch(findAll({database: await getConnection()})), // Action
        deleteById: async (id) => dispatch(deleteById({database: await getConnection(), id: id}))
    }
}

export default useListViewModel;