import React, { useState } from 'react';
import Items from './Items';
import {
  HomeOutlined as HomeOutlinedIcon,
  ExploreOutlined as ExploreOutlinedIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  MessageOutlined as MessageOutlinedIcon,
  SmartToyOutlined as SmartToyOutlinedIcon,
  ListOutlined as ListOutlinedIcon,
  StarOutline as StarOutlineIcon,
  PersonOutline as PersonOutlineIcon,
  MoreHoriz as MoreHorizIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

const LeftSidebar = () => {
  const { loggedInUser } = useSelector((store) => store.user); // ✅ FIXED
  const [selectedItem, setSelectedItem] = useState("Home");

  const handleItemClick = (itemTitle) => {
    setSelectedItem(itemTitle);
    console.log(`Selected: ${itemTitle}`);
  };

  return (
    <div className='left_sidebar w-[23%] p-3 relative'>

      {/* Logo */}
      <div className="left_sidebar_header px-1">
        <Link to="/">
          <img 
            className='twitter_logo h-[50px] hover:scale-[1.05] transition-transform duration-300 ease-out'
            src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg"
            alt="twitter_image"
          />
        </Link>
      </div>

      {/* Navigation Items */}
      <div className='left_sidebar_body'>
        <Link to="/"> 
          <Items 
            title="Home" 
            Icon={HomeOutlinedIcon} 
            selected={selectedItem === "Home"}
            onClick={handleItemClick}
          />
        </Link>

        <Items title="Explore" Icon={ExploreOutlinedIcon} selected={selectedItem === "Explore"} onClick={handleItemClick} />
        <Items title="Notifications" Icon={NotificationsOutlinedIcon} selected={selectedItem === "Notifications"} onClick={handleItemClick} />
        <Items title="Messages" Icon={MessageOutlinedIcon} selected={selectedItem === "Messages"} onClick={handleItemClick} />
        <Items title="Grok" Icon={SmartToyOutlinedIcon} selected={selectedItem === "Grok"} onClick={handleItemClick} />
        <Items title="Lists" Icon={ListOutlinedIcon} selected={selectedItem === "Lists"} onClick={handleItemClick} />
        <Items title="Premium" Icon={StarOutlineIcon} selected={selectedItem === "Premium"} onClick={handleItemClick} />

        <Link to={`/profile/${loggedInUser?._id}`}>
          <Items 
            title="Profile" 
            Icon={PersonOutlineIcon} 
            selected={selectedItem === "Profile"}
            onClick={handleItemClick}
          />
        </Link>

        <Items title="More" Icon={MoreHorizIcon} selected={selectedItem === "More"} onClick={handleItemClick} />

        <div className='button flex justify-center items-center p-2'>
          <button type='submit' className='bg-blue-400 py-2 w-[100%] rounded-full text-white hover:bg-blue-500'> Post </button>
        </div>
      </div>

      {/* Footer - User Info */}
      <div className='left_sidebar_footer bg-gray-100 flex items-center absolute left-0 bottom-0 h-[55px] w-[100%] px-2 text-gray-700 justify-between'>
        <Avatar src='/Profile_Photu.png' alt="avatar"  className='ml-1'/>
        <div className="user_info mr-1 ml-[-5px]">
          <h4 className="user_name font-semibold"> {loggedInUser?.name || "Loading..."} </h4>
          <p className="user_id text-[13px] mt-[-5px]"> @{loggedInUser?.username || "unknown"} </p>
        </div>

        <Link to="/login">
          <IconButton>
            <MoreHorizIcon style={{ color: "#444444" }} />
          </IconButton>
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
