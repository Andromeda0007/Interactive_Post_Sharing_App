// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,       // the user who is currently logged in
    viewedProfile: null,      // the profile currently being viewed (could be another user or self)
    otherUsers: [],           // suggested or other users
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setViewedProfile: (state, action) => {
      state.viewedProfile = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
  },
});

export const { setLoggedInUser, setViewedProfile, setOtherUsers } = userSlice.actions;
export default userSlice.reducer;
