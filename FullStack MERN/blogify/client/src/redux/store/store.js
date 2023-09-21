import { configureStore } from "@reduxjs/toolkit";
import userReducers from "../slices/users/usersSlices";

//! Store
const store = configureStore({
  reducer: {
    users: userReducers,
  },
});

export default store;
