import { configureStore } from "@reduxjs/toolkit";
import user from "./userReducer";

const store = configureStore({
  reducer: { user },
});

export default store;
