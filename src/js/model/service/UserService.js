import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApplicationConstants} from "../../ApplicationConstants.js";

export class UserService {

    static findAllUsers = createAsyncThunk("users/findAllUsers", async () => {
        const response = await fetch(`${ApplicationConstants.API_URL}/users`);
        return response.json();
    });

}
