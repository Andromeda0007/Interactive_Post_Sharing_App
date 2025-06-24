import Avatar from '@mui/material/Avatar'
import React from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import RepeatIcon from '@mui/icons-material/Repeat'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BarChartIcon from '@mui/icons-material/BarChart'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FileUploadIcon from '@mui/icons-material/FileUpload'


const Tweet = (props) => {
  const {id, tweet} = props;
  console.log(tweet);
  return (
    <div className='border-2 border-gray-50 mt-2 bg-white p-2 rounded-xl shadow-sm'>
      <div>
        <div className='flex '>
          <Avatar src='/Profile_Photu.png' className='mt-1'/>
          <div className='ml-2 w-full'>
            <div className='flex items-center'>
              <h1 className='font-semibold'> {tweet.userId.name} </h1>
              <p className='text-gray-500 text-sm ml-1'> @{tweet?.userId.username} </p>
            </div>

            <div className='flex w-full'>
              <p> {tweet.description} </p>
            </div>

            <div className='tweet_stats flex justify-between w-full  mt-3 mb-2 items-center'>
              <div className='flex items-center gap-[2px] w-full cursor-pointer'>
                <ChatBubbleOutlineIcon 
                  className='hover:text-blue-400 text-gray-700'
                  style={{ fontSize:"medium"}}/>
                <p className='text-[12px]'> 0 </p>
              </div>

              <div className='flex items-center gap-[2px] w-full cursor-pointer'>
                <RepeatIcon 
                  className='hover:text-green-400 text-gray-700'
                  style={{fontSize:"medium"}}/>
                <p className='text-[12px]'> 0 </p>
              </div>

              <div className='flex items-center gap-[2px] w-full cursor-pointer'>
                <FavoriteBorderIcon style={{fontSize:"medium"}}
                  className=' hover:text-red-400 text-gray-700'/>
                <p className='text-[12px]'> {tweet.like.length} </p>
              </div>
              
              <div  className='flex items-center gap-[px] w-full cursor-pointer'>
                <BookmarkBorderIcon 
                  className='hover:text-amber-400 text-gray-700'
                  style={{fontSize:"medium"}}/>
                <p className='text-[12px]'> {0} </p>
              </div>
              <div className='flex items-center ml-[-25px] cursor-pointer'>
                  <FileUploadIcon style={{color:"#555555", fontSize:"medium"}}/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
