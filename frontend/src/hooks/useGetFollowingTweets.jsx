// src/hooks/useFollowingTweets.jsx
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/constant";
import { setFollowingTweets } from "../redux/tweetSlice"; // 👈 Make sure to create this action

const useFollowingTweets = (loggedInUserId) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);

  useEffect(() => {
    if (!loggedInUserId) {
      console.log("❌ No user ID available for following tweets");
      return;
    }

    const fetchFollowingTweets = async () => {
      try {
        console.log("📤 Fetching tweets from following  users:", loggedInUserId);
        console.log("nigga pe nigga nigga pe nigga");
        const res = await axios.get(
          `${TWEET_API_END_POINT}/getfollowingtweets/${loggedInUserId}`,
          { withCredentials: true }
        );


        console.log("✅....... Following tweets received:", res.data.tweets);
        dispatch(setFollowingTweets(res.data.tweets));
      } catch (error) {
        console.error("❌ Error fetching following tweets:", error);
      }
    };

    fetchFollowingTweets();
  }, [loggedInUserId, dispatch, refresh]);
};

export default useFollowingTweets;
