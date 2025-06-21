import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { Avatar, IconButton } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { TrendingFlat, ArrowRightAlt, EastOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className='profile w-1/2 bg-gray-50 py-2 border-x-1 border-gray-100 relative'>
        <div>
            <div className='flex items-center gap-4 px-3'>

                <Link to="/">
                    <IconButton>
                        <ArrowRightAlt style={{ color:"black", transform: 'rotate(180deg)' }} />
                    </IconButton>
                </Link>
                
                <div className='mb-1'>
                    <h1 className='font-bold text-gray-700'> Ankit Kumar </h1>
                    <p className='text-xs mt-[-4px] text-gray-600'> 10 posts </p>
                </div> 
            </div>
            <img className="h-[130px]" src="./Header_Image.png" alt="loading" />
        </div>
        <div className='z-10 flex justify-between mt-[-65px] absolute w-[100%]  px-3 '>
            <div className=''>
                <Avatar  
                src='./Profile_Photu.jpg'
                style={{ width: '120px', height: '120px' }} className='border-4 border-gray-50 cursor-pointer' />
                <div className='px-1 flex flex-col justify-center '>
                    <h1 className='font-bold text-gray-700'> Ankit Kumar </h1>
                    <p className='text-[12px] text-gray-600 mt-[-3px]'> @andromeda50897 </p>
                </div>
            </div>
            <div className='bg-gray-200 rounded-full px-5 py-2 h-[35px] flex items-center mt-[75px] cursor-pointer text-gray-600 font-semibold hover:bg-gray-300'>
            Edit Profile
            </div>
        </div>
        <div className="bio mt-[94px] px-4 py-1">
            <p className='text-[12px] text-gray-700'> 🌍 Exploring the web's endless possibilities with MERN stack 🚀 || Problem solver by day, Coder by night 🌙 || Coffee lover ☕ || Join me on this coding journey </p>
        </div>
    </div>
  )
}

export default Profile
