import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'

const Feed = () => {
  return (
    <div className='feed w-1/2 bg-gray-50 p-2 border-x-1 border-gray-100 '>
      <CreatePost />
      <div className='h-[69%] overflow-y-scroll '>
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
      </div>

    </div>
  )
}

export default Feed
