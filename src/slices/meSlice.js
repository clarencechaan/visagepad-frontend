import { createSlice } from "@reduxjs/toolkit";

export const meSlice = createSlice({
  name: "me",
  initialState: { user: {}, token: "" },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearMe: (state) => {
      state.user = {};
      state.token = "";
    },
  },
});

export const { setUser, setToken, clearMe } = meSlice.actions;

export default meSlice.reducer;
