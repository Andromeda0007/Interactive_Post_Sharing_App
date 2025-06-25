import React, { useState } from 'react';
import CreatePost from './CreatePost';
import Tweet from './Tweet';
import { Avatar, IconButton } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useGetProfile from '../hooks/useGetProfile';
import toast from 'react-hot-toast';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice'; // ✅ NEW: Import the refresh toggle

const Profile = () => {
  const { id: profileId } = useParams();
  const { loggedInUser, viewedProfile } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const isSelf = !profileId || profileId === loggedInUser?._id;
  const user = isSelf ? loggedInUser : viewedProfile;

  // Fetch viewed profile if it's not self
  useGetProfile(isSelf ? null : profileId);

  const followAndUnfollowHandler = async () => {
    try {
      setLoading(true);
      let res;

      const isFollowing = loggedInUser?.following?.includes(profileId);

      if (isFollowing) {
        res = await axios.post(
          `${USER_API_END_POINT}/unfollow/${profileId}`,
          { id: loggedInUser._id },
          { withCredentials: true }
        );
      } else {
        res = await axios.post(
          `${USER_API_END_POINT}/follow/${profileId}`,
          { id: loggedInUser._id },
          { withCredentials: true }
        );
      }

      if (res?.data?.message) {
        toast.success(res.data.message);
        dispatch(followingUpdate(profileId));
        dispatch(getRefresh()); // ✅ NEW: Trigger tweet refetch
      } else {
        toast.error("Unexpected response from server.");
      }

    } catch (error) {
      console.error("❌ Error in follow/unfollow:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className='text-center mt-10'>Loading profile...</p>;

  return (
    <div className='profile w-1/2 bg-gray-50 py-2 border-x-1 border-gray-100 relative'>
      <div>
        <div className='flex items-center gap-4 px-3'>
          <Link to="/">
            <IconButton>
              <ArrowRightAlt style={{ color: "black", transform: 'rotate(180deg)' }} />
            </IconButton>
          </Link>
          <div className='mb-1'>
            <h1 className='font-bold text-gray-700'> {user.name} </h1>
            <p className='text-xs mt-[-4px] text-gray-600'> {user.followers?.length || 0} followers </p>
          </div>
        </div>
        <img className="h-[130px]" src="/Header_Image.png" alt="loading" />
      </div>

      <div className='z-10 flex justify-between mt-[-65px] absolute w-[100%] px-3 '>
        <div>
          <Avatar
            src={isSelf ? "/loggedInUserImage.png" : '/Profile_Photu.png'}
            style={{ width: '120px', height: '120px' }}
            className='border-4 border-gray-50 cursor-pointer'
          />
          <div className='px-1 flex flex-col justify-center '>
            <h1 className='font-bold text-gray-700'> {user.name} </h1>
            <p className='text-[12px] text-gray-600 mt-[-3px]'> @{user.username} </p>
          </div>
        </div>

        {isSelf ? (
          <div className='bg-gray-200 rounded-full px-5 py-2 h-[35px] flex items-center mt-[75px] cursor-pointer text-gray-600 font-semibold hover:bg-gray-300'>
            Edit Profile
          </div>
        ) : (
          <div
            onClick={loading ? null : followAndUnfollowHandler}
            className={`rounded-full px-5 py-2 h-[35px] flex items-center mt-[75px] cursor-pointer font-semibold transition-all ${
              loading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gray-800 hover:bg-gray-900 text-white'
            }`}
          >
            {loading
              ? "Processing..."
              : loggedInUser?.following?.includes(profileId)
              ? "Following"
              : "Follow"}
          </div>
        )}
      </div>

      <div className="bio mt-[94px] px-4 py-1">
        <p className='text-[12px] text-gray-700'>
          🌍 Exploring the web's endless possibilities with MERN stack 🚀 || Problem solver by day, Coder by night 🌙 || Coffee lover ☕ || Join me on this coding journey
        </p>
      </div>
    </div>
  );
};

export default Profile;
