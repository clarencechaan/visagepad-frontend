import { configureStore } from "@reduxjs/toolkit";
import meReducer from "../slices/meSlice";

export default configureStore({
  reducer: { me: meReducer },
});
