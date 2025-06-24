import Avatar from '@mui/material/Avatar';
import React from 'react';
import { Link } from 'react-router-dom';

const SideProfile = ({ id, name, username }) => {
  return (
    <div className='sideprofile my-2 p-1 flex items-center justify-between rounded-xl'>

      {/* User Info */}
      <div className='flex gap-1 items-center'>
        <Avatar src='./Profile_Photu.png' />
        <div className='info items-center'>
          <h1 className='text-[14px] font-semibold mb-[-2px]'>{name}</h1>
          <p className='text-[12px] mt-[-2px] text-gray-600'>@{username}</p>
        </div>
      </div>

      {/* Profile Button */}
      <Link to={`/profile/${id}`}>
        <button
          className='bg-gray-800 text-white rounded-full py-1 px-3 text-[13px] hover:bg-gray-700 transition-colors duration-200'
          onClick={() => console.log(`Navigating to profile of ${name}`)}
        >
          Profile
        </button>
      </Link>

    </div>
  );
};

export default SideProfile;
