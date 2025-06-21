import React, { useState } from 'react'
import Items from './Items'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined'
import StarOutlineIcon from '@mui/icons-material/StarOutline' 
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import { IconButton } from '@mui/material'

const LeftSidebar = () => {

    const [selectedItem, setSelectedItem] = useState("Home");

    const handleItemClick = (itemTitle)=>{
        setSelectedItem(itemTitle);

        console.log(`Selected: ${itemTitle}`)
    }

    return (
        <div className='left_sidebar w-[23%] p-3 relative'>
            <div className="left_sidebar_header px-1">
                <Link to="/">
                    <img 
                    className='twitter_logo h-[50px] hover:scale-[1.05] transition-transform duration-300 ease-out'
                    src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?ga=GA1.1.1896762506.1750320800&semt=ais_hybrid&w=740" 
                    alt="twitter_image"
                />
                </Link>

            </div>
            

            <div className='left_sidebar_body'>
                <Link to="/"> 
                    <Items 
                        title="Home" 
                        Icon={HomeOutlinedIcon} 
                        selected={selectedItem==="Home"}
                        onClick={handleItemClick}
                    />
                </Link>

                <Items 
                    title="Explore" 
                    Icon={ExploreOutlinedIcon} 
                    selected={selectedItem==="Explore"}
                    onClick={handleItemClick}
                />

                <Items 
                    title="Notifications" 
                    Icon={NotificationsOutlinedIcon} 
                    selected={selectedItem==="Notifications"}
                    onClick={handleItemClick} 
                />

                <Items 
                    title="Messages" 
                    Icon={MessageOutlinedIcon} 
                    selected={selectedItem==="Messages"}
                    onClick={handleItemClick}
                />

                <Items 
                    title="Grok" 
                    Icon={SmartToyOutlinedIcon}
                    selected={selectedItem==="Grok"}
                    onClick={handleItemClick}
                />
                
                <Items 
                    title="Lists" 
                    Icon={ListOutlinedIcon} 
                    selected={selectedItem==="Lists"}
                    onClick={handleItemClick}
                />

                <Items 
                    title="Premium" 
                    Icon={StarOutlineIcon} 
                    selected={selectedItem==="Premium"}
                    onClick={handleItemClick}
                />

                <Link to="/profile">
                    <Items 
                        title="Profile" 
                        Icon={PersonOutlineIcon} 
                        selected={selectedItem==="Profile"}
                        onClick={handleItemClick}
                    />
                </Link>
                
                
                <Items 
                    title="More" 
                    Icon={MoreHorizIcon} 
                    selected={selectedItem==="More"}
                    onClick={handleItemClick}
                />

                <div className='button flex justify-center items-center p-2'>
                    <button type='submit' className='bg-blue-400 py-2 w-[100%] rounded-full text-white hover:bg-blue-500'> Post </button>
                </div>
            </div>

            <div className='left_sidebar_footer bg-gray-100 flex items-center absolute left-0 bottom-0 h-[55px] w-[100%] px-3 text-gray-700'>
                <Avatar 
                    src='/Profile_Photu.jpg'
                    alt="avatar"
                />
                <div className="user_info mr-3 ml-2">
                    <h4 className="user_name font-semibold"> Ankit Kumar </h4>
                    <p className="user_id text-[13px] mt-[-5px]"> @andromeda50897</p>
                </div>

                <Link to="/login">
                    <IconButton>
                        <MoreHorizIcon style={{color:"#444444"}}/>
                    </IconButton>
                </Link>

            </div>
        </div>
    )
}

export default LeftSidebar