import { configureStore } from "@reduxjs/toolkit";
import userReducers from "../slices/users/usersSlices";
import postsReducer from "../slices/posts/postsSlice";

//! Store
const store = configureStore({
  reducer: {
    users: userReducers,
    posts: postsReducer,
  },
});

export default store;
