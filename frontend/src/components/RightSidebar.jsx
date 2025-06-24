import React from 'react';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SideProfile from './SideProfile';

const RightSidebar = ({ otherUsers }) => {
  console.log("Other Users in Sidebar:", otherUsers); // ✅ DEBUG

  return (
    <div className='right_sidebar w-[27%] p-2'>
      <div className="search bg-gray-100 rounded-full p-[6px]">
        <ExploreOutlinedIcon className='ml-1' />
        <input
          type="text"
          placeholder='Search'
          className='ml-2 border-none outline-none w-[80%]'
        />
      </div>

      <div className='bg-gray-100 mt-3 rounded-xl p-2'>
        <h1 className='font-bold text-[19px] text-gray-800 ml-2 mb-[-5px]'> Who to follow </h1>

        {Array.isArray(otherUsers) && otherUsers.length > 0 ? (
          otherUsers.map((user) => (
            <SideProfile
              key={user._id}
              id={user._id}
              name={user.name}
              username={user.username}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 ml-2 mt-2">No other users found.</p>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
