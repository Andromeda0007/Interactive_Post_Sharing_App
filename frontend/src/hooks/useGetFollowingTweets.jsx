// src/hooks/useFollowingTweets.jsx
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/constant";
import { setFollowingTweets } from "../redux/tweetSlice";

const useFollowingTweets = (loggedInUserId) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);

  useEffect(() => {
    if (!loggedInUserId) return;

    const fetchFollowingTweets = async () => {
      try {
        const res = await axios.get(
          `${TWEET_API_END_POINT}/getfollowingtweets/${loggedInUserId}`,
          { withCredentials: true }
        );

        dispatch(setFollowingTweets(res.data.tweets));
      } catch (error) {
        console.error("❌ Error fetching following tweets:", error);
      }
    };

    fetchFollowingTweets();
  }, [loggedInUserId, dispatch, refresh]); // ✅ Will re-fetch when refresh changes
};

export default useFollowingTweets;
