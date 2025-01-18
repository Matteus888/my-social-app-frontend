import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    firstname: null,
    lastname: null,
    publicId: null,
    avatar: null,
    friends: [],
    friendRequests: [],
    following: [],
    followers: [],
  },
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
      state.value.friends = action.payload.friends;
      state.value.friendRequests = action.payload.friendRequests;
      state.value.following = action.payload.following;
      state.value.followers = action.payload.followers;
    },
    logout: (state) => {
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.publicId = null;
      state.value.avatar = null;
      state.value.friends = [];
      state.value.friendRequests = [];
      state.value.following = [];
      state.value.followers = [];
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
