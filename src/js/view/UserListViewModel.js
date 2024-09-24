import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserService} from "../model/service/UserService.js";

export const UserListViewModel = () => {

    const dispatch = useDispatch();
    const {users, loading, error} = useSelector((state) => state.userSlice);

    useEffect(() => {
        dispatch(UserService.findAllUsers());
    }, [dispatch]);

    return {users, loading, error};
}
