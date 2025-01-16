import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { firstname: null, lastname: null, publicId: null, avatar: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.publicId = action.payload.publicId;
      state.value.avatar = action.payload.avatar;
    },
    logout: (state) => {
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.publicId = null;
      state.value.avatar = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
