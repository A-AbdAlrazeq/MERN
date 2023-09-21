import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//initialstate

const INITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
  user: null,
  success: false,
  isverified: false,
  isUpdated: false,
  isRegistered: false,
  isLogin: false,
  isCoverImageUploaded: false,
  isProfileImgUploaded: false,
  emailMessage: undefined,
  profile: {},
  isEmailSent: false,
  userAuth: {
    error: null,
    userInfo: {},
  },
};

//! Login Action
export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/users/login`,
        payload
      );
      //! save the user into localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! user slice
const userSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fullFilled state
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.loading = false;
      state.error = null;
    });
    //handle the rejection
    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

//! generate reducer
const userReducers = userSlice.reducer;
export default userReducers;
