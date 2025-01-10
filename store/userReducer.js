import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { firstname: null, lastname: null, token: null, avatar: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.token = action.payload.token;
      state.value.avatar = action.payload.avatar;
    },
    logout: (state) => {
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.token = null;
      state.value.avatar = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
