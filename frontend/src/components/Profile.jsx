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
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {
  const { id: profileId } = useParams();
  const { loggedInUser, viewedProfile } = useSelector(store => store.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const isSelf = !profileId || profileId === loggedInUser?._id;
  const user = isSelf ? loggedInUser : viewedProfile;

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
        dispatch(getRefresh());
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
    <div className='profile w-1/2 bg-white py-2 border-x border-gray-200 relative shadow-sm'>

      {/* Header */}
      <div>
        <div className='flex items-center gap-4 px-3'>
          <Link to="/">
            <IconButton>
              <ArrowRightAlt style={{ color: "black", transform: 'rotate(180deg)' }} />
            </IconButton>
          </Link>
          <div>
            <h1 className='font-bold text-gray-800 text-lg'>{user.name}</h1>
            <p className='text-xs text-gray-600'>{user.followers?.length || 0} followers</p>
          </div>
        </div>
        <img className="h-[130px] w-full object-cover" src="/Header_Image.png" alt="header" />
      </div>

      {/* Avatar + Name + Follow Info + Button */}
      <div className='z-10 flex justify-between mt-[-65px] absolute w-full px-3'>

        {/* Avatar and user info */}
        <div className='flex gap-3 '>
          <Avatar
            src={isSelf ? "/loggedInUserImage.png" : '/Profile_Photu.png'}
            style={{ width: '120px', height: '120px' }}
            className='border-4 border-white shadow-lg cursor-pointer'
          />
          <div className='flex flex-col  mt-[70px]'>
            <h1 className='font-bold text-gray-800 text-lg leading-5'>{user.name}</h1>
            <p className='text-[13px] text-gray-500 -mt[2px]'>@{user.username}</p>
 
          </div>
        </div>

        {/* Follow / Edit button */}
        <div className='mt-[75px]'>
          {isSelf ? (
            <div className='bg-gray-200 rounded-full px-5 py-2 h-[35px] flex items-center cursor-pointer text-gray-600 font-semibold hover:bg-gray-300'>
              Edit Profile
            </div>
          ) : (
            <div
              onClick={loading ? null : followAndUnfollowHandler}
              className={`rounded-full px-5 py-2 h-[35px] flex items-center cursor-pointer font-semibold transition-all ${
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
      </div>

      {/* Bio and Stats */}
      <div className="mt-[60px] px-4 py-3 border-b border-gray-200">
        <p className='text-sm text-gray-700 mb-2'>
          Full-stack web developer || MERN stack specialist || Passionate about clean design and fast apps || Writing code that matters || Codeforces
        </p>

        <div className='flex gap-4 text-sm text-gray-600 mt-3'>
          <p><span className='font-semibold text-gray-800'>{user.following?.length || 0}</span> Following</p>
          <p><span className='font-semibold text-gray-800'>{user.followers?.length || 0}</span> Followers</p>
          <p><span className='font-semibold text-gray-800'>{user.tweets?.length || 0}</span> Tweets</p>
        </div>

        <div className='text-xs text-gray-500 mt-2'>
          <p>📍 Location: Bangalore, India</p>
          <p>📅 Joined: Jan 2024</p>
        </div>
      </div>

    </div>
  );
};

export default Profile;
