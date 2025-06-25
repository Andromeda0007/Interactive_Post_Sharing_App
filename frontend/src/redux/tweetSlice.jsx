import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    followingTweets: [],
    refresh: false,
    selectedTab: "foryou", // 👈 NEW STATE
  },
  reducers: {
    getAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
    setFollowingTweets: (state, action) => {
      state.followingTweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload; // 👈 NEW REDUCER
    },
  },
});

export const { getAllTweets, setFollowingTweets, getRefresh, setSelectedTab } = tweetSlice.actions;
export default tweetSlice.reducer;
