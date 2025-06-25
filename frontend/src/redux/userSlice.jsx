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
    followingUpdate: (state, action) => {
      const profileId = action.payload;

      if (!state.loggedInUser || !state.loggedInUser.following) return;

      const isFollowing = state.loggedInUser.following.includes(profileId);

      if (isFollowing) {
        state.loggedInUser.following = state.loggedInUser.following.filter(
          (id) => id !== profileId
        );
      } else {
        state.loggedInUser.following.push(profileId);
      }
    },
  },
});

export const {setLoggedInUser, setViewedProfile, setOtherUsers, followingUpdate,
} = userSlice.actions;

export default userSlice.reducer;
