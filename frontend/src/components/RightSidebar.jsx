import React from 'react'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import SideProfile from './SideProfile'

const RightSidebar = () => {
  return (
    <div className='right_sidebar w-[27%] p-2'>
      <div className="search bg-gray-100 rounded-full p-[6px]">
          <ExploreOutlinedIcon className='ml-1'/>
          <input type="text" placeholder='Search' className='ml-2 border-none outline-none w-[80%]'/>
      </div>
      <div className='bg-gray-100 mt-3 rounded-xl p-2'>
        <h1 className='font-bold text-[19px] text-gray-800 ml-2 mb-[-5px]'> Who to follow </h1>
        <SideProfile name="Ankit Kumar" id="@andromeda50897"/>
        <SideProfile name="Karan Parashar" id="@whyredfire"/>
        <SideProfile name="Shubham Raj" id="@assassin"/>
        <SideProfile name="Navjot Singh" id="@believix"/>
      </div>
    </div>
  )
}

export default RightSidebar
