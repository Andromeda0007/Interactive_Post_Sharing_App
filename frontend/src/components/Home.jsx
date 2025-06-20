import React from 'react'
import LeftSidebar from './LeftSidebar'
import Feed from './Feed'
import RightSidebar from './RightSidebar'
import { Outlet } from 'react-router-dom'
import Profile from './Profile'

const Home = () => {
  return (
    <div className='home flex shadow-2xl w-[85%] h-[90%] bg-white'>
        <LeftSidebar />
        <Outlet />
        <RightSidebar />
    </div>
  )
}

export default Home
