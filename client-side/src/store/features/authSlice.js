import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo:
    typeof window !== "undefined" && localStorage?.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  posts: 0,
};

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    addPosts: (state) => {
      state.posts += 1
    }
  },
});

export const { setCredentials, logout, addPosts } = authSlice.actions;

export default authSlice.reducer;
