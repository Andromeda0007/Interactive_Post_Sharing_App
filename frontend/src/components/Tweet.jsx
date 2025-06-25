import Avatar from '@mui/material/Avatar';
import React from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice'; // ✅ Correct import

const Tweet = ({ tweet }) => {
  const { loggedInUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const likeOrDislikeHandler = async (tweetId) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${tweetId}`,
        { userId: loggedInUser._id },
        { withCredentials: true }
      );
      dispatch(getRefresh()); // ✅ Refresh the feed
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to like tweet");
    }
  };

  const deleteTweetHandler = async (tweetId) => {
    try {
      const res = await axios.delete(
        `${TWEET_API_END_POINT}/delete/${tweetId}`,
        { withCredentials: true }
      );
      dispatch(getRefresh()); // ✅ Refresh the feed
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete tweet");
    }
  };

  return (
    <div className='border-2 border-gray-50 mt-2 bg-white p-2 rounded-xl shadow-sm'>
      <div className='flex'>
        <Avatar src='/Profile_Photu.png' className='mt-1' />
        <div className='ml-2 w-full'>
          <div className='flex items-center'>
            <h1 className='font-semibold'>{tweet.userId.name}</h1>
            <p className='text-gray-500 text-sm ml-1'>@{tweet?.userId.username}</p>
          </div>

          <div className='flex w-full'>
            <p>{tweet.description}</p>
          </div>

          <div className='tweet_stats flex justify-between w-full mt-3 mb-2 items-center'>
            <div className='flex items-center gap-[2px] w-full cursor-pointer'>
              <ChatBubbleOutlineIcon
                className='hover:text-blue-400 text-gray-700'
                style={{ fontSize: "medium" }}
              />
              <p className='text-[12px]'>0</p>
            </div>

            <div className='flex items-center gap-[2px] w-full cursor-pointer'>
              <RepeatIcon
                className='hover:text-green-400 text-gray-700'
                style={{ fontSize: "medium" }}
              />
              <p className='text-[12px]'>0</p>
            </div>

            <div
              className='flex items-center gap-[2px] w-full cursor-pointer'
              onClick={() => likeOrDislikeHandler(tweet._id)}
            >
              <FavoriteBorderIcon
                className='hover:text-red-400 text-gray-700'
                style={{ fontSize: "medium" }}
              />
              <p className='text-[12px]'>{tweet.like.length}</p>
            </div>

            <div className='flex items-center gap-[px] w-full cursor-pointer'>
              <BookmarkBorderIcon
                className='hover:text-amber-400 text-gray-700'
                style={{ fontSize: "medium" }}
              />
              <p className='text-[12px]'>0</p>
            </div>

            {loggedInUser?._id === tweet?.userId?._id && (
              <div
                onClick={() => deleteTweetHandler(tweet._id)}
                className='flex items-center ml-[-25px] cursor-pointer hover:scale-[1.1]'
              >
                <DeleteIcon
                  style={{ color: "#555555", fontSize: "medium" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
