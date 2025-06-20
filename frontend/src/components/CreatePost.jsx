import React, { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Avatar from '@mui/material/Avatar'

const CreatePost = () => {

    const [selectedTab, setSelectedTab] = useState("foryou");

    const handleClick = (tabname)=>{
        setSelectedTab(tabname);

        console.log(tabname);
    };

  return (
    <div className='createpost'>
        <div className=" foryou createpost_top flex border-2 border-gray-200 rounded-t-xl overflow-hidden justify-between  bg-white ">
            <div className={` w-full flex hover:bg-blue-100 cursor-pointer justify-center items-center py-[9px] border-r-2 border-gray-50 text-[17px] flex-col text-gray-700 ${selectedTab==="foryou" ? "bg-blue-400  font-semibold hover:bg-blue-400 text-white": ""}`}
                onClick={()=>handleClick("foryou")}
            >
                <h1 className=''> For You </h1>
            </div>
             <div className={` w-full flex hover:bg-blue-100 cursor-pointer justify-center items-center py-[9px] border-r-2 border-gray-50 flex-col text-gray-700 ${selectedTab==="following" ? "bg-blue-400  font-semibold hover:bg-blue-400 text-white": ""}`}
                onClick={()=>handleClick("following")}
            >
                <h1 className=''> Following </h1>
            </div>
            <div className={`setting_button  px-5 py-1 flex items-center hover:bg-gray-200 cursor-pointer ${selectedTab==="setting_button"? "bg-gray-500 hover:bg-gray-500 text-white" : ""}`}
                onClick={()=>handleClick("setting_button")}>
                <SettingsIcon style={{fontSize: "20px"}} className="text-gray-700"/>
            </div>
        </div>
        <div className="createpost_bottom p-3 border-x-2 border-b-2 border-gray-100 bg-white">
            <form action='submit '>
                <div className='flex items-center mt-1'>
                    <Avatar src='./Profile_Photu.jpg'/>
                    <input 
                        className='border-1 border-gray-400 ml-3 w-full rounded-full px-[14px] h-[37px]'
                        type="text" 
                        placeholder='What is happening?'
                    />
                </div>
                <div className='flex pt-3'>
                    <div className='icons flex w-[75%] px-[58px] py-1 items-center gap-4'>

                        <PhotoLibraryIcon className="text-gray-500" style={{fontSize:""}}/>
                        <PhotoLibraryIcon className="text-gray-500" style={{fontSize:""}}/>
                        <PhotoLibraryIcon className="text-gray-500" style={{fontSize:""}}/>
                        <PhotoLibraryIcon className="text-gray-500" style={{fontSize:""}}/>
                        <PhotoLibraryIcon className="text-gray-500" style={{fontSize:""}}/>
                    </div>
                    <div className=' w-[25%] px-4  flex items-center justify-center'>
                        <h1 className='rounded-full bg-blue-300 px-5 py-1 text-gray-100 font-semibold cursor-pointer'> Post </h1>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreatePost
