import React, { useState } from 'react';
import Items from './Items';
import {
  HomeOutlined as HomeOutlinedIcon,
  ExploreOutlined as ExploreOutlinedIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  MessageOutlined as MessageOutlinedIcon,
  SmartToyOutlined as SmartToyOutlinedIcon,
  ListOutlined as ListOutlinedIcon,
  PersonOutline as PersonOutlineIcon,
  MoreHoriz as MoreHorizIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { USER_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { setLoggedInUser, setViewedProfile, setOtherUsers } from "../redux/userSlice";

const LeftSidebar = () => {
  const { loggedInUser } = useSelector((store) => store.user);
  const [selectedItem, setSelectedItem] = useState("Home");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleItemClick = (itemTitle) => {
    setSelectedItem(itemTitle);
    console.log(`Selected: ${itemTitle}`);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true
      });

      if(res.data.success)
      {
        dispatch(setLoggedInUser(null));
        dispatch(setViewedProfile(null));
        dispatch(setOtherUsers([]));
        navigate("/");
        toast.success(res.data.message);
      }
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className='left_sidebar w-[23%] p-3 relative'>
      
      {/* Logo */}
      <Link to="/">
        <div className="left_sidebar_header flex items-center">
            <img 
              className='twitter_logo h-[70px] opacity-85 hover:scale-[1.05] transition-transform duration-300 ease-out mb-1'
              src="./Square_Monkey.jpg"
              alt="twitter_image"
            />
        </div>
      </Link>


      {/* Navigation Items */}
      <div className='left_sidebar_body'>
        <Link to="/"> 
          <Items 
            title="Home" 
            Icon={HomeOutlinedIcon} 
            selected={selectedItem === "Home"}
            onClick={() => handleItemClick("Home")}
          />
        </Link>

        <Link to={`/profile/${loggedInUser?._id}`}>
          <Items 
            title="Profile" 
            Icon={PersonOutlineIcon} 
            selected={selectedItem === "Profile"}
            onClick={() => handleItemClick("Profile")}
          />
        </Link>

        <Items title="Explore" Icon={ExploreOutlinedIcon} selected={selectedItem === "Explore"} onClick={() => handleItemClick("Explore")} />
        <Items title="Notifications" Icon={NotificationsOutlinedIcon} selected={selectedItem === "Notifications"} onClick={() => handleItemClick("Notifications")} />
        <Items title="Messages" Icon={MessageOutlinedIcon} selected={selectedItem === "Messages"} onClick={() => handleItemClick("Messages")} />
        <Items title="Grok" Icon={SmartToyOutlinedIcon} selected={selectedItem === "Grok"} onClick={() => handleItemClick("Grok")} />
        <Items title="Lists" Icon={ListOutlinedIcon} selected={selectedItem === "Lists"} onClick={() => handleItemClick("Lists")} />

        {/* ✅ Combined onClick to handle both state update and logout */}
        <Items 
          title="Logout" 
          Icon={LogoutIcon} 
          selected={selectedItem === "Logout"} 
          onClick={() => {
            handleItemClick("Logout");
            logoutHandler();
          }}
        />

        <Items title="More" Icon={MoreHorizIcon} selected={selectedItem === "More"} onClick={() => handleItemClick("More")} />
      </div>

      {/* Footer - User Info */}
      <div className='left_sidebar_footer bg-gray-100 flex items-center absolute left-0 bottom-0 h-[55px] w-[100%] px-2 text-gray-700 justify-between'>
        <Avatar 
          src={loggedInUser?.profilePic || "/loggedInUserImage.png"} 
          alt="avatar"  
          className='ml-1'
        />
        <div className="user_info mr-1 ml-[-5px]">
          <h4 className="user_name font-semibold"> {loggedInUser?.name || "Loading..."} </h4>
          <p className="user_id text-[13px] mt-[-5px]"> @{loggedInUser?.username || "unknown"} </p>
        </div>

          <IconButton>
            <MoreHorizIcon style={{ color: "#444444" }} />
          </IconButton>
      </div>
    </div>
  );
};

export default LeftSidebar;
