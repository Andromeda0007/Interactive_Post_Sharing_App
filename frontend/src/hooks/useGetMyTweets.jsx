// src/hooks/useGetMyTweets.jsx
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/constant";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (loggedInUserId) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);

  useEffect(() => {
    if (!loggedInUserId) return;

    const fetchMyTweets = async () => {
      try {
        const res = await axios.get(
          `${TWEET_API_END_POINT}/getallmytweets/${loggedInUserId}`,
          { withCredentials: true }
        );
        dispatch(getAllTweets(res.data.tweets));
      } catch (error) {
        console.error("❌ Error fetching my tweets:", error);
      }
    };

    fetchMyTweets();
  }, [loggedInUserId, refresh, dispatch]); // ✅ reacts to refresh too
};

export default useGetMyTweets;
