import {useFindAllUsersQuery, useDeleteByUserIdMutation} from "../model/service/userService.js";

export const useUserViewModel = () => {

    // const {data: users, isLoading: isFetching, error: fetchError} = useFindAllUsersQuery();
    // const [deleteByUserId, {isLoading: isDeleting, isError: deleteError, isSuccess: deleteSuccess}] = useDeleteByUserIdMutation();

    // const handleDeleteUser = async (id) => {
    //     try {
    //         await deleteByUserId(id).unwrap();
    //         console.log(`User ${id} deleted successfully`);
    //     } catch (error) {
    //         console.error("Failed to delete user:", error);
    //     }
    // };

    return {
        findAllUsers: useFindAllUsersQuery(),
        deleteByUserId: useDeleteByUserIdMutation()
    }
};
