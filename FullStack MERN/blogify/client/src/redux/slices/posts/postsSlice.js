import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";

//initialState
const INITIAL_STATE = {
  loading: false,
  error: null,
  posts: [],
  post: null,
  success: false,
};

//!Fetch public posts
export const fetchPublicPostsAction = createAsyncThunk(
  "posts/fetch-public-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/posts/public`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
// ! Create post
export const addPostAction = createAsyncThunk(
  "post/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formData
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Abd ${token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/posts`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!fetch single  posts
export const getPostAction = createAsyncThunk(
  "posts/get-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/posts/${postId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!Fetch private posts
export const fetchPrivatePostsAction = createAsyncThunk(
  "posts/fetch-private-posts",
  async (
    { page = 1, limit = 2, searchTerm = "", category = "" },
    { rejectWithValue, getState, dispatch }
  ) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Abd ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/posts?page=${page}&limit=${limit}&searchTerm=${searchTerm}&category=${category}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!delete post
export const deletePostAction = createAsyncThunk(
  "posts/delete-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Abd ${token}`,
        },
      };
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/posts/${postId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
// ! update post
export const updatePostAction = createAsyncThunk(
  "post/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formData
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Abd ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/posts/${payload?.postId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!like post
export const likePostAction = createAsyncThunk(
  "posts/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Abd ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/posts/likes/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!dislike post
export const dislikePostAction = createAsyncThunk(
  "posts/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Abd ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/posts/dislikes/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!clap post
export const clapPostAction = createAsyncThunk(
  "posts/clap",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Abd ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/posts/claps/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!post view count
export const posViewsCountAction = createAsyncThunk(
  "posts/post-views",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Abd ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/posts/${postId}/post-view-count`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!schedule post
export const schedulePostAction = createAsyncThunk(
  "posts/schedule-post",
  async (
    { postId, scheduledPublish },
    { rejectWithValue, getState, dispatch }
  ) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Abd ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/posts/schedule/${postId}`,
        {
          scheduledPublish,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! post slices
const postSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch public posts
    builder.addCase(fetchPublicPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create post
    builder.addCase(addPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! get single post
    builder.addCase(getPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! fetch private posts
    builder.addCase(fetchPrivatePostsAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(fetchPrivatePostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(fetchPrivatePostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! update post
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! like post
    builder.addCase(likePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(likePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(likePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! dislike post
    builder.addCase(dislikePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(dislikePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(dislikePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! claps post
    builder.addCase(clapPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clapPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(clapPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! post view
    builder.addCase(posViewsCountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(posViewsCountAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(posViewsCountAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! schedule post
    builder.addCase(schedulePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(schedulePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(schedulePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! delete post
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! Reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });
    //! Reset success action
    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });
  },
});

//! generate reducer
const postsReducer = postSlice.reducer;

export default postsReducer;
