import { configureStore } from "@reduxjs/toolkit";
import userReducers from "../slices/users/usersSlices";
import postsReducer from "../slices/posts/postsSlice";
import categoriesReducer from "../slices/categories/categoriesSlice";
import commentReducer from "../slices/comments/commentsSlice";

//! Store
const store = configureStore({
  reducer: {
    users: userReducers,
    posts: postsReducer,
    categories: categoriesReducer,
    comments: commentReducer,
  },
});

export default store;
