import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/constant";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (loggedInUserId) => {
  const dispatch = useDispatch();

  useEffect(() => {
  console.log("🐛 useEffect for tweets triggered, ID:", loggedInUserId); // 🔥 Add this

  if (!loggedInUserId) {
    console.log("❌ No user ID for fetching tweets");
    return;
  }

  const fetchMyTweets = async () => {
    try {
      console.log("📤 Fetching tweets for user:", loggedInUserId);
      const res = await axios.get(
        `${TWEET_API_END_POINT}/getallmytweets/${loggedInUserId}`,
        { withCredentials: true }
      );

      console.log("✅ Tweets received:", res.data.tweets);
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.error("❌ Error fetching tweets:", error);
    }
  };

  fetchMyTweets();
}, [loggedInUserId, dispatch]);
};

export default useGetMyTweets;
