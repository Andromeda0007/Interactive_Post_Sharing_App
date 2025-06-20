import Avatar from '@mui/material/Avatar'
import React from 'react'

const SideProfile = (props) => {
    const {name, id} = props;
  return (
    <div className='sideprofile my-2 p-1 flex items-center justify-between rounded-xl'>

        <div className='flex gap-1 items-center'>
            <Avatar 
                className=''
                src=''
            />
            <div className='info items-center'>
                <h1 className='text-[14px] font-semibold mb-[-2px]'>{name}</h1>
                <p className='text-[12px] mt-[-2px] text-gray-600'> {id} </p>
            </div>
        </div>
      
        <div className='bg-gray-800 text-white rounded-full py-1 px-3 text-[13px] '>
            Profile
        </div>
    </div>
  )
}

export default SideProfile
