import React from 'react'
import LeftSidebar from './LeftSidebar'
import Feed from './Feed'
import RightSidebar from './RightSidebar'

const Home = () => {
  return (
    <div className='home flex shadow-2xl w-[80%] h-[90%] bg-white'>
        <LeftSidebar />
        <Feed />
        <RightSidebar />
    </div>
  )
}

export default Home
