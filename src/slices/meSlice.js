import { createSlice } from "@reduxjs/toolkit";

export const meSlice = createSlice({
  name: "me",
  initialState: { user: {}, token: "", contacts: [] },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    clearMe: (state) => {
      state.user = {};
      state.token = "";
      state.contacts = [];
    },
  },
});

export const { setUser, setToken, setContacts, clearMe } = meSlice.actions;

export default meSlice.reducer;
