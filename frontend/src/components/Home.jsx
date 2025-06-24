import React from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useOtherUsers from '../hooks/useOtherUsers';
import useGetProfile from '../hooks/useGetProfile';

const Home = () => {
  const { loggedInUser, otherUsers } = useSelector((store) => store.user);

  // Fetch own profile + other users
  useGetProfile(loggedInUser?._id);
  useOtherUsers(loggedInUser?._id);

  return (
    <div className='home flex shadow-2xl w-[85%] h-[90%] bg-white'>
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div>
  );
};

export default Home;
