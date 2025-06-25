import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh, setSelectedTab } from '../redux/tweetSlice';
import { TWEET_API_END_POINT } from '../utils/constant';

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const { loggedInUser } = useSelector(store => store.user);
  const selectedTab = useSelector(store => store.tweet.selectedTab);
  const dispatch = useDispatch();

  const handleClick = (tabName) => {
    dispatch(setSelectedTab(tabName));
    console.log("Tab selected:", tabName);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, loggedInUserId: loggedInUser?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
        setDescription("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className='createpost'>
      <div className="createpost_top flex border-2  border-gray-200 rounded-t-xl overflow-hidden justify-between bg-white">
        <div className={`w-full flex hover:bg-blue-100 cursor-pointer justify-center items-center py-[9px] border-r-2 border-gray-50 text-[17px] flex-col text-gray-700 ${selectedTab === "foryou" ? "bg-blue-400 hover:bg-blue-400 font-semibold text-white" : ""}`}
          onClick={() => handleClick("foryou")}
        >
          <h1>For You</h1>
        </div>
        <div className={`w-full flex hover:bg-blue-100 cursor-pointer justify-center items-center py-[9px] border-r-2 border-gray-50 text-[17px] flex-col text-gray-700 ${selectedTab === "following" ? "bg-blue-400  hover:bg-blue-400 font-semibold text-white" : ""}`}
          onClick={() => handleClick("following")}
        >
          <h1>Following</h1>
        </div>
        <div className={`setting_button px-5 py-1 flex items-center hover:bg-gray-200 cursor-pointer ${selectedTab === "setting_button" ? "bg-gray-400 text-white" : ""}`}
          onClick={() => handleClick("setting_button")}
        >
          <SettingsIcon style={{ fontSize: "20px" }} className="text-gray-700" />
        </div>
      </div>

      <div className="createpost_bottom p-3 border-x-2 border-b-2 border-gray-100 bg-white mb-2 shadow-sm ">
        <form onSubmit={submitHandler}>
          <div className='flex items-center mt-1'>
            <Avatar src='./loggedInUserImage.png' />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border-1 border-gray-400 ml-3 w-full rounded-full px-[14px] h-[37px]'
              type="text"
              placeholder='What is happening?'
            />
          </div>
          <div className='flex pt-4 pb-1 '>
            <div className='icons flex w-[75%] px-3 py-1 items-center gap-4'>
              <PhotoLibraryIcon className="text-gray-500" />
              <CameraAltIcon className="text-gray-500" />
              <GifBoxIcon className="text-gray-500" />
              <SentimentSatisfiedAltIcon className="text-gray-500" />
              <LocationOnIcon className="text-gray-500" />
            </div>
            <button className='w-[20%] px-1 py-1 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold ml-3' type='submit'>
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
