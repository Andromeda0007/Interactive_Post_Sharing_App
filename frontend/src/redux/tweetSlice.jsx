// src/redux/tweetSlice.js
import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],               // All tweets from the logged-in user
    followingTweets: [],      // Tweets from users you follow
    refresh: false,           // Trigger to refetch tweets
    selectedTab: "foryou",    // "foryou" or "following"
  },
  reducers: {
    getAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
    setFollowingTweets: (state, action) => {
      state.followingTweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh; // Toggle to trigger useEffects
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const {
  getAllTweets,
  setFollowingTweets,
  getRefresh,
  setSelectedTab,
} = tweetSlice.actions;

export default tweetSlice.reducer;
