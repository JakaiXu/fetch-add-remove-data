import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3003/users");
  // Dev only for loading, delete it later
//   await pause(500)
  return response.data;
});
// Dev only, test loading
// const pause = (duration:number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve,duration)
//   });
// };
