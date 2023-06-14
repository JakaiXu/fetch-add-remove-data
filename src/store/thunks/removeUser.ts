import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User,UserItem } from "../../components/UsersListItem";
export const deleteUser = createAsyncThunk('users/delete', async (user:UserItem )=> {
   await axios.delete(`http://localhost:3003/users/${user.id}`)
    return user
})